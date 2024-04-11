import Layout from '../components/Layout.js'
import { useEffect, useState } from 'react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import Image from 'next/image';

export default function Contact() {// page to contacts us 
  const supabase = useSupabaseClient()
  const [formD, setFormD] = useState({
    firstname: '',
    lastname: '',
    email: '',
    message: '',
  });

  const [messageSent, setMessageSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormD({ ...formD, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { error, status } = await supabase
        .from('contacts')
        .insert([
          {
            firstname: formD.firstname,
            lastname: formD.lastname,
            email: formD.email,
            message: formD.message,
          },
        ]);

      if (error) {
        throw error;
      }

      console.log(status);
      setFormD({
        firstname: '',
        lastname: '',
        email: '',
        message: '',
      });

      if (status === 201) {
        setMessageSent('Message has been sent');
      } else {
        setMessageSent('Error');
      }

    } catch (error) {
      console.error('Error inserting data:', error);
    }
  };

  const handlePopupClose = () => {
    setMessageSent(false); // Close the pop-up
  };

  return (
    <Layout
      title="Webtech"
      description="contact us"
    >
      <div className="flex-1 flex flex-col items-center justify-between p-24">
        <h1 className="mb-3 text-5xl font-semibold">Contact Us</h1>
        <form onSubmit={handleSubmit} className="w-full max-w-md p-4 bg-white rounded-lg shadow-lg">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600" htmlFor="name">Firstname</label>
            <input //firstname
              type="text"
              id="firstname"
              name="firstname"
              value={formD.firstname}
              onChange={handleChange}
              className="w-full text-black py-2 px-3 border rounded shadow appearance-none"
              placeholder="Enter your firstname"  // Placeholder
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600" htmlFor="name">Lastname</label>
            <input // lastname
              type="text"
              id="lastname"
              name="lastname"
              value={formD.lastname}
              onChange={handleChange}
              className="w-full text-black py-2 px-3 border rounded shadow appearance-none"
              placeholder="Enter your lastname" // Placeholder
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600" htmlFor="email">E-mail address</label>
            <input // email
              type="email" 
              id="email"
              name="email"
              value={formD.email}
              onChange={handleChange}
              className="w-full text-black py-2 px-3 border rounded shadow appearance-none"
              placeholder="Enter your email address"  // Placeholder
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600" htmlFor="message">Message</label>
            <textarea // message
              id="message"
              name="message"
              value={formD.message}
              onChange={handleChange}
              className="w-full text-black py-2 px-3 border rounded shadow appearance-none h-32"
              placeholder="Write your message here"  // Placeholder
              required
            />
          </div>

          <button
            type="submit"
            className="bg-rose-500 text-white px-4 py-2 rounded hover:bg-rose-600"
          >
            Send
          </button>
        </form>
        {messageSent && (
          <div className={messageSent === 'Error' ? 'bg-red-200' : 'bg-rose-200'} >
            <p className={messageSent === 'Error' ? 'text-red-800' : 'text-rose-300'}>
              {messageSent}
            </p>
            <button onClick={handlePopupClose} className="font-bold">Close</button>
          </div>
        )}
      </div>

    </Layout>
  )
}
