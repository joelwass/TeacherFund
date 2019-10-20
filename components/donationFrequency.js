import React from 'react'

const DonationFrequency = ({ updateFrequency, frequency }) => (
  <div className='flex flex-row tf-lato mv1' role='radiogroup' aria-labelledby='donate-freq'>
    <span id='donate-freq' className='sr-only--text'>Donation Frequency</span>
    <label className={`tc mt1 pv2 ph1 bn ba b--black ttu pointer flex-auto ${frequency === 'once' ? 'bg-tf-yellow tf-dark-gray' : 'tf-dark-gray bg-white pointer'}`}>
      <input className='sr-only--input' type='radio' name='frequency' value='once' onInput={updateFrequency} />
      Give Once
    </label>
    <label className={`tc mt1 pv2 ph1 bn ba b--black ttu pointer flex-auto ${frequency === 'monthly' ? 'bg-tf-yellow tf-dark-gray' : 'tf-dark-gray bg-white pointer'}`}>
      <input className='sr-only--input' type='radio' name='frequency' value='monthly' onInput={updateFrequency} />
      Monthly
    </label>
  </div>
)

export default DonationFrequency
