import Link from 'next/link'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useState, useEffect } from 'react'
import { useDarkMode } from './DarkModeContext';

//this component is our navigation bar, it displays all of the Links to the different pages of our app
export default function Menu() {
  const supabase = useSupabaseClient()
  const { isDarkMode, toggleDarkMode } = useDarkMode(); //adapting the component to the darkMode
  //We use authentification to add a link to the "My Articles" page
  //  This page is only available to authenticated users
  const [session, setSession] = useState(null)

  useEffect(() => {
    (async () => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
      })
    })()
  }, [supabase.auth])

  return ( //links to our main pages
    <nav className='absolute top-0 left-0 p-4'>
      <ul className='list-none m-0 p-0 items-center'>
        <li><Link className={`block p-2 rounded-lg border border-transparent transition-colors hover:border-blue-700 hover:bg-blue-600 ${isDarkMode ? 'text-white' : 'text-black'}`} href="/">Home</Link></li>
        <li><Link className={`block p-2 rounded-lg border border-transparent transition-colors hover:border-blue-700 hover:bg-blue-600 ${isDarkMode ? 'text-white' : 'text-black'}`} href="/about">About us</Link></li>
        <li><Link className={`block p-2 rounded-lg border border-transparent transition-colors hover:border-blue-700 hover:bg-blue-600 ${isDarkMode ? 'text-white' : 'text-black'}`} href="/contacts">Contacts</Link></li>
        <li><Link className={`block p-2 rounded-lg border border-transparent transition-colors hover:border-blue-700 hover:bg-blue-600 ${isDarkMode ? 'text-white' : 'text-black'}`} href="/login">Login</Link></li>
        <li><Link className={`block p-2 rounded-lg border border-transparent transition-colors hover:border-blue-700 hover:bg-blue-600 ${isDarkMode ? 'text-white' : 'text-black'}`} href="/products">Products</Link></li>
        {session ? (
          <li>
            <Link
              className={`block p-2 rounded-lg border border-transparent transition-colors hover:border-blue-700 hover:bg-blue-600 ${isDarkMode ? 'text-white' : 'text-black'}`}
              href="/myproducts"
            >
              My products
            </Link>
          </li>
        ) : null}
        </ul>
    </nav>
  )
}

/**
 {session ? (
          <li>
            <Link
              className={`block p-2 rounded-lg border border-transparent transition-colors hover:border-blue-700 hover:bg-blue-600 ${isDarkMode ? 'text-white' : 'text-black'}`}
              href="/user-articles"
            >
              My articles
            </Link>
            <Link
              className={`block p-2 rounded-lg border border-transparent transition-colors hover:border-blue-700 hover:bg-blue-600 ${isDarkMode ? 'text-white' : 'text-black'}`}
              href="/settings"
            >
              Settings
            </Link>
          </li>
        ) : null}
 */