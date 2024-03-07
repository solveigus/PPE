import Head from 'next/head'
import Header from '../components/Header.js'
import Footer from '../components/Footer.js'
import Menu from '../components/Menu.js'
import { useDarkMode } from './DarkModeContext';
import React from 'react';

export default function MainContent({// template of all our pages
  children,
  title,
  description
}) {
  const { isDarkMode, toggleDarkMode } = useDarkMode(); //adapting the component to the darkMode

  return (
    <div className={`min-h-screen flex justify-center items-center text-white transition ${isDarkMode
      ? 'bg-gradient-to-br from-blue-800 to-black white' // Dark mode //className="flex min-h-screen bg-gradient-to-br from-blue-900 to-white min-h-screen flex justify-center to-transparent"
      : 'bg-gradient-to-br from-blue-500 to-white black'// Light mode background gradient using Tailwind class
      }`} >
      <Menu  // menu at the left to swith between pages
      />
      <Header //account email and gravatar email top right
      />
      <Head >
        <title>PPE - {title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main //page content
      className={` py-10 min-h-screen max-w-full md:max-w-4xl md:mx-auto ${isDarkMode ? 'text-white' : 'text-black'}`}>
        {children}
      </main>
      <Footer />
    </div>
  )
}