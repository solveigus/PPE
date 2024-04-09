import Link from 'next/link'
import Layout from '../components/Layout.js'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useState, useEffect } from 'react'
import Pagination from '@/components/Pagination.js'

//This page displays all of the products, 
//  it has pages to show the various products
//  and a search bar to find an products by keyword
export default function Products() {
    const [products, setProducts] = useState([]) //use state to get all the products
    const supabase = useSupabaseClient() //connection to the database
    const [session, setSession] = useState(null) //authentificated user will have acces to other features
    const [query, setQuery] = useState('')
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

    //getting all the products and ordering them by time of creation
    useEffect(() => {
        (async () => {
            let { data, error, status } = await supabase
                .from('products').select(`id, name, type`);
            if (error) {
                throw error;
            }
            setProducts(data)
        })()
    }, [supabase])

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
    
    
    

    //to handle the pages
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    //The button create an Product appears only if a user is signed in
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