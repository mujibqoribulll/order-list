"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import ButtonText from "../../components/buttons/button-text";

import { useGetServiceProduct } from "@/hooks/feature/products";
import Image from "next/image";

const ComponentsModalOrder = dynamic(() =>
  import("@/components/modals/modal-order")
);

const ComponentsModalDelete = dynamic(() =>
  import("@/components/modals/modal-delete")
);

const ListOrder = () => {
  const [isModalOrderOpen, setIsModalOrderOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isOpenDropDown, setIsOpenDropDown] = useState(false);
  const [selectOption, setSelectOption] = useState("");
  const [formState, setFormState] = useState({
    description: "",
    qty: 0,
    price: 0,
  });

  const [deleteItem, setDeleteItem] = useState("");

  const { getServiceProducts, getProducts } = useGetServiceProduct();

  const [listOrder, setListOrder] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);

  useEffect(() => {
    setListOrder(getProducts?.data);
  }, [getProducts]);

  useEffect(() => {
    getServiceProducts();
  }, []);

  useEffect(() => {
    let totalPrice = 0;
    listOrder?.map?.((item) => {
      totalPrice += item?.price * item?.stock;
    });
    setGrandTotal(totalPrice);
  }, [listOrder]);

  const options = ["Krupuk", "Onde", "tempe"];
  const WHITELIST_NUMBER = ["qty", "price"];

  const handleChange = (event) => {
    const { name, value } = event?.target;
    setFormState((prevState) => {
      if (WHITELIST_NUMBER.includes(name)) {
        let newValue = value.replace(/\D/g, "");
        if (prevState[name] === "0" && newValue.length > 1) {
          newValue = newValue.replace(/^0+/, "");
        }
        return { ...prevState, [name]: newValue };
      } else {
        return { ...prevState, [name]: value };
      }
    });
  };

  const handleSelect = (option) => {
    setSelectOption(option);
    setIsOpenDropDown(false);
  };

  const handleSubmit = (event) => {
    event?.preventDefault();
    let payload = {
      description: formState?.description,
      id: `${new Date()}`,
      name: selectOption,
      stock: formState?.qty,
      price: formState?.price,
    };
    setListOrder((prevState) => ({ ...prevState, payload }));
    setIsModalDeleteOpen(false);
  };

  const subTotal = (qty, price) => {
    let totalPrice = qty * price;
    return totalPrice;
  };

  const handleDecrease = (id, qty) => {
    if (qty >= 1) {
      let newListOrder = listOrder?.map((item) => {
        if (item?.id == id) {
          return { ...item, stock: qty };
        }
        return item;
      });
      setListOrder(newListOrder);
    } else {
      setIsModalDeleteOpen(true);
      setDeleteItem(id);
    }
  };

  const handelDelete = () => {
    let newListOrder = listOrder?.filter?.((item) => item?.id != deleteItem);
    setListOrder(newListOrder);
    setDeleteItem("");
    setIsModalDeleteOpen(false);
  };

  const handleIncrease = (id, qty) => {
    let newListOrder = listOrder?.map((item) => {
      if (item?.id == id) {
        return { ...item, stock: qty };
      }
      return item;
    });
    setListOrder(newListOrder);
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-row justify-end">
        <ButtonText
          title="Add Order"
          stylesContainer="w-40"
          onPress={() => setIsModalOrderOpen(true)}
        />
      </div>
      {/* content */}
      <div className="my-4">
        <table className="table-fixed w-full text-base text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Harga Satuan</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {listOrder?.map?.((product, index) => (
              <tr
                key={index}
                className={`bg-red-500 border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200`}
              >
                <td>
                  <div className="flex flex-row">
                    <div>
                      <Image
                        src={product?.url_image}
                        alt={`image-${product?.id}`}
                        width={100}
                        height={100}
                      />
                    </div>
                    <div className="flex flex-col">
                      {product?.name}
                      {product?.description}
                    </div>
                  </div>
                </td>
                <td>
                  <ButtonText
                    title="-"
                    stylesContainer="bg-none"
                    onPress={() =>
                      handleDecrease(product?.id, product?.stock - 1)
                    }
                  />
                  {product?.stock}
                  <ButtonText
                    title="+"
                    stylesContainer="bg-none"
                    onPress={() =>
                      handleIncrease(product?.id, product?.stock + 1)
                    }
                  />
                </td>
                <td>{product?.price}</td>
                <td>{subTotal(product?.stock, product?.price)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="bottom-0 bg-gray-900 w-full sticky py-10 my-10 flex justify-end">
          <h2 className="text-3xl p-3">Grand Total {grandTotal}</h2>
        </div>
      </div>
      <ComponentsModalOrder
        isOpen={isModalOrderOpen}
        onClose={() => setIsModalOrderOpen(false)}
        form={formState}
        onChange={handleChange}
        onSubmit={handleSubmit}
        options={options}
        isOpenDropDown={isOpenDropDown}
        setIsOpenDropDown={() => setIsOpenDropDown(!isOpenDropDown)}
        handleSelect={handleSelect}
        selectOption={selectOption}
      />

      <ComponentsModalDelete
        isOpen={isModalDeleteOpen}
        onClose={() => setIsModalDeleteOpen(false)}
        onDelete={handelDelete}
      />
    </div>
  );
};
export default ListOrder;
