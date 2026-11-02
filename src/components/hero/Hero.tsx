import { motion } from 'motion/react';
export function Hero() {
 return <section id="inicio" className="nodrah-hero" aria-labelledby="nodrah-hero-title" tabIndex={-1}>
  <div className="nodrah-hero-content">
   <motion.h1 id="nodrah-hero-title" initial={false} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
    <span className="hero-title-line">Tecnologia acima</span>
    <span className="hero-title-line hero-title-accent">e além do convencional</span>
   </motion.h1>
   <div className="hero-actions"><motion.a className="hero-action" href="#solucoes" whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>Conhecer soluções</motion.a><motion.a className="hero-action hero-action-secondary" href="#contato" whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>Iniciar projeto</motion.a></div>
  </div>
 </section>;
}
