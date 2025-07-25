import React from "react";
import { motion } from "framer-motion";

// --- ANIMAÇÕES ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

function Contato() {
  const userEmail = "julia@vitissouls.com";

  return (
    <section className="bg-[#9ed17f] py-16 md:py-24">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-3xl mx-auto px-4 text-center"
      >
        <motion.h2
          variants={itemVariants}
          className="text-4xl sm:text-7xl text-[#40013b]"
          style={{ fontFamily: "Bebas Neue, sans-serif" }}
        >
          Contato
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="mt-4 text-lg lg:text-[1.5rem] text-[#40013b]/80"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Para esclarecimentos, entre em contato pelo e-mail:
        </motion.p>

        <motion.a
          variants={itemVariants}
          href={`mailto:${userEmail}`}
          className="mt-2 inline-block text-2xl font-semibold text-[#40013b] transition-colors hover:text-[#2d002a] underline"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {userEmail}
        </motion.a>
      </motion.div>
    </section>
  );
}

export default Contato;
