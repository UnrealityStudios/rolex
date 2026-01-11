import { motion } from "framer-motion";

const watches = [
    { name: "Submariner", desc: "The reference among divers' watches.", price: "Discover", img: "/watches/Submariner.png" },
    { name: "Day-Date", desc: "The ultimate status watch.", price: "Discover", img: "/watches/Day-Date.jpg" },
    { name: "Datejust", desc: "The classic watch of reference.", price: "Discover", img: "/watches/DayJust.jpg" },
];

export default function Collection() {
    return (
        <section className="bg-background pb-48 pt-12 px-6">
            <div className="max-w-7xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center text-4xl font-extralight mb-24 text-white tracking-[0.2em] uppercase"
                >
                    The Collection
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {watches.map((watch, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.6 }}
                            className="group relative h-[600px] border border-white/5 bg-gradient-to-b from-white/5 to-black/40 backdrop-blur-md 
                         hover:border-rolex-gold/30 hover:to-rolex-gold/5 transition-all duration-700 overflow-hidden flex flex-col justify-end p-10 cursor-pointer"
                        >
                            {/* Watch Image */}
                            <div className="absolute inset-0 z-0">
                                <img
                                    src={watch.img}
                                    alt={watch.name}
                                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                            </div>

                            <div className="relative z-10 translate-y-8 group-hover:translate-y-0 transition-transform duration-700 ease-out">
                                <h3 className="text-3xl font-bold text-white mb-3 group-hover:text-rolex-gold transition-colors duration-500">{watch.name}</h3>
                                <p className="text-white/70 mb-8 font-light text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">{watch.desc}</p>

                                <span className="text-xs uppercase tracking-[0.3em] text-white/50 group-hover:text-white border-b border-transparent group-hover:border-white pb-1 transition-all">
                                    {watch.price}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
