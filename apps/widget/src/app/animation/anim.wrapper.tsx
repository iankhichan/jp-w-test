import { useState } from 'react';
import FallingCoins from './coins';

export const Bubbles: React.FC<{ newValue?: number }> = ({ newValue = 3 }) => {
  const [currentValue, setCurrentValue] = useState(0);
  const [previousValue, setPreviousValue] = useState(0);

  // Example of updating the value
  const handleUpdate = () => {
    setPreviousValue(currentValue);
    setCurrentValue((prev) => prev + newValue); // Example increment
  };

  return (
    <div>
      <button onClick={handleUpdate}>Update Value</button>
      <div>Current Value: {currentValue}</div>
      <FallingCoins value={currentValue} previousValue={previousValue} />
    </div>
  );
};
