import { useState } from 'react';
import { BlueprintSection } from './components/BlueprintSection';
import { CheckoutModal } from './components/CheckoutModal';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { LiveBuyerToast } from './components/LiveBuyerToast';
import { MobileStickyBar } from './components/MobileStickyBar';
import { ModulesSection } from './components/ModulesSection';
import { PricingSection } from './components/PricingSection';
import { ProofLightbox } from './components/ProofLightbox';
import { ProofVault } from './components/ProofVault';
import { StudentReviewsSection } from './components/StudentReviewsSection';
import { CurrencyCode, PlanId } from './utils/pricing';
import { ProofItem } from './utils/proofFilter';

export default function App() {
  const [currency, setCurrency] = useState<CurrencyCode>('INR');
  const [selectedProof, setSelectedProof] = useState<ProofItem | null>(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PlanId>('pro');

  const openCheckout = (planId: PlanId = 'pro') => {
    setSelectedPlan(planId);
    setCheckoutOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#07050F] text-white selection:bg-violet-500/40 selection:text-white">
      <Header onEnrollClick={openCheckout} />

      <main>
        {/* 1st: Top Headline + All Mentorship Plans & Full Plan Info Immediately Visible */}
        <PricingSection
          currency={currency}
          onCurrencyChange={setCurrency}
          onSelectPlan={openCheckout}
        />

        {/* 2nd: My & My Students' Verified Results (All 9 Real Earning & Analytics Proofs) */}
        <ProofVault currency={currency} onSelectProof={setSelectedProof} />

        {/* 3rd: 12 Student Reviews with Photos & 4.9/5 Mentorship Rating */}
        <StudentReviewsSection onEnrollClick={openCheckout} />

        {/* Additional Details: 8 Course Modules + Free Insta Software + Blueprint + FAQ */}
        <ModulesSection currency={currency} onSelectPlan={openCheckout} />
        <BlueprintSection currency={currency} onEnrollClick={openCheckout} />
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
