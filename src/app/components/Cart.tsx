import { useState } from 'react';
import Product from './Product';
import { TransactionDetail } from '../interfaces/TransactionInterfaces';
const productsData = require('../data/products.json');


type ProductData = {
  tag: string;
  price: number;
  quantity: number;
  description: string;
};

type CartProps = {
  onUpdateTransactionDetails: (transactionDetails: TransactionDetail[]) => void;
};

const Cart: React.FC<CartProps> = ({onUpdateTransactionDetails}) => {
  const [transactionDetails, setTransactionDetails] = useState<TransactionDetail[]>([]);

  const updateOrder = (description: string, quantity: number, price: number) => {
    const existingProductIndex = transactionDetails.findIndex((product) => product.description === description);

    if (existingProductIndex !== -1) {
      const updatedTransactionDetails = [...transactionDetails];
      updatedTransactionDetails[existingProductIndex].quantity = quantity;
      //if quantity equals 0, remove the product from the list
      if (quantity === 0) {
        updatedTransactionDetails.splice(existingProductIndex, 1);
      }
      setTransactionDetails(updatedTransactionDetails);
      onUpdateTransactionDetails(updatedTransactionDetails);
    } else {
      setTransactionDetails([...transactionDetails, { description, quantity, amount: price }]);
      onUpdateTransactionDetails([...transactionDetails, { description, quantity, amount: price }]);
    }

    
  };



  return (
    <div className="mx-auto">
      <div className="p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-full">
      {productsData.map((product: ProductData, index: number) => (
        <Product
          key={index}
          price={product.price}
          tag={product.tag}
          quantity={product.quantity}
          description={product.description}
          onUpdateOrder={updateOrder}
        />
      ))}

    </div>
    </div>
  );
};

export default Cart;