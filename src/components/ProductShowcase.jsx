import ScreenshotFrame from './ScreenshotFrame';
import pipelineKanban from '../assets/screenshots/pipeline-kanban.png';
import relatoriosCrm from '../assets/screenshots/relatorios-crm.png';
import painelAtendimento from '../assets/screenshots/painel-atendimento.png';
import analiseSentimentos from '../assets/screenshots/analise-sentimentos.png';
import conectarCanais from '../assets/screenshots/conectar-canais.png';
import './ProductShowcase.css';

const ITEMS = [
  {
    title: 'Pipeline Kanban visual para cada etapa da venda',
    description:
      'Oportunidades organizadas por funil, com valor previsto, tempo parado e responsável, tudo em um quadro só.',
    image: pipelineKanban,
    alt: 'Pipeline Kanban do Kippli com oportunidades organizadas por etapa',
  },
  {
    title: 'Dashboards e indicadores da operação comercial',
    description:
      'Total de oportunidades, valor gerado, taxa de conversão e vendas ganhas, comparados por pipeline e por período.',
    image: relatoriosCrm,
    alt: 'Tela de Relatórios CRM do Kippli com gráfico de oportunidades por pipeline',
  },
  {
    title: 'Gestão de equipes com filas e métricas em tempo real',
    description:
      'Acompanhe quem está online, em espera ou aguardando resposta por departamento e atendente, com controle total da operação.',
    image: painelAtendimento,
    alt: 'Painel de Atendimento do Kippli com métricas por departamento e por atendente',
  },
  {
    title: 'A IA lê o tom de cada conversa e calcula a satisfação automaticamente',
    description:
      'Identifique atendimentos críticos antes que o cliente desista, com um score de sentimento gerado em tempo real pela IA.',
    image: analiseSentimentos,
    alt: 'Tela de Análise de Sentimentos do Kippli com percentuais de positivos, neutros e negativos',
  },
  {
    title: 'WhatsApp e outros canais, integrados à sua operação comercial',
    description:
      'Seu WhatsApp faz parte da operação comercial. O Kippli organiza tudo, com Instagram, e-mail, Telegram e outros canais no mesmo histórico.',
    image: conectarCanais,
    alt: 'Modal de adicionar nova instância com opções de WhatsApp, Instagram, Messenger, e-mail, WebChat, Telegram e SMS',
  },
];

export default function ProductShowcase() {
  return (
    <section className="section showcase">
      <div className="container">
        <div className="section-head">
          <h2>Veja o Kippli por dentro</h2>
          <p>Um painel só para atender, vender e acompanhar o resultado, sem planilha e sem ferramenta paralela.</p>
        </div>

        <div className="showcase__rows">
          {ITEMS.map((item, index) => (
            <div
              key={item.title}
              className={`showcase__row ${index % 2 === 1 ? 'showcase__row--reverse' : ''}`}
            >
              <div className="showcase__text">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
              <div className="showcase__visual">
                <ScreenshotFrame src={item.image} alt={item.alt} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
