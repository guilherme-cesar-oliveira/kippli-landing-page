import { KanbanSquare, Radio, Bot, Workflow, Users, LayoutDashboard } from 'lucide-react';
import { MODULES } from '../data/content';
import './ModulesGrid.css';

const ICONS = [KanbanSquare, Radio, Bot, Workflow, Users, LayoutDashboard];

export default function ModulesGrid() {
  return (
    <section id="modulos" className="section">
      <div className="container">
        <div className="section-head">
          <h2>Muito mais que um CRM. O centro da sua operação comercial.</h2>
          <p>
            A plataforma reúne CRM, pipeline, gestão de clientes, equipes, automações, IA,
            indicadores e canais de comunicação em um único ambiente.
          </p>
        </div>

        <div className="modules-grid">
          {MODULES.map((mod, index) => {
            const Icon = ICONS[index];
            return (
              <div key={mod.title} className="module-card">
                <span className="module-card__icon">
                  <Icon size={20} />
                </span>
                <h3>{mod.title}</h3>
                <p>{mod.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
