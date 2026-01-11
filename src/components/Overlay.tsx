

import { useScroll, useTransform, motion } from 'framer-motion';
import { useLume } from '@/context/LumeContext';

export default function Overlay() {
    const { scrollYProgress } = useScroll();

    // Transform ranges for opacity, y-position, and blur
    // Scene 1: 0 - 0.25
    const opacity1 = useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 1, 0]);
    const y1 = useTransform(scrollYProgress, [0, 0.25], [0, -50]);
    const blur1 = useTransform(scrollYProgress, [0, 0.15, 0.25], ["0px", "0px", "10px"]);

    // Scene 2: 0.3 - 0.55
    const opacity2 = useTransform(scrollYProgress, [0.25, 0.35, 0.5, 0.6], [0, 1, 1, 0]);
    const y2 = useTransform(scrollYProgress, [0.25, 0.6], [50, -50]);
    const blur2 = useTransform(scrollYProgress, [0.25, 0.35, 0.5, 0.6], ["10px", "0px", "0px", "10px"]);

    // Scene 3: 0.65 - 0.9
    const opacity3 = useTransform(scrollYProgress, [0.6, 0.7, 0.9], [0, 1, 0]);
    const y3 = useTransform(scrollYProgress, [0.6, 0.9], [50, 0]);
    const blur3 = useTransform(scrollYProgress, [0.6, 0.7, 0.9], ["10px", "0px", "0px"]);

    // Lume Mode
    const { isLumeActive } = useLume();
    const textColor = isLumeActive ? "text-[#00f0ff] drop-shadow-[0_0_15px_rgba(0,240,255,0.5)]" : "text-white";
    const descColor = isLumeActive ? "text-[#00f0ff]/80" : "text-rolex-gold";

    return (
        <div className="absolute inset-0 pointer-events-none flex flex-col justify-center items-center z-10 p-8">

            {/* Scene 1: Center */}
            <motion.div
                style={{ opacity: opacity1, y: y1, filter: blur1 }}
                className="absolute text-center"
            >
                <h1 className={`text-6xl md:text-9xl font-bold tracking-tighter mb-6 drop-shadow-2xl transition-colors duration-500 ${textColor}`}>ROLEX</h1>
                <p className={`text-lg md:text-xl tracking-[0.3em] font-light uppercase transition-colors duration-500 ${descColor}`}>A Crown for Every Achievement</p>
            </motion.div>

            {/* Scene 2: Left */}
            <motion.div
                style={{ opacity: opacity2, y: y2, filter: blur2 }}
                className="absolute w-full px-12 md:px-32 flex justify-start top-1/2 -translate-y-1/2"
            >
                <div className="max-w-xl">
                    <h2 className={`text-5xl md:text-7xl font-light leading-tight transition-colors duration-500 ${isLumeActive ? 'text-[#00f0ff]/90' : 'text-white'}`}>
                        Precision engineered <br />
                        <span className={`font-bold transition-colors duration-500 ${isLumeActive ? 'text-[#00f0ff] animate-pulse' : 'text-rolex-gold'}`}>beyond time.</span>
                    </h2>
                </div>
            </motion.div>

            {/* Scene 3: Right */}
            <motion.div
                style={{ opacity: opacity3, y: y3, filter: blur3 }}
                className="absolute w-full px-12 md:px-32 flex justify-end top-1/2 -translate-y-1/2"
            >
                <div className="max-w-xl text-right">
                    <h2 className={`text-5xl md:text-7xl font-light leading-tight transition-colors duration-500 ${isLumeActive ? 'text-[#00f0ff]/90' : 'text-white'}`}>
                        Where heritage <br />
                        <span className={`font-bold transition-colors duration-500 ${isLumeActive ? 'text-[#00f0ff] animate-pulse' : 'text-rolex-gold'}`}>meets innovation.</span>
                    </h2>
                </div>
            </motion.div>

        </div>
    );
}
