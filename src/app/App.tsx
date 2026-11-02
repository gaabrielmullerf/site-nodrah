import { BrandLoader } from "../components/loading/BrandLoader";
import { Hero } from "../components/hero/Hero";
import { Solutions } from "../components/solutions/Solutions";
import { Packages } from "../components/packages/Packages";
import { Contact } from "../components/contact/Contact";
import { Process } from "../components/sections/Process";
import { Technologies } from "../components/sections/Technologies";
import { Portfolio } from "../components/sections/Portfolio";
import { FAQ } from "../components/sections/FAQ";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { Icons } from "../components/layout/Icons";
import { HeroParticles } from "../components/hero/HeroParticles";
import { useSiteEffects } from "../lib/useSiteEffects";
import { MotionConfig } from "motion/react";
export function App() {
 useSiteEffects();
 return <MotionConfig reducedMotion="user"><BrandLoader />

<Icons />


<a className="skip-link" href="#inicio">{"Pular para o conteúdo"}</a>

<Header />

<a className="mobile-whatsapp" aria-label="Conversar com a Nodrah pelo WhatsApp" href="https://wa.me/5561999423403?text=Ol%C3%A1%21%20Vim%20pelo%20site%20da%20Nodrah%20e%20quero%20conversar%20sobre%20um%20projeto." target="_blank" rel="noopener noreferrer"><span className="whatsapp-label">{"WhatsApp"}</span>
<svg className="ui-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><use href="#ui-whatsapp"></use></svg></a>
<main>
<div className="solutions-panel-transition">

<div className="nodrah-hero-transition">
<div className="nodrah-hero-media" aria-hidden="true"><HeroParticles /></div>

<Hero />

<Solutions />
</div>

<Packages />
</div>

<Process />

<Technologies />

<Portfolio />

<FAQ />

<Contact />
</main>

<Footer />
</MotionConfig>;
}
