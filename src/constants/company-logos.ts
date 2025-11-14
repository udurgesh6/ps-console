export interface CompanyLogo {
  id: string;
  name: string;
  logoPath: string;
  category?: string;
}

export const COMPANY_LOGOS: CompanyLogo[] = [
  {
    id: "dropbox",
    name: "Dropbox",
    logoPath: "/images/dropbox.png",
    category: "cloud-storage"
  },
  {
    id: "slack",
    name: "Slack",
    logoPath: "/images/slack.png",
    category: "communication"
  },
  {
    id: "google",
    name: "Google",
    logoPath: "/images/google.png",
    category: "tech"
  },
  {
    id: "microsoft",
    name: "Microsoft",
    logoPath: "/images/microsoft.png",
    category: "tech"
  },
  {
    id: "amazon",
    name: "Amazon",
    logoPath: "/images/amazon.png",
    category: "ecommerce"
  },
  {
    id: "apple",
    name: "Apple",
    logoPath: "/images/apple.png",
    category: "tech"
  },
  {
    id: "facebook",
    name: "Facebook",
    logoPath: "/images/facebook.png",
    category: "social"
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    logoPath: "/images/linked-in.png",
    category: "social"
  },
  {
    id: "twitter",
    name: "Twitter",
    logoPath: "/images/x.png",
    category: "social"
  },
  {
    id: "netflix",
    name: "Netflix",
    logoPath: "/images/netflix.png",
    category: "entertainment"
  }
];

export const getCompanyLogo = (id: string): CompanyLogo | undefined => {
  return COMPANY_LOGOS.find(logo => logo.id === id);
};

export const getLogosByCategory = (category: string): CompanyLogo[] => {
  return COMPANY_LOGOS.filter(logo => logo.category === category);
};
