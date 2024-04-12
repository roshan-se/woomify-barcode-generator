import axios from "axios";
import { useState, useEffect } from "react";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

const { roles, ajax_url, dreamify_rules_options } = woomify_barcode_generator_data;

export default function SingleProductBarcodeGenerator() {
  console.log(dreamify_rules_options);
  const [rulesData, setRulesData] = useState(dreamify_rules_options);

  const [productName, setProductName] = useState("");
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("post");

  useEffect(() => {
    if (rulesData) {
      const product = rulesData.find((item) => item.productId === postId);

      if (!product) {
        if (!postId) {
          console.error("No product ID found in URL.");
          return;
        } else {
          axios
            .post(
              ajax_url,
              new URLSearchParams({
                action: "dreamify_get_product_name",
                product_id: postId,
              })
            )
            .then((response) => {
              setProductName(response.data);
              setRulesData([
                ...rulesData,
                {
                  productId: postId,
                  name: response.data,
                  rules: [
                    {
                      id: 1,
                      role: "Wholesale",
                      regular_price: "",
                    },
                    {
                      id: 2,
                      role: "Discount",
                      regular_price: "",
                    },
                    {
                      id: 3,
                      role: "VIP",
                      regular_price: "",
                    },
                    {
                      id: 4,
                      role: "PP",
                      regular_price: "",
                    },
                  ],
                },
              ]);
            })
            .catch((err) => {
              console.error(err.message);
            });
        }
      }
    }
    console.log("Checking rules data for product name", rulesData);
  }, [postId, rulesData, productName]);

  const updateProductRules = () => {
    const updatedProducts = rulesData.map((product) => {
      if (product.productId === postId) {
        const lastObj = product.rules[product.rules.length - 1];
        const updatedRules = [
          ...product.rules,
          {
            id: lastObj.id + 1,
            role: "",
            regular_price: "",
          },
        ];
        return { ...product, rules: updatedRules };
      }
      return product;
    });

    setRulesData(updatedProducts);
  };

  const initializeEmptyProduct = () => {
    setRulesData([
      ...rulesData,
      {
        productId: postId,
        name: productName,
        rules: [
          {
            id: 1,
            role: "Wholesale",
            regular_price: "",
          },
          {
            id: 2,
            role: "Discount",
            regular_price: "",
          },
          {
            id: 3,
            role: "VIP",
            regular_price: "",
          },
          {
            id: 4,
            role: "PP",
            regular_price: "",
          },
        ],
      },
    ]);
    console.log("Checking rules data for product name", rulesData);
  };

  const addRules = (e) => {
    e.preventDefault();
    if (rulesData.length < 1) {
      initializeEmptyProduct();
    } else {
      const product = rulesData.find((item) => item.productId === postId);
      if (product) {
        updateProductRules();
      } else {
        initializeEmptyProduct();
      }
    }
  };

  const removeRule = (id, e) => {
    e.preventDefault();
    const updatedRulesData = rulesData.map((product) => {
      if (product.productId === postId) {
        const updatedRules = product.rules.filter((rule) => rule.id !== id);
        return { ...product, rules: updatedRules };
      }
      return product;
    });

    setRulesData(updatedRulesData);
  };

  const handleRoleChange = (event, roleId) => {
    const product = rulesData.find((item) => item.productId === postId);
    if (product) {
      const newData = product.rules.map((item) => {
        if (item.id === roleId) {
          return { ...item, role: event.target.value };
        }
        return item;
      });
      const updatedRulesData = rulesData.map((item) => {
        if (item.productId === postId) {
          return { ...item, rules: newData };
        }
        return item;
      });

      setRulesData(updatedRulesData);
    }
  };

  const handleRegularPriceChange = (event, roleId) => {
    const product = rulesData.find((item) => item.productId === postId);
    if (product) {
      const newData = product.rules.map((item) => {
        if (item.id === roleId) {
          return { ...item, regular_price: event.target.value };
        }
        return item;
      });
      const updatedRulesData = rulesData.map((item) => {
        if (item.productId === postId) {
          return { ...item, rules: newData };
        }
        return item;
      });

      setRulesData(updatedRulesData);
    }
  };

  const saveRules = (e) => {
    e.preventDefault();
    const data = {
      action: "my_save_rules_action_2",
      data: JSON.stringify(rulesData),
    };

    axios
      .post(ajax_url, new URLSearchParams(data))
      .then((response) => {
        console.log("Checking Response after saving: ", response);
        NotificationManager.success(
          "Price Tier Updated Successfully",
          "Price Tier"
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className='p-5'>
      <div class='box m-4'>
        <div class='text-lg font-medium mb-2'>Role-based Pricing</div>

        {rulesData &&
          rulesData.map((product) => {
            if (product.productId === postId) {
              return (
                <>
                  {product.rules.map((rule) => (
                    <div className='flex items-center gap-x-2'>
                      <div className=''>
                        <div className='text-sm font-semibold'>
                          Select Role:
                        </div>
                        <select
                          id='role'
                          value={rule.role}
                          onChange={(event) =>
                            handleRoleChange(event, rule.id)
                          }>
                          <option value=''>-- Select Role --</option>
                          {Object.values(roles).map((role) => (
                            <option
                              key={role.name}
                              value={role.name}>
                              {role.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className='flex items-center gap-x-2'>
                        <div className='w-full'>
                          <div for='role_price'>Regular Price:</div>
                          <input
                            value={rule.regular_price}
                            onChange={(event) =>
                              handleRegularPriceChange(event, rule.id)
                            }
                            className='dreamify-custom-input'
                            type='number'
                            step='1'
                            min='0'
                            placeholder='Enter regular price'
                          />
                        </div>
                      </div>
                      <div>
                        <button
                          className='text-red-500 hover:text-red-600'
                          onClick={(e) => removeRule(rule.id, e)}>
                          <span className='dashicons dashicons-trash'></span>
                        </button>
                      </div>
                    </div>
                  ))}
                </>
              );
            } else return;
          })}

        <div className='border-t mt-4 py-4'>
          <div className='flex gap-x-3'>
            <button
              className='bg-sky-500 hover:bg-sky-600 px-4 py-2 text-white rounded-md'
              onClick={addRules}>
              Add New Rule
            </button>
            <button
              className='bg-green-500 hover:bg-green-600 px-4 py-2 text-white rounded-md min-w-[6rem]'
              onClick={saveRules}>
              Save
            </button>
          </div>
        </div>
      </div>
      <NotificationContainer />
    </div>
  );
}
