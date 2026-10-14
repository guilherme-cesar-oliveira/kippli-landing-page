import Header from './components/Header';
import Hero from './components/Hero';
import ProductShowcase from './components/ProductShowcase';
import ComparisonSection from './components/ComparisonSection';
import ModulesGrid from './components/ModulesGrid';
import MetricsBanner from './components/MetricsBanner';
import HowItWorks from './components/HowItWorks';
import FAQ from './components/FAQ';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ComparisonSection />
        <ModulesGrid />
        <ProductShowcase />
        <MetricsBanner />
        <HowItWorks />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
