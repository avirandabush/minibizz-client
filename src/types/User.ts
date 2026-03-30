export const AppLanguage = {
  HE: 'he',
  EN: 'en',
} as const;
export type AppLanguage = (typeof AppLanguage)[keyof typeof AppLanguage];

export const DealerType = {
  EXEMPT: 'EXEMPT',
  LICENSED: 'LICENSED',
  COMPANY: 'COMPANY',
} as const;
export type DealerType = (typeof DealerType)[keyof typeof DealerType];

export type ContactDetails = {
  email: string;
  phone: string;
  alternatePhone?: string;
};

export type BusinessDetails = {
  name: string;
  legalName: string;
  dealerNo: string;
  dealerType: DealerType;
  professionalField: string;
  address: string;
  website?: string;
  logoUrl?: string;
};

export type UserPreferences = {
  language: AppLanguage;
  darkMode: boolean;
};

export const UserPlan = {
  SILVER: 'SILVER',
  GOLD: 'GOLD',
  PLATINUM: 'PLATINUM',
} as const;
export type UserPlan = (typeof UserPlan)[keyof typeof UserPlan];

export const UserStatus = {
  ACTIVE: 'ACTIVE',
  TRIAL: 'TRIAL',
  SUSPENDED: 'SUSPENDED',
  CANCELLED: 'CANCELLED',
} as const;
export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];


export type User = {
  id: string;
  authId: string;

  name: string;
  contact: ContactDetails;
  business: BusinessDetails;
  preferences: UserPreferences;
  plan: UserPlan;
  status: UserStatus;

  createdAt: string;
  updatedAt: string;
  lastLogin: string;
};
