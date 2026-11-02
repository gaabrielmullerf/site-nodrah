import { useEffect, useRef, type PointerEvent } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';

const projects = [
 {
  name: 'Sphere Yachts',
  category: 'Site institucional · Náutica',
  description: 'Apresentação da Sphere S300 Open, com destaque para o design da embarcação, especificações, galeria e contato.',
  url: 'https://www.sphereyachts.com.br/',
  image: '/assets/portfolio/sphere-yachts.jpg',
  video: '/assets/portfolio/sphere-yachts-preview.mp4',
  domain: 'sphereyachts.com.br',
  alt: 'Site Sphere Yachts, com embarcação em destaque e a chamada Mude a sua perspectiva.'
 },
 {
  name: 'BYD Seal',
  category: 'Landing page · Automotivo',
  description: 'Uma experiência visual dedicada ao BYD Seal, com narrativa por rolagem e apresentação do sedã elétrico.',
  url: 'https://byd-zeta-amber.vercel.app/',
  image: '/assets/portfolio/byd.jpg',
  video: '/assets/portfolio/byd-preview.mp4',
  domain: 'byd-zeta-amber.vercel.app',
  alt: 'Site do projeto BYD Seal, com o veículo em destaque e tipografia ampla sobre a imagem.'
 },
 {
  name: 'Maryane Cavalcanti',
  category: 'Site profissional · Psicologia',
  description: 'Presença digital para apresentar a trajetória profissional, as áreas de atuação em psicologia e neuropsicologia e os canais de contato.',
  url: 'https://maryane.vercel.app/',
  image: '/assets/portfolio/maryane.jpg',
  video: '/assets/portfolio/maryane-preview.mp4',
  domain: 'maryane.vercel.app',
  alt: 'Site de Maryane Cavalcanti, com identidade azul e uma representação visual do cérebro.'
 },
 {
  name: 'Thays Assis',
  category: 'Landing page · Mentoria',
  description: 'Página de apresentação da Mentoria Investidor Milionário, com conteúdo do programa, informações sobre a mentora e inscrições.',
  url: 'https://thais-hazel.vercel.app/',
  image: '/assets/portfolio/thais.jpg',
  video: '/assets/portfolio/thais-preview.mp4',
  domain: 'thais-hazel.vercel.app',
  alt: 'Página da mentoria de Thays Assis, com retratos da mentora e identidade em verde e dourado.'
 }
];


function ProjectArrow() {
 return <svg className="ui-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><use href="#ui-arrow-up-right" /></svg>;
}

type Project = typeof projects[number];

function LivePreview({ project }: { project: Project }) {
 const ref = useRef<HTMLVideoElement>(null);
 const reduced = useReducedMotion();
 useEffect(() => {
  const node = ref.current;
  if (!node) return;
  let visible = false;
  let disposed = false;
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  const update = () => {
   if (!visible || document.hidden || reduced || connection?.saveData) { node.pause(); return; }
   if (!node.getAttribute('src')) node.src = project.video;
   node.play().catch(() => { /* The static poster remains usable if autoplay fails. */ });
  };
  const observer = new IntersectionObserver(([entry]) => {
   if (disposed) return;
   visible = entry.isIntersecting;
   update();
  }, { threshold: 0.15 });
  observer.observe(node);
  document.addEventListener('visibilitychange', update);
  return () => {
   disposed = true;
   observer.disconnect();
   document.removeEventListener('visibilitychange', update);
   node.pause();
  };
 }, [project.video, reduced]);
 return <div className="project-screen">
  <img src={project.image} width={1440} height={1080} loading="lazy" decoding="async" alt={project.alt} />
  <video ref={ref} className="project-live-video" poster={project.image} muted loop playsInline preload="none" aria-hidden="true" tabIndex={-1} onError={event => { event.currentTarget.style.visibility = 'hidden'; }} />
 </div>;
}

function ProjectCard({ project }: { project: Project }) {
 const reduced = useReducedMotion();
 const x = useMotionValue(0);
 const y = useMotionValue(0);
 const rotateX = useSpring(x, { stiffness: 160, damping: 24 });
 const rotateY = useSpring(y, { stiffness: 160, damping: 24 });
 const tilt = (event: PointerEvent<HTMLElement>) => {
  if (reduced || event.pointerType !== 'mouse' || !matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  const bounds = event.currentTarget.getBoundingClientRect();
  x.set((0.5 - (event.clientY - bounds.top) / bounds.height) * 6);
  y.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 6);
 };
 const reset = () => { x.set(0); y.set(0); };
 return <motion.article className="projeto project-glass-card" onPointerMove={tilt} onPointerLeave={reset} style={{ rotateX: reduced ? 0 : rotateX, rotateY: reduced ? 0 : rotateY }} whileHover={reduced ? undefined : { y: -7, scale: 1.012 }} transition={{ type: 'spring', stiffness: 180, damping: 24 }}>
  <a className="project-preview" href={project.url} target="_blank" rel="noopener noreferrer" aria-label={`Visitar ${project.name} (abre em nova aba)`}>
   <div className="project-browser-bar" aria-hidden="true"><span className="project-browser-dots"><i /><i /><i /></span><span className="project-browser-address">{project.domain}</span><ProjectArrow /></div>
   <LivePreview project={project} />
  </a>
  <div className="projeto-info">
   <span className="project-category">{project.category}</span>
   <h3>{project.name}</h3>
   <p>{project.description}</p>
   <a className="project-button" href={project.url} target="_blank" rel="noopener noreferrer" aria-label={`Ver projeto ${project.name} (abre em nova aba)`}>Ver projeto <span className="project-link-icon"><ProjectArrow /></span></a>
  </div>
 </motion.article>;
}

export function Portfolio() {
 return <motion.section initial={false} whileInView={{ opacity: [0.85, 1] }} transition={{ duration: 0.45 }} viewport={{ once: true, amount: 0.1 }} id="portfolio" aria-labelledby="portfolio-title">
  <span className="section-label">PORTFÓLIO</span>
  <div className="section-intro portfolio-intro">
   <h2 id="portfolio-title">Projetos que já<br />estão no ar.</h2>
  </div>
  <div className="lista-projetos" aria-label="Projetos do portfólio">
   {projects.map(project => <ProjectCard key={project.url} project={project} />)}
  </div>
 </motion.section>;
}
