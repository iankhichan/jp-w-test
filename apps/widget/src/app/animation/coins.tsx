import React, { useEffect, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';

interface Coin {
  id: number;
  x: number;
}

interface FallingCoinsProps {
  value: number;
  previousValue: number;
}

const FallingCoins: React.FC<FallingCoinsProps> = ({
  value,
  previousValue,
}) => {
  const [coins, setCoins] = useState<Coin[]>([]);

  useEffect(() => {
    const increment = value - previousValue;
    if (increment > 0) {
      const newCoins = Array.from({ length: increment }, () => ({
        id: Date.now() + Math.random(),
        x: Math.random() * (window.innerWidth - 50), // random x position
      }));

      setCoins((prev) => [...prev, ...newCoins]);

      // Cleanup coins after animation
      setTimeout(() => {
        setCoins((prev) =>
          prev.filter((c) => !newCoins.find((nc) => nc.id === c.id))
        );
      }, 2000);
    }
  }, [value, previousValue]);

  return (
    <div className="fixed inset-0 pointer-events-none">
      {coins.map((coin) => (
        <CoinAnimation key={coin.id} x={coin.x} />
      ))}
    </div>
  );
};

const CoinAnimation: React.FC<{ x: number }> = ({ x }) => {
  const props = useSpring({
    from: { y: -20, opacity: 1 },
    to: { y: window.innerHeight, opacity: 0 },
    config: { duration: 2000 },
  });

  return (
    <animated.div
      style={{
        position: 'absolute',
        left: x,
        transform: props.y.to((y) => `translateY(${y}px)`),
        opacity: props.opacity,
      }}
      className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-white font-bold"
    >
      +1
    </animated.div>
  );
};

export default FallingCoins;
