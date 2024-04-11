import Link from 'next/link'
import Layout from '../components/Layout.js'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useState, useEffect } from 'react'

export default function Products() {
    const [products, setProducts] = useState([]) //use state to get all the products
    const supabase = useSupabaseClient() //connection to the database
    const [session, setSession] = useState(null) //authentificated user will have acces to other features
    const [query, setQuery] = useState('');

    //getting the authentification
    useEffect(() => {
        (async () => {
            supabase.auth.getSession().then(({ data: { session } }) => {
                setSession(session)
            })
        })()
    }, [supabase.auth])

    var userEmail = "loading"
    if (session) {
        userEmail = session.user.email
    }

    //const userEmail = 'stina@stina.com'; // Specify the user email here
    //userEmail = 'solveig@berling.fr';
    //userEmail = 'test@test.com';

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data: mobilityData, error: mobilityError } = await supabase
                    .from('mobility')
                    .select('id, chin, breath, number_hands, number_feet, number_fingers')
                    .eq('user_email', userEmail)
                    .single();


                if (mobilityError) {
                    console.error('Error fetching mobility data:', mobilityError.message);
                    return;
                }

                const { id, chin, breath, number_hands, number_feet, number_fingers } = mobilityData;

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

                // Intialize foot condition variables
                let foot_contactor = false;
                let foot_joystick = false;

                // Fetch feet data based on number_feet
                if (number_feet != 0) {
                    const { data: footData, error: footError } = await supabase
                        .from('foot')
                        .select('foot_contactor, foot_joystick')
                        .eq('id_mobility', id);

                    if (footError) {
                        console.error('Error fetching feet data:', footError.message);
                        return;
                    }

                    // Process foot data
                    footData.forEach(foot => {
                        if (foot.foot_contactor) foot_contactor = true;
                        if (foot.foot_joystick) foot_joystick = true;
                    });
                }

                // Intialize foot condition variables
                let finger_contactor = false;
                let finger_joystick = false;
                let finger_direction = [];
                let finger_sensibility = new Set();

                // Fetch feet data based on number_feet
                if (number_fingers != 0) {
                    const { data: fingerData, error: fingerError } = await supabase
                        .from('finger')
                        .select('finger_contactor, finger_joystick, finger_direction, finger_sensibility')
                        .eq('id_mobility', id);

                    if (fingerError) {
                        console.error('Error fetching finger data:', fingerError.message);
                        return;
                    }

                    // Process foot data
                    fingerData.forEach(finger => {
                        if (finger.finger_contactor) finger_contactor = true;
                        if (finger.finger_joystick) finger_joystick = true;
                        finger_direction.push(finger.finger_direction);
                        if (finger.finger_sensibility) {
                            finger_sensibility.add(finger.finger_sensibility);
                        }
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
                if (foot_joystick) productsToFetch.push('foot_joystick');
                if (foot_contactor) productsToFetch.push('foot_contactor');

                const { data: productsData, error: productsError } = await supabase
                    .from('products')
                    .select('id, name, type, contact');

                if (productsError) {
                    console.error('Error fetching products:', productsError.message);
                    return;
                }
                // Filter products that match at least one string in productsToFetch
                const filteredProductsData = productsData.filter(product => {
                    return product.contact.some(contact => productsToFetch.includes(contact));
                });

                // filteredProductsData now contains products where at least one string in productsToFetch matches one of the strings in the product's contact array
                console.log(filteredProductsData);

                // Fetch finger-related products if there are fingers
                let fingerProductsData = [];
                let fingerProductsError = null;

                const fingerProductsToFetch = [];
                if (finger_joystick) fingerProductsToFetch.push('finger_joystick');
                if (finger_contactor) fingerProductsToFetch.push('finger_contactor');

                if (number_fingers != 0) {
                    // Fetch products for finger_joystick or finger_contactor

                    const { data: fingerJoystickProducts, error: fingerJoystickError } = await supabase
                        .from('products')
                        .select('id, name, type, contact,low_sensibility, medium_sensibility, normal_sensibility');

                    if (productsError) {
                        console.error('Error fetching products:', fingerJoystickError.message);
                        return;
                    }
                    // Filter products that match at least one string in fingerProductsToFetch
                    const filteredFingerJoystickProducts = fingerJoystickProducts.filter(product => {
                        return product.contact.some(contact => fingerProductsToFetch.includes(contact));
                    });

                    fingerProductsData = [];

                    // If finger joystick products are found, check sensibility
                    if (filteredFingerJoystickProducts.length > 0) {
                        filteredFingerJoystickProducts.forEach(element => {
                            finger_sensibility.forEach(sens => {
                                if (sens == 'low' && element.low_sensibility == true) {
                                    fingerProductsData.push(element);
                                }
                                if (sens == 'medium' && element.medium_sensibility == true) {
                                    fingerProductsData.push(element);
                                }
                                if (sens == 'normal' && element.normal_sensibility == true) {
                                    fingerProductsData.push(element);
                                }
                            });
                        });
                    }
                    console.log("fingers", fingerProductsData)
                }

                let allProductsData = [];

                if (number_fingers != 0 && productsToFetch.length != 0) {
                    allProductsData = [...filteredProductsData, ...fingerProductsData];
                    console.log("Todo bien");
                }
                if (number_fingers != 0 && productsToFetch.length == 0) {
                    allProductsData = fingerProductsData;
                }
                if (productsToFetch.length != 0 && number_fingers == 0) {
                    allProductsData = filteredProductsData;
                }

                console.log("All", allProductsData)

                const productIds = allProductsData.map(product => product.id);

                // Check if the id_mobility already exists in the products_by_mobility table
                const { data: existingRow, error: selectError } = await supabase
                    .from('products_by_mobility')
                    .select()
                    .eq('id_mobility', id);

                if (selectError) {
                    console.error('Error selecting row:', selectError.message);
                    return;
                }

                // Create a JSON object with id_mobility and product_ids
                const rowToInsert = {
                    id_mobility: id,
                    product_ids: productIds
                };


                if (existingRow.length > 0) {
                    const { data: upsertedRow, error: upsertError } = await supabase
                        .from('products_by_mobility')
                        .upsert([rowToInsert], { onConflict: ['id_mobility'], merge: true });

                    if (upsertError) {
                        console.error('Error upserting row:', upsertError.message);
                        return;
                    }
                }
                else {
                    // Insert the row into the products_by_mobility table
                    const { data: insertedRow, error: insertError } = await supabase
                        .from('products_by_mobility')
                        .insert([rowToInsert]);

                    if (insertError) {
                        console.error('Error inserting row:', insertError.message);
                        return;
                    }
                }




                setProducts(allProductsData || []);
            } catch (error) {
                console.error('Error:', error.message);
            }
        };

        fetchProducts();
    }, [supabase, userEmail]);

    //This function handles the search of products
    //  you can combine words and the searh is in the titles and the content
    const handleSearch = async () => {
        if (!query.trim()) {
            // If the query is empty, fetch all products
            const { data, error } = await supabase
                .from('products')
                .select(`id, name, type`);
            if (error) {
                throw error;
            }
            setProducts(data);
        } else {
            // If there's a query, search by name and type separately
            const searchTerms = query.trim().split(' ').filter(Boolean);
            const nameSearchQuery = searchTerms.map(term => `'${term}'`).join(' | ');
            const typeSearchQuery = searchTerms.map(term => `'${term}'`).join(' | ');
            const { data: nameResults, error: nameError } = await supabase
                .from('products')
                .select()
                .textSearch('name', nameSearchQuery);
            const { data: typeResults, error: typeError } = await supabase
                .from('products')
                .select()
                .textSearch('type', typeSearchQuery);
            
            if (nameError || typeError) {
                throw nameError || typeError;
            }
    
            // Merge the results from both searches
            const mergedResults = [...nameResults, ...typeResults];
    
            setProducts(mergedResults);
        }
    };

    return (
        <Layout
            title="Products"
            description="Listing of products available"
        >
            <div className="flex-1 flex flex-col items-center justify-between p-24">
                <h1 className={`mb-3 text-5xl font-semibold`}>Products</h1>
                <div className="flex justify-between items-center">
                    <input
                        type='text'
                        className='block text-black p-2 rounded-lg border border-transparent transition-colors hover:border-blue-700 hover:bg-blue-600'
                        value={query}
                        placeholder='Search'
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button
                        className='block p-2 rounded-lg border border-transparent transition-colors hover:border-blue-700 hover:bg-blue-600'
                        onClick={handleSearch}
                    >
                        Search
                    </button>
                </div>
                {products.length === 0 &&  (
                  <div className="flex-1 flex flex-col items-center justify-between p-24">
                    <h5 className={`mb-3 font-semibold text-center`}> You can try our quizz to get your gamer material. </h5>
                    <button className='bg-blue-500 rounded text'>
                  <Link href="/quizz" className={`block p-2 rounded-lg border border-transparent transition-colors hover:border-blue-700 hover:bg-blue-600 rounded `}>Start quizz</Link>
                  </button>
                  </div>
              )}
                
                {products.length > 0 &&(
                  <ProductsPage products={products} />
                )}
            </div>
        </Layout>
    );
}

function ProductsPage({ products }) {
    return (
        <div>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        <Link href={`/products/${product.id}`}> {/* Link to individual product page */}
                            <a className='block p-2 rounded-lg border border-transparent transition-colors hover:border-blue-700 hover:bg-blue-600'>
                                <div className="flex">
                                    <p className="text-2xl font-semibold mr-2">Name:</p>
                                    <p className="text-2xl">{product.name}</p>
                                </div>
                                <div className="flex">
                                    <p className={`mb-3 text-2xl font-semibold mr-2`}>Type:</p>
                                    <p className="text-2xl">{product.type}</p>
                                </div>
                            </a>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
/*return (
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
*/