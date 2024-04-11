import { useDarkMode } from './DarkModeContext';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
const avatar=require('gravatar');

export default function Header() {// component top left of the page: email account and gravatar if connected, else login buttom
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const supabase = useSupabaseClient()
  const [session, setSession] = useState(null)

  useEffect(() => {
    (async () => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
      })
    })()
  }, [supabase.auth])

  const UserAvatar = () => {// find the gravatar image connected to the account 
    return(
      <img src={avatar.url(session.email)} className="float-right" style={{width:'50px', borderRadius:'8px'}} alt="User Avatar" />
    );
  }

  return (
    <header style={{ position: 'fixed', top: 0, right: 0 }}>
      <ul>
        {session && (// if user connected -> display his name and his gravatar image
          <li className="my-5 items-right">
            <p className={` ${isDarkMode ? 'text-white' : 'text-black' }`}>{session.user.email}</p>
            <p><UserAvatar email={session.email} /></p>
          </li>
        )}
        <div>
          {session ? null: // if he's not, dispaly the option to login in 
            <Link className={`block p-2 rounded-lg border border-transparent transition-colors hover:border-blue-700 hover:bg-blue-600 ${isDarkMode ? 'text-white' : 'text-black'}`} href="/login">Login Auth</Link>
          }
        </div>
      </ul>
    </header>
  )
}