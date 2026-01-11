

import { motion } from 'framer-motion';

export default function Excellence() {
    return (
        <section className="bg-background py-32 px-6 md:px-24">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 border-t border-white/10 pt-16">

                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-8"
                >
                    <h3 className="text-rolex-gold uppercase tracking-[0.2em] text-xs font-bold">Swiss Craftsmanship</h3>
                    <p className="text-4xl md:text-6xl font-light leading-tight text-white">
                        Every Rolex watch is designed, produced and assembled with the most exacting attention to detail.
                    </p>
                </motion.div>

                <div className="space-y-16">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-4"
                    >
                        <h4 className="text-2xl font-bold text-white">Perpetual Calibre</h4>
                        <p className="text-white/60 leading-relaxed text-lg font-light">
                            Self-winding mechanical movements, certified as Swiss Chronometers, entirely manufactured by Rolex for ensuring ultimate precision.
                        </p>
                    </motion.div>

                    <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="space-y-4"
                    >
                        <h4 className="text-2xl font-bold text-white">Oystersteel</h4>
                        <p className="text-white/60 leading-relaxed text-lg font-light">
                            Developed for the brand, Oystersteel belongs to the 904L steel family, alloys generally used in high-technology aerospace and chemical industries.
                        </p>
                    </motion.div>
                </div>

            </div>
        </section>
    );
}
