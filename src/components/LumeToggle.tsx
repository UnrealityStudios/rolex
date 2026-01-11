

import { useLume } from '@/context/LumeContext';
import { motion } from 'framer-motion';

export default function LumeToggle() {
    const { isLumeActive, toggleLume } = useLume();

    return (
        <motion.button
            onClick={toggleLume}
            className={`fixed bottom-8 right-8 z-50 flex items-center gap-3 px-4 py-2 border rounded-full backdrop-blur-md transition-all duration-500
        ${isLumeActive
                    ? 'border-[#00f0ff] bg-[#00f0ff]/10 text-[#00f0ff]'
                    : 'border-white/10 bg-white/5 text-white/40 hover:text-white hover:border-white'}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <div className={`w-2 h-2 rounded-full ${isLumeActive ? 'bg-[#00f0ff] animate-pulse shadow-[0_0_10px_#00f0ff]' : 'bg-white/20'}`} />
            <span className="text-[10px] uppercase tracking-[0.2em] font-medium">
                Lume {isLumeActive ? 'ON' : 'OFF'}
            </span>
        </motion.button>
    );
}
