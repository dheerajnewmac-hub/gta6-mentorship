import { useState } from 'react';
import { BlueprintSection } from './components/BlueprintSection';
import { CheckoutModal } from './components/CheckoutModal';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { LiveBuyerToast } from './components/LiveBuyerToast';
import { MobileStickyBar } from './components/MobileStickyBar';
import { PricingSection } from './components/PricingSection';
import { ProofLightbox } from './components/ProofLightbox';
import { ProofVault } from './components/ProofVault';
import { CurrencyCode, PlanId } from './utils/pricing';
import { ProofItem } from './utils/proofFilter';

export default function App() {
  const [currency, setCurrency] = useState<CurrencyCode>('INR');
  const [selectedProof, setSelectedProof] = useState<ProofItem | null>(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PlanId>('vip_3m');

  const openCheckout = (planId: PlanId = 'vip_3m') => {
    setSelectedPlan(planId);
    setCheckoutOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#07050F] text-white selection:bg-violet-500/40 selection:text-white">
      <Header onEnrollClick={openCheckout} />

      <main>
        <HeroSection
          currency={currency}
          onCurrencyChange={setCurrency}
          onEnrollClick={openCheckout}
          onSelectProof={setSelectedProof}
        />
        <ProofVault currency={currency} onSelectProof={setSelectedProof} />
        <BlueprintSection currency={currency} onEnrollClick={openCheckout} />
        <PricingSection
          currency={currency}
          onCurrencyChange={setCurrency}
          onSelectPlan={openCheckout}
        />
        <FaqSection onEnrollClick={openCheckout} />
      </main>

      <Footer />

      <LiveBuyerToast
        currency={currency}
        isPaused={checkoutOpen || selectedProof !== null}
        onSelectPlan={openCheckout}
      />

      <MobileStickyBar currency={currency} onEnrollClick={openCheckout} />

      <ProofLightbox
        item={selectedProof}
        currency={currency}
        onClose={() => setSelectedProof(null)}
        onEnrollClick={openCheckout}
      />

      <CheckoutModal
        isOpen={checkoutOpen}
        initialPlan={selectedPlan}
        currency={currency}
        onClose={() => setCheckoutOpen(false)}
      />
    </div>
  );
}
