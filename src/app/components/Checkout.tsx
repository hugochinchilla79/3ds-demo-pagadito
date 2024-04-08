import React from "react";

type CartProps = {
  transactionDetails: TransactionDetail[];
  onSubmit: () => void;
  type: string;
};

import { TransactionDetail } from "../interfaces/TransactionInterfaces";
import Loading from "./Loading";

const Checkout: React.FC<CartProps> = ({ transactionDetails, onSubmit, type }) => {
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const handleSubmit = () => {
    if (calculateTotalAmount() > 0) {
      setIsSubmitted(true);
      onSubmit();
    } else {
      alert("Please add items to cart before proceeding to checkout");
    }
  };

  const calculateTotalAmount = () => {
    return transactionDetails.reduce(
      (total, product) => total + product.quantity * product.amount,
      0
    );
  };

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <h2 className="text-2xl font-bold mt-4 mb-4 rounded-lg dark:text-white text-center">
        Checkout
      </h2>
      <hr className="mb-4" />
      <div className="flex flex-col">
        <div className="flex flex-col items-center">
          <label htmlFor="amount" className="block mb-2 dark:text-white">
            Total Amount:
          </label>
          <strong className="text-green-500 text-3xl font-bold mb-4 dark:text-green-500">
            ${calculateTotalAmount().toFixed(2)}
          </strong>
        </div>
        <div className="grid grid-cols-3 m-4">
          <p className="grid-span-1 text-start dark:text-white">
            <strong>Description</strong>
          </p>
          <p className="grid-span-1 text-end dark:text-white">
            <strong>Quantity</strong>
          </p>
          <p className="grid-span-1 text-end dark:text-white">
            <strong>Price</strong>
          </p>
        </div>

        {transactionDetails.map((product) => (
          <div
            key={product.description}
            className="grid grid-cols-3 m-4 dark:text-white"
          >
            <p className="grid-span-1 text-start border-gray-200 text-sm">
              {product.description}
            </p>
            <p className="grid-span-1 border-gray-200 text-end text-sm">
              {product.quantity}
            </p>
            <p className="grid-span-1 border-gray-200 text-end text-sm">
              ${product.amount.toFixed(2)}
            </p>
          </div>
        ))}
        <div className="flex justify-center mt-8">
          {!isSubmitted && (
            <button
              onClick={handleSubmit}
              className="bg-yellow-500 text-black py-2 px-4 rounded-lg w-full"
            >
              <strong>PAY</strong>
            </button>
          )}

          { type == "redirect" && isSubmitted && (
            <Loading/>
          )}

        </div>
      </div>
    </div>
  );
};

export default Checkout;
