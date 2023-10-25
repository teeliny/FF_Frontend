import React from 'react'
import { AppProps } from 'next/app'
import localFont from 'next/font/local'

const gilroy = localFont({
  src: [
    {
      path: '../public/fonts/Gilroy-Regular.ttf',
      weight: '400'
    },
    {
      path: '../public/fonts/Gilroy-Light.ttf',
      weight: '300'
    },
    {
      path: '../public/fonts/Gilroy-Medium.ttf',
      weight: '500'
    },
    {
      path: '../public/fonts/Gilroy-SemiBold.ttf',
      weight: '600'
    },
    {
      path: '../public/fonts/Gilroy-Bold.ttf',
      weight: '700'
    },
    {
      path: '../public/fonts/Gilroy-Black.ttf',
      weight: '900'
    }
  ],
  variable: '--font-gilroy'
})
import '../styles/index.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={`${gilroy.variable} ui-sans-serif main`}>
      <Component {...pageProps} />
    </main>
  )
}

export default MyApp;