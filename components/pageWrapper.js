import React from 'react'
import Nav from '../components/nav'
import Head from '../components/head'

import '../static/styles/main.scss'

const PageWrapper = (props) => {
  return (
    <>
      <Head title={props.title} />
      <a href='#main-content' className='skip-link tf-oswald'>Skip to main content</a>
      <Nav />
      <main id='main-content' tabIndex='-1'>
        {props.children}
      </main>
    </>
  )
}

export default PageWrapper
