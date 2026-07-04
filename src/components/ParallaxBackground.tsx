import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const ParallaxBackground: React.FC = () => {
  const { scrollY } = useScroll();
  
  // Parallax translation speeds for different layers
  const y1 = useTransform(scrollY, [0, 5000], [0, -1200]);
  const y2 = useTransform(scrollY, [0, 5000], [0, -800]);
  const y3 = useTransform(scrollY, [0, 5000], [0, -400]);

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-700">
      
      {/* Mesh/Grid structural overlay (Fixed) */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] bg-[radial-gradient(#312e81_1px,transparent_1px)] [background-size:24px_24px]"></div>

      {/* Deepest Layer - Slowest */}
      <motion.div style={{ y: y1 }} className="absolute inset-0">
        <div className="absolute top-[10%] left-[10%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-indigo-300/30 dark:bg-indigo-900/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[20%] right-[15%] w-[35vw] h-[35vw] max-w-[400px] max-h-[400px] bg-blue-300/20 dark:bg-blue-900/10 rounded-full blur-[120px]"></div>
      </motion.div>

      {/* Mid Layer */}
      <motion.div style={{ y: y2 }} className="absolute inset-0">
        <div className="absolute top-[40%] right-[10%] w-[30vw] h-[30vw] max-w-[400px] max-h-[400px] bg-purple-300/30 dark:bg-purple-900/20 rounded-full blur-[90px]"></div>
        <div className="absolute top-[70%] left-[5%] w-[25vw] h-[25vw] max-w-[300px] max-h-[300px] bg-emerald-200/20 dark:bg-emerald-900/10 rounded-full blur-[80px]"></div>
      </motion.div>

      {/* Front Layer - Fastest */}
      <motion.div style={{ y: y3 }} className="absolute inset-0">
         <div className="absolute top-[80%] right-[30%] w-[20vw] h-[20vw] max-w-[250px] max-h-[250px] bg-indigo-400/20 dark:bg-indigo-600/10 rounded-full blur-[70px]"></div>
      </motion.div>

    </div>
  );
};
