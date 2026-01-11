import { useEffect, useRef, useState } from 'react';
import { useScroll, useMotionValueEvent, useSpring, AnimatePresence, motion } from 'framer-motion';
import { useLume } from '@/context/LumeContext';

const FRAME_COUNT = 90;

export default function ScrollyCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { scrollYProgress } = useScroll();
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [loadingProgress, setLoadingProgress] = useState(0);

    // Preload images
    useEffect(() => {
        const loadImages = async () => {
            const loadedImages: HTMLImageElement[] = [];
            const promises: Promise<void>[] = [];

            for (let i = 0; i < FRAME_COUNT; i++) {
                const promise = new Promise<void>((resolve) => {
                    const img = new Image();
                    const frameIndex = i.toString().padStart(3, '0');
                    img.src = `/sequence/frame_${frameIndex}.png`;
                    img.onload = () => {
                        loadedImages[i] = img;
                        setLoadingProgress(prev => prev + 1);
                        resolve();
                    };
                    img.onerror = () => {
                        console.error(`Failed to load frame ${frameIndex}`);
                        resolve();
                    };
                });
                promises.push(promise);
            }

            await Promise.all(promises);
            setImages(loadedImages);
            // Small delay to ensure render is ready
            setTimeout(() => setIsLoaded(true), 500);
        };

        loadImages();
    }, []);

    const renderFrame = (index: number) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        const img = images[index];

        if (!canvas || !ctx || !img) return;

        // Clear and draw with object-fit: cover logic
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Calculate dimensions to cover
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.max(hRatio, vRatio);

        const centerShift_x = (canvas.width - img.width * ratio) / 2;
        const centerShift_y = (canvas.height - img.height * ratio) / 2;

        ctx.drawImage(
            img,
            0,
            0,
            img.width,
            img.height,
            centerShift_x,
            centerShift_y,
            img.width * ratio,
            img.height * ratio
        );
    };

    // Physics-based smooth scroll - Aggressively Tuned for Speed
    const smoothProgress = useSpring(scrollYProgress, {
        mass: 0.02,
        stiffness: 300,
        damping: 30,
        restDelta: 0.001
    });

    // Sync scroll to frame
    useMotionValueEvent(smoothProgress, "change", (latest) => {
        if (!isLoaded || images.length === 0) return;

        const frameIndex = Math.min(
            FRAME_COUNT - 1,
            Math.floor(latest * FRAME_COUNT)
        );

        requestAnimationFrame(() => renderFrame(frameIndex));
    });

    // Handle Resize
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
                if (images.length > 0) renderFrame(0);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, [images]);

    // Initial render when loaded
    useEffect(() => {
        if (isLoaded) renderFrame(0);
    }, [isLoaded]);

    // Lume Mode
    const { isLumeActive } = useLume();

    return (
        <div className="absolute inset-0 h-full w-full bg-background transition-colors duration-500">
            <div className={`relative h-full w-full transition-all duration-700 ${isLumeActive ? 'brightness-50 contrast-125 saturate-0' : ''}`}>
                <canvas
                    ref={canvasRef}
                    className="block h-full w-full object-cover"
                />
                {/* Lume Glow Overlay */}
                <div
                    className={`absolute inset-0 pointer-events-none mix-blend-color-dodge transition-opacity duration-700
                    ${isLumeActive ? 'opacity-100' : 'opacity-0'}`}
                    style={{
                        background: 'radial-gradient(circle at 50% 50%, rgba(0, 240, 255, 0.15) 0%, transparent 60%)',
                        boxShadow: 'inset 0 0 100px rgba(0, 0, 0, 0.9)'
                    }}
                />
            </div>

            <AnimatePresence>
                {!isLoaded && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 0.8 } }}
                        className="absolute inset-0 flex flex-col items-center justify-center bg-[#121212] z-50"
                    >
                        <div className="w-64 h-[1px] bg-white/10 overflow-hidden mb-4">
                            <motion.div
                                className="h-full bg-rolex-gold"
                                initial={{ width: "0%" }}
                                animate={{ width: `${(loadingProgress / FRAME_COUNT) * 100}%` }}
                            />
                        </div>
                        <span className="text-[10px] text-rolex-gold/80 uppercase tracking-[0.4em] font-light">
                            Initializing Chronometer
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
