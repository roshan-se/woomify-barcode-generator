import { useState } from "react";

const { dreamify_rules_options } = woomify_barcode_generator_data;

console.log(
  "Checking data for Price Checker",
  JSON.stringify(dreamify_rules_options)
);

const PriceChecker = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    const searchTerms = value
      .toLowerCase()
      .split(" ")
      .filter((term) => term.length > 0);

    const filtered = dreamify_rules_options.filter((product) => {
      return searchTerms.every((term) =>
        product.name.toLowerCase().includes(term)
      );
    });

    setFilteredProducts(filtered);
  };
  return (
    <div>
       <h3 className='text-base font-medium'>Price Checker</h3>

      <div className='container mx-auto p-4'>
        <input
          type='text'
          placeholder='Enter product name to check price...'
          value={searchTerm}
          onChange={handleSearch}
          className='price-checker-input'
        />
        <table className='w-full mt-4 border-collapse border border-gray-300'>
          <thead className='bg-gray-100'>
            <tr>
              <th className='border px-4 py-2'>Product ID</th>
              <th className='border px-4 py-2'>Name</th>
              <th className='border px-4 py-2'>Wholesale</th>
              <th className='border px-4 py-2'>Discount</th>
              <th className='border px-4 py-2'>VIP</th>
              <th className='border px-4 py-2'>PP</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.productId}>
                <td className='border px-4 py-2'>{product.productId}</td>
                <td className='border px-4 py-2'>{product.name}</td>
                {product.rules.map((rule) => (
                  <td
                    key={rule.id}
                    className='border px-4 py-2'>
                    {rule.sale_price}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PriceChecker;
