import Layout from '../components/Layout.js'

export default function About() {//page to learn about us 
  return (
    <Layout
      title="Webtech"
      description="about us"
    >
      <div className="flex-1 flex flex-col items-center justify-between p-24">
        <h1 className={`mb-3 text-5xl font-semibold`} >About us</h1>
        <h2 className={`mb-3 text-3xl font-semibold`}>This app was created for the course PPE.</h2>
        <img
          src="/ece_logo.jpeg" // ECE logo
          className="rounded-full transform scale-1" 
        />
      </div>
    </Layout >
  )
}
