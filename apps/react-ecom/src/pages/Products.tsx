import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../services/product.service";
import { useState } from "react";

const products = [
  {
    id: 1,
    name: 'iphone XS',
    price: 350,
    imgurl: 'https://cdn.tuk.dev/assets/templates/classified/Bitmap (1).png',
    date: '4 days ago',
    desc: 'The Apple iPhone XS is available in 3 colors with 64GB memory. Shoot amazing videos',
    warranty: '12 months warranty',
    place: 'Bay Area, San Francisco'
    // Add more properties as needed
  },
  {
    id: 2,
    name: 'iphone XS',
    price: 350,
    imgurl: 'https://cdn.tuk.dev/assets/templates/classified/Bitmap (1).png',
    date: '4 days ago',
    desc: 'The Apple iPhone XS is available in 3 colors with 64GB memory. Shoot amazing videos',
    warranty: '12 months warranty',
    place: 'Bay Area, San Francisco'
    // Add more properties as needed
  },
  // Add more product objects
];

export default function ProductPage() {
  const [products, setProducts] = useState([]);

  const { isLoading, data } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const products = await fetchProducts()
      setProducts(products);
      return;
    }
  })

  return (
    <>
      <div className="bg-gray-100 ">
        {/* Remove py-8 */}
        <div className="mx-auto container py-8">
          <div className="flex flex-wrap items-center lg:justify-between justify-center">
            {products.map((item: any) => (

              <div key={item?._id} className="mx-2 w-72 lg:mb-0 mb-8">
                {/* <div>
                  <img src={item.imgurl} className="w-full h-44" />
                </div> */}
                <div className="bg-white">
                  <div className="flex items-center justify-between px-4 pt-4">
                    <div>
                      <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-bookmark" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M9 4h6a2 2 0 0 1 2 2v14l-5-3l-5 3v-14a2 2 0 0 1 2 -2" />
                      </svg>
                    </div>
                    <div className="bg-yellow-200 py-1.5 px-6 rounded-full">
                      <p className="text-xs text-yellow-500">Featured</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center">
                      <h2 className="text-lg font-semibold">{item.name}</h2>
                      {/* <p className="text-xs text-gray-600 pl-5">{item.date}</p> */}
                    </div>
                    <p className="text-xs text-gray-600 mt-2">{item.description}</p>

                    <div className="flex items-center justify-between py-4">
                      <h3 className="text-indigo-700 text-xl font-semibold">${item.price}</h3>
                    </div>
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
    </>
  );
}