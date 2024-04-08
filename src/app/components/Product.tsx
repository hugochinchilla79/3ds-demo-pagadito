import { useState } from "react";

type ProductProps = {
  price: number;
  quantity: number;
  description: string;
  tag: string;
  onUpdateOrder: (description: string, quantity: number, price: number) => void;
};

const Product: React.FC<ProductProps> = ({
  price,
  quantity,
  description,
  tag,
  onUpdateOrder,
}) => {
  const [quantityValue, setQuantityValue] = useState(quantity);

  const handleIncrease = () => {
    setQuantityValue(quantityValue + 1);
    onUpdateOrder(description, quantityValue + 1, price);
  };

  const handleDecrease = () => {
    if (quantityValue > 0) {
      setQuantityValue(quantityValue - 1);
      onUpdateOrder(description, quantityValue - 1, price);
    }
  };

  return (
    <div className="mx-auto">
      <div className="p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-full flex items-center">
        <div className="flex-1">
          <img
            src={"/img/covers/"+ tag +".jpg"}
            alt="Product Image"
            className="w-24 h-24 object-cover rounded-lg"
          />
        </div>
        <div className="flex-1 ml-4">
          <h2 className="text-xl font-bold text-blue-900 dark:text-white mb-2">
            {description}
          </h2>
        </div>
        <div className="flex flex-col items-center ml-4">
          <p className="text-2xl font-bold text-green-700 dark:text-white">
            ${price}
          </p>
          <div className="flex items-center mt-2">
            <button
              onClick={handleDecrease}
              className="px-2 py-1 bg-blue-900 dark:bg-yellow-500 text-white rounded-lg"
            >
              -
            </button>
            <p className="mx-2 dark:text-white">{quantityValue}</p>
            <button
              onClick={handleIncrease}
              className="px-2 py-1 bg-blue-900 dark:bg-yellow-500 text-white rounded-lg"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
