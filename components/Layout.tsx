import React, { ReactNode } from 'react'
// import Link from 'next/link'
import Head from 'next/head'

type Props = {
  children?: ReactNode
  title?: string
}

export const Layout = ({ children, title = 'Marketing AR' }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <div className='layout'>
      {children}
    </div>
  </div>
)

export default Layout;
