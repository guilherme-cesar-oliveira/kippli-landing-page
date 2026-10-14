import { Check, X } from 'lucide-react';
import './ComparisonSection.css';

export default function ComparisonSection() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <h2>Chega de operação comercial espalhada</h2>
          <p>
            Clientes em uma planilha, negociações no caderno e conversas soltas no WhatsApp
            pessoal do vendedor. Sem padrão, sem controle e sem visão do funil. É assim que as
            oportunidades se perdem.
          </p>
        </div>

        <div className="compare">
          <div className="compare-card">
            <span className="compare-card__badge">
              <X size={14} /> Sem o Kippli
            </span>
            <p>
              Informações espalhadas em várias ferramentas. Toda atualização precisa ser feita
              na mão, e a operação fica sem histórico nem controle real do funil.
            </p>
          </div>

          <div className="compare-card compare-card--highlight">
            <span className="compare-card__badge compare-card__badge--highlight">
              <Check size={14} /> Com o Kippli
            </span>
            <p>
              Clientes, oportunidades, pipeline, equipes, automações, IA e canais de comunicação
              centralizados em um único ambiente, com controle, histórico e indicadores de toda
              a operação.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
