import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout.js';
import Setup from '../components/Setup.js';
import { useSupabaseClient } from '@supabase/auth-helpers-react'; // Import useSupabaseClient hook

export default function Page() {
    const supabase = useSupabaseClient(); // Connection to the database
    const [session, setSession] = useState(null); // Authenticated user will have access to other features
    const [mobilityData, setMobilityData] = useState(null);
    const [productMobData, setProductMobData] = useState(null);
    const [productData, setProductData] = useState(null);
    const [sut, setSut] = useState([]);
    const [indice, setIndice] = useState([]);
    

    // Getting the authentication
    useEffect(() => {
        (async () => {
            supabase.auth.getSession().then(({ data: { session } }) => {
                setSession(session);
            });
        })();
    }, [supabase.auth]);

    var userEmail = "loading";
    if (session) {
        userEmail = session.user.email;
    }

    useEffect(() => {
      const fetchMobilityData = async () => {
          try {
              if (!session) return; // Return if session is not yet available
  
              const { data: mobilityData, error } = await supabase
                  .from('mobility')
                  .select('id, chin, breath, number_hands, number_feet, number_fingers, J, C')
                  .eq('user_email', userEmail)
                  .single();
  
              if (error) {
                  console.error('Error fetching mobility data:', error.message);
                  return;
              }

              setMobilityData(mobilityData);
  
              if (!mobilityData) return; // Return if no mobility data found
  
              const { product_ids } = {}

              // Fetch products corresponding to product IDs
              const { data: productMobData, error2} = await supabase
                  .from('products_by_mobility')
                  .select('*')
                  .eq('id_mobility', mobilityData.id)

              if (error2) {
                  console.error('Error fetching product data:', error2.message);
                  return;
              }
              
              setProductMobData(productMobData);

              const productIds = productMobData[0].product_ids;
              const productsPromises = productIds.map(async productId => {
                try {
                    const { data: productData, error: productError } = await supabase
                        .from('products')
                        .select('*')
                        .eq('id', productId)
                        .single();
            
                    if (productError) {
                        console.error(`Error fetching product with ID ${productId}:`, productError.message);
                        return null;
                    }
            
                    return productData;
                } catch (error) {
                    console.error(`Error fetching product with ID ${productId}:`, error.message);
                    return null;
                }
            });

            const temp = await Promise.all(productsPromises);
            const filteredProductData = temp.filter(product => product !== null);
            setProductData(filteredProductData);

              //console.log(productData);
              
            var stp = [];
            var consJ = 0;
            var consC = 0;
            var sut = [];
            var indice = [];

            productData.forEach(product => {
              // Vérifier si l'élément de contact se nomme "controller_adapted"
              if (product.type === "controller_adapted") {                  // Stocker le string dans la variable
                  stp.push(product);
                  consJ++;
              }
            });

            if(consJ>0)
            {
              sut.push(stp[0].name)
              indice.push(stp[0].id)

            }
            else
            {
              if(mobilityData.J>0)
              {
                consJ = mobilityData.J
                productData.forEach(product => {
                  // Vérifier si l'élément de contact se nomme "controller_adapted"
                  if (product.type === "joystick" && consJ > 0) {                  // Stocker le string dans la variable
                      sut.push(product.name);
                      indice.push(product.id);
                      consJ--;
                  }
                });
                
              }
              if(mobilityData.C>0)
              {
                consC = mobilityData.C
                productData.sort((a, b) => b.number_contacts - a.number_contacts);

                productData.forEach(product => {
                  // Vérifier si l'élément de contact se nomme "controller_adapted"
                  if (product.type === "contactor" && consC > 0) {                  // Stocker le string dans la variable
                      sut.push(product.name);
                      indice.push(product.id);
                      consC = consC - product.number_contacts;
                  }
                });
              }

              if(consJ > 0 || consC > 0)
              {
                var cons = consJ + consC;
                productData.forEach(product => {
                  // Vérifier si l'élément de contact se nomme "controller_adapted"
                  if (product.type === "game_controller" && cons > 0) {                  // Stocker le string dans la variable
                      sut.push(product.name);
                      indice.push(product.id);
                      cons--;
                  }
                });

                if(cons === consJ + consC )
                {
                  sut=["No setup possible"];
                  indice=[]
                }
              }
            }

            setSut(sut);
            setIndice(indice);
        

          } catch (error) {
            console.error('Error:', error.message);
        }
    };

    fetchMobilityData();
}, [supabase, userEmail, session]);

const setups = [
  {
      pictures: ['default_image.jpg', 'default_image.jpg', 'default_image.jpg', 'default_image.jpg', 'default_image.jpg'],
      sut: sut,
      indice: indice
  },
  // Add more setup objects here if needed
];

return (
  <Layout title="Webtech" description="Home">
      <div className="flex-1 flex flex-col items-center justify-between p-24">
          <h1 className={`mb-3 text-5xl font-semibold text-center`}>Setup</h1>
          {setups.map((setup, index) => (
              <Setup key={index} {...setup} />
          ))}
      </div>
  </Layout>
);
}