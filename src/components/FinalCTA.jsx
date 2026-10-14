import { WHATSAPP_URL } from '../data/content';
import './FinalCTA.css';

export default function FinalCTA() {
  return (
    <section className="section final-cta">
      <div className="container">
        <div className="final-cta__card">
          <h2>Mais controle sobre sua operação. Mais inteligência para vender.</h2>
          <p>Fale com um especialista e veja o Kippli organizando sua operação comercial.</p>
          <a href={WHATSAPP_URL} className="btn btn-primary" target="_blank" rel="noreferrer">
            Conhecer o Kippli
          </a>
        </div>
      </div>
    </section>
  );
}
