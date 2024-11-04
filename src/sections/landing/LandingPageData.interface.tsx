export interface HeaderNavInterface {
    navLinks: { linkTitle: string; linkUrl: string }[];
  
    primaryButton?: {
      text: string;
      url: string;
    };
    secondaryButton?: {
      text: string;
      url: string;
    };
  }
  
  export interface HeroPanelInterface {
    tagline: {
      firstTagline: string;
      secondTagline: string;
      thirdTagline: string;
    };
    subTagline: string;
    secondaryButton?: {
      text: string;
      url: string;
    };
    primaryButton?: {
      text: string;
      url: string;
    };
    ratings?: number;
  }
  
  export interface AboutPanelInterface {
    panelId: string;
    title: string;
    content: string;
    image: string;
  }

  
  
  export interface ServicePanelInterface {
    panelId: string;
    title: string;
    panelItem: {
      icon: string;
      header: string;
      content: string;
    }[];
  }
  
  export interface PricingPanelInterface {
    panelId: string;
    title: string;
    subtitle: string;
    pricingPlans: {
      recommendedPlan: boolean;
      title: string;
      subtitle: string;
      price: string;
      catchphrase: string;
      options: { content: string; enabled: boolean }[];
    }[];
  }
  
  export interface StaticPanelInterface {
    title: string;
    panelItem: {
      icon: string;
      header: string;
      content: string;
    }[];
  }
  
  export interface TrustedByPanelInterface {
    title: string;
    subtitle: string;
    logos: string[];
  }
  
  export interface SubscriptionPanelInterface {
    title: string;
    content: string;
    buttonText: string;
  }
  
  export interface FooterPanelInterface {
    companyName: string;
    companyUrl: string;
    footerContent: string;
    footerLinks: { header: string; links: { title: string; link: string }[] }[];
  }
  
  export interface LandingPageDataInterface {
    partnerSiteName: string;
    partnerUrl: string;
    siteLogo: string;
    headerNav: HeaderNavInterface;
    hero: HeroPanelInterface;
    about: AboutPanelInterface;
    services?: ServicePanelInterface;
    pricing?: PricingPanelInterface;
    firstpanel?: StaticPanelInterface;
    trustedBy?: TrustedByPanelInterface;
    subscription?: SubscriptionPanelInterface;
    footer: FooterPanelInterface;
  }
  