import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout.js';
import Setup from '../components/Setup.js';
import { useSupabaseClient } from '@supabase/auth-helpers-react'; // Import useSupabaseClient hook

export default function Page() {
  const [userEmail, setUserEmail] = useState(null);
  const [userMobility, setUserMobility] = useState(null);
  const supabase = useSupabaseClient(); // Initialize supabase client

  useEffect(() => {
    const fetchUserMobility = async () => {
      try {
          const { data, error, count } = await supabase
            .from('mobility')
            .select('*')
            .eq('user_email', userEmail);
          if (error) throw error;
          if (count >= 1) {
            setUserMobility(data[0]); // Select the first row
            console.log('User Mobility Data:', data[0]); // Log fetched user mobility data
          } else {
            setUserMobility(null);
            console.log('No user mobility data found.');
          }
      } catch (error) {
        console.error('Error fetching user mobility:', error.message);
      }
    };

    fetchUserMobility();
  }, [supabase, userEmail]);

  useEffect(() => {
    // Fetch user session and extract email
    supabase.auth.getSession().then(({ data: { user } }) => {
      setUserEmail(user?.email || null);
    });
  }, [supabase.auth]);

  const setups = [
    // Your setups array remains the same
  ];

  return (
    <Layout title="Webtech" description="Home">
      <div className="flex-1 flex flex-col items-center justify-between p-24">
        <h1 className={`mb-3 text-5xl font-semibold text-center`}>Setups</h1>
        {setups.map((setup, index) => (
          <Setup key={index} email={userEmail} {...setup} />
        ))}
      </div>
    </Layout>
  );
}
