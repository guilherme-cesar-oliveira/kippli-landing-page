import { useEffect, useState } from 'react';
import { APP_LOGIN_URL, WHATSAPP_URL } from '../data/content';
import logo from '../assets/logo.svg';
import './Header.css';

const NAV_LINKS = [
  { label: 'Produto', href: '#produto' },
  { label: 'Módulos', href: '#modulos' },
  { label: 'Como funciona', href: '#como-funciona' },
  { label: 'FAQ', href: '#faq' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container site-header__inner">
        <a href="#top" className="brand">
          <img src={logo} alt="Kippli CRM" className="brand__logo" />
        </a>

        <nav className="site-nav">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <a href={APP_LOGIN_URL} className="btn btn-outline btn-sm header-login">
            Login
          </a>
          <a href={WHATSAPP_URL} className="btn btn-primary btn-sm header-cta" target="_blank" rel="noreferrer">
            <span className="header-cta__full">Falar com um especialista</span>
            <span className="header-cta__short">Fale conosco</span>
          </a>
        </div>
      </div>
    </header>
  );
}
