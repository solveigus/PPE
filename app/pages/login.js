import Layout from '../components/Layout.js'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function LoginAuth() {

  const supabase = useSupabaseClient()
  const router = useRouter();

  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)

    })

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  if(session){
    router.push("/profile")
  }
  
  return (
    <Layout
      title="Webtech"
      description="Login Auth"
    >
      <div className="flex-1 flex flex-col items-center justify-between p-24">
        <h1 className="mb-3 text-5xl font-semibold">Login Auth</h1>
        <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        providers={['github']}
        />
      </div>
    </Layout>
    
  )
}