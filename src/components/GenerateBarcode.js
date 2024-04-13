import axios from "axios";
import { useState, useEffect } from "react";
import Barcode from "react-barcode";

const { ajax_url } = woomify_barcode_generator_data;

const GenerateBarcode = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [barcodeList, setBarcodeList] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.post(
          ajax_url,
          new URLSearchParams({
            action: "woomify_get_products",
          })
        );
        setProducts(response.data.data);
        console.log("Checking Product WOomify: ", products);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    const searchTerms = value
      .toLowerCase()
      .split(" ")
      .filter((term) => term.length > 0);

    const filtered = products.filter((product) => {
      return searchTerms.every((term) =>
        product.name.toLowerCase().includes(term)
      );
    });

    setFilteredProducts(filtered);
  };

  const addToBarcodeList = (product) => {
    if (!barcodeList.some((item) => item.productId === product.productId)) {
      setBarcodeList([...barcodeList, product]);
    }
  };
  return (
    <div>
      <div className='container mx-auto p-4'>
        <h3 className='text-xl font-semibold mb-2'>WooCommerce Product List</h3>
        <input
          type='text'
          placeholder='Enter product name for which you want barcode...'
          value={searchTerm}
          onChange={handleSearch}
          className='price-checker-input'
        />
        {filteredProducts.length > 0 && (
          <table className='w-full mt-4 border-collapse border border-gray-300'>
            <thead className='bg-gray-100'>
              <tr>
                <th className='border px-4 py-2'>Product ID</th>
                <th className='border px-4 py-2'>Name</th>
                <th className='border px-4 py-2'>Price</th>
                <th className='border px-4 py-2'>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.productId}>
                  <td className='border px-4 py-2'>{product.productId}</td>
                  <td className='border px-4 py-2'>{product.name}</td>
                  <td className='border px-4 py-2'>{product.price}</td>
                  <td className='border px-4 py-2 text-center '>
                    <button
                      onClick={() => addToBarcodeList(product)}
                      className='bg-gradient-to-r from-violet-500 to-fuchsia-500 text-gray-50 hover:text-gray-50 px-4 py-2 rounded-md'>
                      Get Barcode
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className='mt-4'>
          <hr />

          <h3 className='text-xl font-semibold mt-4'>Product Barcode List</h3>

          {/* Loop for barcode */}
          <div className='grid grid-cols-4 gap-x-2'>
            {barcodeList.map((product) => (
              <div className='border rounded-md shadow-md p-4 my-4 flex flex-col items-center'>
                <h3 className='text-base font-semibold'>{product.name}</h3>
                <Barcode
                  value={product.sku}
                  width={2}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateBarcode;
