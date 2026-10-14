import ScreenshotFrame from './ScreenshotFrame';
import homeOverview from '../assets/screenshots/home-overview.png';
import './MetricsBanner.css';

export default function MetricsBanner() {
  return (
    <section className="section metrics">
      <div className="container">
        <div className="metrics-banner">
          <div className="metrics-banner__text">
            <span className="eyebrow eyebrow--dark">Para gestores</span>
            <h2>Controle e métricas em tempo real</h2>
            <p>
              Tempo médio de espera, performance individual de cada atendente, gerenciamento de
              instâncias e relatórios analíticos completos, tudo em um painel só, para decidir
              com dados e não com achismo.
            </p>
          </div>
          <div className="metrics-banner__visual">
            <ScreenshotFrame
              src={homeOverview}
              alt="Visão geral diária do Kippli com conversas abertas, oportunidades, tarefas e agendamentos"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
