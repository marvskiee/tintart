import { useState } from 'react';

const useQuantity = (initialValue) => {
  const [quantity, setQuantity] = useState(initialValue);

  const increment = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  return {
    quantity,
    increment,
    decrement,
  };
};

export default useQuantity;
