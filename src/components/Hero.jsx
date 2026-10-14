import { ArrowRight } from 'lucide-react';
import { HERO_HIGHLIGHTS, WHATSAPP_URL } from '../data/content';
import ScreenshotFrame from './ScreenshotFrame';
import dashboardCrm from '../assets/screenshots/dashboard-crm.png';
import './Hero.css';

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero__glow" aria-hidden="true" />

      <div className="container hero__inner">
        <span className="eyebrow">CRM &amp; Hub Comercial</span>

        <h1 className="hero__title">
          O CRM completo para organizar, automatizar e acelerar suas vendas
        </h1>

        <p className="hero__subtitle">
          Centralize clientes, oportunidades, equipes e processos comerciais, com automações,
          IA e todos os canais de comunicação em uma única plataforma.
        </p>

        <div className="hero__actions">
          <a href={WHATSAPP_URL} className="btn btn-primary" target="_blank" rel="noreferrer">
            Conhecer o Kippli
            <ArrowRight size={18} />
          </a>
          <a href={WHATSAPP_URL} className="btn btn-outline" target="_blank" rel="noreferrer">
            Falar com um especialista
          </a>
        </div>

        <div id="produto" className="hero__mockup">
          <ScreenshotFrame src={dashboardCrm} alt="Dashboard CRM do Kippli, com oportunidades, pipeline e funil de vendas" />
        </div>

        <div className="hero__highlights">
          {HERO_HIGHLIGHTS.map((item) => (
            <div key={item.title} className="hero__highlight">
              <span className="hero__highlight-bar" />
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
