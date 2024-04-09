import Link from 'next/link'
import Layout from '../components/Layout.js'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useState, useEffect } from 'react'
import Pagination from '@/components/Pagination.js'

export default function Products() {
    const [products, setProducts] = useState([]) //use state to get all the products
    const supabase = useSupabaseClient() //connection to the database
    const [session, setSession] = useState(null) //authentificated user will have acces to other features
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(10);

    //getting the authentification
    useEffect(() => {
        (async () => {
            supabase.auth.getSession().then(({ data: { session } }) => {
                setSession(session)
            })
        })()
    }, [supabase.auth])

    const userEmail = 'stina@stina.com'; // Specify the user email here
    //const userEmail = 'tom@tom.fr';

    /*useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data: mobilityData, error: mobilityError } = await supabase
                    .from('mobility')
                    .select('chin, breath, number_hands')
                    .eq('user_email', userEmail)
                    .single();
    
                if (mobilityError) {
                    console.error('Error fetching mobility data:', mobilityError.message);
                    return;
                }
    
                const { chin, breath, number_hands } = mobilityData;
    
                const { data: handData, error: handError } = await supabase
                    .from('hand')
                    .select('hand_valid, hand_half_open, hand_open, hand_closed')
                    .eq('id_mobility', mobilityData.id);
    
                if (handError) {
                    console.error('Error fetching hand data:', handError.message);
                    return;
                }
    
                const productsToFetch = [];
                if (chin) productsToFetch.push('chin');
                if (breath) productsToFetch.push('breath');
    
                // Process hand data
                if (handData) {
                    handData.forEach(hand => {
                        if (hand.hand_valid) productsToFetch.push('hand_valid');
                        if (hand.hand_half_open) productsToFetch.push('hand_half_open');
                        if (hand.hand_open) productsToFetch.push('hand_open');
                        if (hand.hand_closed) productsToFetch.push('hand_closed');
                    });
                }
    
                const { data: productsData, error: productsError } = await supabase
                    .from('products')
                    .select('id, name, type')
                    .in('contact', productsToFetch);
    
                console.log('Products data:', productsData); // Log productsData
    
                if (productsError) {
                    console.error('Error fetching products:', productsError.message);
                    return;
                }
    
                setProducts(productsData || []);
                console.log('Products:', products); // Log products
            } catch (error) {
                console.error('Error:', error.message);
            }
        };
    
        fetchProducts();
    }, [supabase, userEmail]);*/

    /*useEffect(() => {
        const fetchProducts = async () => {
            const { data: mobilityData, error: mobilityError } = await supabase
                .from('mobility')
                .select('chin, breath')
                .eq('user_email', userEmail)
                .single();

            if (mobilityError) {
                console.error('Error fetching mobility data:', mobilityError.message);
                return;
            }

            const { chin, breath } = mobilityData;

            const productsToFetch = [];
            if (chin) productsToFetch.push('chin');
            if (breath) productsToFetch.push('breath');

            const { data: productsData, error: productsError } = await supabase
                .from('products')
                .select('id, name, type')
                .in('contact', productsToFetch);

            if (productsError) {
                console.error('Error fetching products:', productsError.message);
                return;
            }

            setProducts(productsData || []);
        };

        fetchProducts();
    }, [supabase, userEmail]);*/

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data: mobilityData, error: mobilityError } = await supabase
                    .from('mobility')
                    .select('id, chin, breath, number_hands')
                    .eq('user_email', userEmail)
                    .single();


                if (mobilityError) {
                    console.error('Error fetching mobility data:', mobilityError.message);
                    return;
                }

                const { id, chin, breath, number_hands } = mobilityData;

                // Initialize hand condition variables
                let hand_valid = false;
                let hand_half_open = false;
                let hand_open = false;
                let hand_closed = false;

                // Fetch hand data based on number_hands
                if (number_hands != 0) {
                    const { data: handData, error: handError } = await supabase
                        .from('hand')
                        .select('hand_valid, hand_half_open, hand_open, hand_closed')
                        .eq('id_mobility', id);

                    if (handError) {
                        console.error('Error fetching hand data:', handError.message);
                        return;
                    }

                    // Process hand data
                    handData.forEach(hand => {
                        if (hand.hand_valid) hand_valid = true;
                        if (hand.hand_half_open) hand_half_open = true;
                        if (hand.hand_open) hand_open = true;
                        if (hand.hand_closed) hand_closed = true;
                    });
                }

                // Construct productsToFetch array based on hand conditions
                const productsToFetch = [];
                if (chin) productsToFetch.push('chin');
                if (breath) productsToFetch.push('breath');
                if (hand_valid) productsToFetch.push('hand_valid');
                if (hand_half_open) productsToFetch.push('hand_half_open');
                if (hand_open) productsToFetch.push('hand_open');
                if (hand_closed) productsToFetch.push('hand_closed');

                // Fetch products based on productsToFetch array
                const { data: productsData, error: productsError } = await supabase
                    .from('products')
                    .select('id, name, type')
                    .in('contact', productsToFetch);

                if (productsError) {
                    console.error('Error fetching products:', productsError.message);
                    return;
                }

                console.log('Products:', productsData);

                setProducts(productsData || []);
            } catch (error) {
                console.error('Error:', error.message);
            }
        };

        fetchProducts();
    }, [supabase, userEmail]);


    //to handle the pages
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    return (
        <Layout
            title="Products"
            description="Listing of products available"
        >
            <div className="flex-1 flex flex-col items-center justify-between p-24">
                <h1 className={`mb-3 text-5xl font-semibold`}>Products</h1>
                <div className="flex justify-between items-center">
                </div>
                <ProductsPage products={currentProducts} />
                <Pagination
                    productsPerPage={productsPerPage}
                    totalProducts={products.length}
                    paginate={paginate}
                />
            </div>
        </Layout>
    )
}

//This component is used to display all of the elements in an product
function ProductsPage({ products }) {
    return (
        <div>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        <Link className='block p-2 rounded-lg border border-transparent transition-colors hover:border-blue-700 hover:bg-blue-600' href={`/product`}>

                            <div className="flex">
                                <p className="text-2xl font-semibold mr-2">Name:</p>
                                <p className="text-2xl">{product.name}</p>
                            </div>
                            <div className="flex">
                                <p className={`mb-3 text-2xl font-semibold mr-2`}> Type:</p>
                                <p className="text-2xl">{product.type}</p>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}
