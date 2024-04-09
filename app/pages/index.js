import Layout from '../components/Layout.js';
import Link from 'next/link'; // Import Link from next/link for Next.js navigation
import { useState, useEffect } from 'react';
import { SessionContextProvider, useSupabaseClient } from '@supabase/auth-helpers-react';

export default function Page() {
  const supabase = useSupabaseClient();
  const [session, setSession] = useState(null);

  useEffect(() => {
    (async () => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
      });
    })();
  }, [supabase.auth]);

  return (
    <SessionContextProvider supabaseClient={supabase}>
      <Layout
        title="Webtech"
        description="Home"
      >
        <div className="flex flex-col items-center justify-center h-full">
          <div className="flex-1 flex flex-col items-center justify-between p-24">
            <h1 className={`mb-3 text-5xl font-semibold text-center`}>Welcome to our PPE</h1>
          </div>
          <div className='flex items-center justify-center'>
            <nav>
              
              <button className='bg-blue-500 rounded text'>
              <Link href="/quizz" className={`block p-2 rounded-lg border border-transparent transition-colors hover:border-blue-700 hover:bg-blue-600 rounded `}>Start quiz</Link>
                
              </button>
            </nav>
          </div>
        </div>
      </Layout>
    </SessionContextProvider>
  );
}
