import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Layout from '../../components/Layout.js';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

export default function ProductPage() {
    const router = useRouter();
    const { productID } = router.query;
    const supabase = useSupabaseClient();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        if (productID) {
            fetchProduct();
        }
    }, [productID]);

    const fetchProduct = async () => {
        try {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .eq('id', productID)
                .single();

            if (error) {
                throw error;
            }

            setProduct(data);
        } catch (error) {
            console.error('Error fetching product:', error.message);
        }
    };

    const getImageSrc = (id) => `../image(${id}).jpg`; // Assuming images are stored in /images directory

    return (
        <Layout
            title={`Product ${productID}`}
            description={`Product ID: ${productID}`}
        >
            <div className="flex-1 flex items-center justify-center p-24">
                <div className="flex flex-col items-center">
                    <h1 className="text-5xl font-semibold">Product ID: {productID}</h1>
                    {product ? (
                        <>
                            <p className="text-2xl mt-4 font-semibold">Name: {product.name}</p>
                            <p className="text-2xl font-semibold">Type: {product.type}</p>
                            <img src="/output_image.jpg" className="mt-8 max-w-lg" />
                            <div className="flex-1 flex flex-col items-center justify-between p-24">
                                <p className="text-2xl ">{product.description}</p>
                            </div>
                            {/* Add additional product information here */}
                            {/*<img src={getImageSrc(product.id)} alt={`Product ${product.id}`} className="mt-8 max-w-lg" />*/}
                        </>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>
        </Layout>
    );
}
