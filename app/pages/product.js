
import Layout from '../components/Layout.js'
import Image from 'next/image';

export default function Page() {// Home page, presentation + quick search bar + meteo 

    return (
        <Layout
            title="Product"
            description="Home"
        >
            <div className="flex-1 flex flex-col items-center justify-between p-24">
                <h1 className={`mb-3 text-5xl font-semibold text-center`} >Product</h1>
                <Image
                    src="/default_image.jpg"
                    alt="Your Image Alt Text"
                    className="transform scale-1 mt-8"
                    width={400}
                    height={200}
                />
            </div>
        </Layout>
    )
}