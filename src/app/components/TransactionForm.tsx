import React, { useState } from "react";

interface TransactionData {
  onSubmit: (data: any) => void;
}

const TransactionForm: React.FC<TransactionData> = ({ onSubmit }) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Validate amount (float or integer numbers)
    const isValidAmount = /^[0-9]+(\.[0-9]+)?$/.test(amount);

    if (isValidAmount) {
      // Perform submit logic here
      onSubmit({ amount, description });

      // Reset form fields
      setAmount("");
      setDescription("");
    } else {
      alert("Invalid amount. Please enter a valid number.");
    }
  };

  return (
    <div className="container mx-auto flex justify-center">
      <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-1/2">
        <h1 className="text-xl font-semibold dark:text-white">
          Transaction Form
        </h1>

        <hr className="my-4" />

        <small className="dark:text-white">
          <i>
            Just write the amount and any description to start the card
            enrollment process
          </i>
        </small>

        <hr className="my-4" />

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="amount" className="block mb-2 dark:text-white">
              Amount:
            </label>
            <input
              type="text"
              id="amount"
              value={amount}
              onChange={handleAmountChange}
              required
              className="border border-gray-300 rounded px-4 py-2 w-full"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block mt-2 mb-2 dark:text-white"
            >
              Description:
            </label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={handleDescriptionChange}
              required
              className="border border-gray-300 rounded px-4 py-2 w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;
