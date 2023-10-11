import React, { ReactNode } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { useRouter as navRouter } from 'next/navigation';
import { gateCheck } from '../utils'

type Props = {
  children?: ReactNode
  title?: string
}

export const Layout = ({ children, title = 'Marketing AR' }: Props) => {
  const router = useRouter();
  const routeNav = navRouter();
  if (typeof window !== 'undefined') {
    const gate = localStorage.getItem('gate') as string;
    if (!gateCheck(router.pathname, gate)) {
      routeNav.push('/');
    }
  }

  return (
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
}

export default Layout;
