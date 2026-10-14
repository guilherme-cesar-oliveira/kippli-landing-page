import logo from '../assets/logo.svg';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <img src={logo} alt="Kippli CRM" className="brand__logo brand__logo--footer" />
        <span className="site-footer__copy">
          © {new Date().getFullYear()} Kippli CRM. Todos os direitos reservados.
        </span>
      </div>
    </footer>
  );
}
