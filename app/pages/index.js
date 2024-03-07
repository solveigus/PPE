import Layout from '../components/Layout.js'

export default function Page() {// Home page, presentation + quick search bar + meteo 

  return (
    <Layout
      title="Webtech"
      description="Home"
    >
      <div className="flex-1 flex flex-col items-center justify-between p-24">
        <h1 className={`mb-3 text-5xl font-semibold text-center`} >Welcome to our PPE</h1>
      </div>
    </Layout>
  )
}
