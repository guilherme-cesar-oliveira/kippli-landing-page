import { STEPS } from '../data/content';
import './HowItWorks.css';

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="section">
      <div className="container">
        <div className="section-head">
          <h2>Implantação simples, em poucas horas</h2>
        </div>

        <div className="steps">
          {STEPS.map((step) => (
            <div key={step.number} className="step">
              <span className="step__number">{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
