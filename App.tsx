import { Header } from '@/components/sections/Header';
import { Hero } from '@/components/sections/Hero';
import { FormContainer } from '@/components/form/FormContainer';
import { TrustBar } from '@/components/sections/TrustBar';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { SeoSection } from '@/components/sections/SeoSection';
import { Footer } from '@/components/sections/Footer';

function App() {
  return (
    <div className="min-h-screen bg-[var(--bg-page)]">
      <Header />
      <Hero />
      <FormContainer />
      <TrustBar />
      <HowItWorks />
      <SeoSection />
      <Footer />
    </div>
  );
}

export default App;
