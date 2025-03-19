import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CoinProps {
  id: number;
  value: number;
}

const coinVariants = {
  hidden: {
    y: '100%',
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
    },
  },
  exit: {
    y: '-100%',
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
    },
  },
};

const IncrementVisualizer: React.FC<{ increment: number }> = ({
  increment,
}) => {
  const [coins, setCoins] = useState<CoinProps[]>([]);

  useEffect(() => {
    if (increment > 0) {
      setCoins((prevCoins) => [
        ...prevCoins,
        { id: Date.now(), value: increment },
      ]);
    }
  }, [increment]);

  return (
    <div className="fixed bottom-0 left-0 w-full h-full pointer-events-none">
      <div className="flex items-end justify-center h-full">
        <AnimatePresence>
          {coins.map((coin) => (
            <motion.div
              key={coin.id}
              variants={coinVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute bottom-0 mb-2"
            >
              <div className="bg-yellow-400 rounded-full px-3 py-2 flex items-center justify-center text-white font-bold text-sm">
                +{coin.value}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default IncrementVisualizer;
