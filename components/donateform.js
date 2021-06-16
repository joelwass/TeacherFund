/* global fetch */
import React, { Component } from 'react'
import { CardElement } from '@stripe/react-stripe-js'
import DonationFrequency from './donationFrequency'
import Router from 'next/router'

import { mockToken } from '../mocks/data/mockToken'

class DonateForm extends Component {
  constructor (props) {
    super(props)
    this.donate = this.donate.bind(this)
    this.state = {
      loading: false,
      redirectSuccess: false,
      firstName: '',
      lastName: '',
      amount: '',
      email: '',
      frequency: 'once',
      error: ''
    }
  }

setLocalState = (state) => {
  if (!state.error) state.error = ''
  this.setState(state)
};

updateFirstName = (e) => {
  this.setLocalState({ firstName: e.target.value })
};

updateFrequency = (ev) => {
  this.setLocalState({ frequency: ev.target.value })
};

updateLastName = (e) => {
  this.setLocalState({ lastName: e.target.value })
};

updateEmail = (e) => {
  this.setLocalState({ email: e.target.value })
};

updateAmount = (e) => {
  this.setLocalState({
    amount: `${e.target.value.includes('$') ? '' : '$'}${e.target.value}`
  })
};

donate = async (ev) => {
  ev.preventDefault()
  this.setLocalState({ loading: true })
  let token
  try {
    const cardElement = this.props.elements.getElement(CardElement)
    let res
    if (process.env.STRIPE_PUBLIC_KEY === 'test') {
      res = {
        error: 'error with test token ',
        token: mockToken
      }
    } else {
      res = await this.props.stripe.createToken(cardElement)
    }

    token = res.token
  } catch (e) {
    this.setState({ error: e.message, loading: false })
    return
  }

  if (!token) {
    this.setState({ error: 'Invalid CC info!', loading: false })
    return
  }
  try {
    const stripDollarSignAmount = parseInt(
      this.state.amount.replace('$', '')
    )
    const responseStream = await fetch('/api/donate', {
      method: 'POST',
      body: JSON.stringify({
        source: token,
        firstName: this.state.firstName,
        frequency: this.state.frequency,
        lastName: this.state.lastName,
        amount: stripDollarSignAmount * 100,
        email: this.state.email
      })
    })
    const response = await responseStream.json()
    if (response.success) {
      this.setState({ redirectSuccess: true, loading: false })
    } else {
      this.setState({
        error: `Donation failed: ${response.message}`,
        loading: false
      })
    }
  } catch (e) {
    this.setState({ error: e.message, loading: false })
  }
};

render () {
  const { redirectSuccess, loading } = this.state

  if (redirectSuccess) {
    Router.push('/success')
  }

  if (redirectSuccess) return <div />

  return (
    <form className='flex flex-column f4-m ph2' onSubmit={this.donate}>
      <div className='error tf-lato tc'>
        <p className='red' aria-live='assertive'>
          {this.state.error}
        </p>
      </div>

      <DonationFrequency
        updateFrequency={this.updateFrequency}
        frequency={this.state.frequency}
      />
      <input
        type='text'
        required
        className='bn ba pa3 mv2'
        placeholder='First name'
        value={this.state.firstName}
        onChange={this.updateFirstName}
        aria-label='First Name'
      />
      <input
        type='text'
        required
        className='bn ba pa3 mv2'
        placeholder='Last name'
        value={this.state.lastName}
        onChange={this.updateLastName}
        aria-label='Last Name'
      />
      <input
        type='email'
        required
        className='bn ba pa3 mv2'
        placeholder='Email'
        value={this.state.email}
        onChange={this.updateEmail}
        aria-label='Email'
      />
      <input
        type='text'
        required
        className='bn ba pa3 mv2'
        placeholder='$ Amount'
        value={this.state.amount}
        onChange={this.updateAmount}
        aria-label='Amount'
      />
      <div className='bg-white bn ba pa3 mv2'>
        <CardElement />
      </div>
      {loading && <h2 className='tc tf-lato'>Loading...</h2>}
      <button
        type='submit'
        className='white btn-donate tf-lato b tc pa3 mt3 mt3-m mh-auto br-pill pointer w-50'
      >
        Donate
      </button>
    </form>
  )
}
}

export default DonateForm
