import React from 'react'
import Layout from '../components/Layout'

const NotFound = () => {
  return (
    <Layout title="Marketing AR - Error">
      <div className='relative flex items-center justify-center w-full px-6 font-semibold text-white background' style={{ backgroundImage: "url('/images/png/background.png')" }}>
        <span>404</span>
        <span className='mx-2'>|</span>
        <span>Not Found</span>
      </div>
    </Layout>
  )
}

export default NotFound