import Layout from '../components/Layout.js'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';


export default function LoginAuth() {

  const supabase = useSupabaseClient()
  const router = useRouter();

  const [session, setSession] = useState(null)

  useEffect(() => {
    (async () => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
      })
    })()
  }, [supabase.auth])

  async function signOut() {
    const { error } = await supabase.auth.signOut()
    router.push("/")
  }

  var email = "loading"
  if (session) {
    email = session.user.email
  }
  return (
    <Layout
      title="Webtech"
      description="Profile"
    >
      <div className="flex-1 flex flex-col items-center justify-between p-24">

        <h1 className="mb-3 text-5xl font-semibold" >Profile</h1>
        <div>
          <p className={`mb-5 text-3xl font-semibold`}>{email}</p>
        </div>
        <button className='block p-2 rounded-lg border border-transparent transition-colors hover:border-blue-700 hover:bg-blue-600' onClick={signOut}>Sign Out</button>

      </div>
    </Layout>

  )
}
