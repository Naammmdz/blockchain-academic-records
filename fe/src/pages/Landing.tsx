import React from 'react';
import { motion } from 'framer-motion';
import { 
  HeroSection,
  ValueProposition,
  TargetAudiences,
  HowItWorks,
  FeaturesShowcase,
  TrustSection,
  Testimonials,
  CTASection,
  LandingFooter
} from '../components/landing';

const Landing: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      {/* Hero Section */}
      <HeroSection />
      
      {/* Value Proposition */}
      <ValueProposition />
      
      {/* Target Audiences */}
      <TargetAudiences />
      
      {/* How It Works */}
      <HowItWorks />
      
      {/* Features Showcase */}
      <FeaturesShowcase />
      
      {/* Trust & Security */}
      <TrustSection />
      
      {/* Testimonials */}
      <Testimonials />
      
      {/* Call to Action */}
      <CTASection />
      
      {/* Footer */}
      <LandingFooter />
    </motion.div>
  );
};

export default Landing;
