// Lazy loading optimization for better performance
import { lazy } from 'react';

export const LazyValueProposition = lazy(() => 
  import('./ValueProposition').then(module => ({ default: module.ValueProposition }))
);

export const LazyTargetAudiences = lazy(() => 
  import('./TargetAudiences').then(module => ({ default: module.TargetAudiences }))
);

export const LazyHowItWorks = lazy(() => 
  import('./HowItWorks').then(module => ({ default: module.HowItWorks }))
);

export const LazyFeaturesShowcase = lazy(() => 
  import('./FeaturesShowcase').then(module => ({ default: module.FeaturesShowcase }))
);

export const LazyTrustSection = lazy(() => 
  import('./TrustSection').then(module => ({ default: module.TrustSection }))
);

export const LazyTestimonials = lazy(() => 
  import('./Testimonials').then(module => ({ default: module.Testimonials }))
);

export const LazyCTASection = lazy(() => 
  import('./CTASection').then(module => ({ default: module.CTASection }))
);

export const LazyLandingFooter = lazy(() => 
  import('./LandingFooter').then(module => ({ default: module.LandingFooter }))
);
