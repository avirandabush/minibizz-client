export const LeadSource = {
  FRIEND: 'FRIEND',
  SOCIAL_MEDIA: 'SOCIAL_MEDIA',
  ONLINE_AD: 'ONLINE_AD',
  WALK_IN: 'WALK_IN',
  OTHER: 'OTHER',
} as const;
export type LeadSource = (typeof LeadSource)[keyof typeof LeadSource];

export type CustomerPersonal = {
  name: string;
  birthDate?: string;
  notes?: string;
  medicalNotes?: string;
};

export type CustomerContact = {
  phone?: string;
  alternatePhone?: string;
  email?: string;
  address?: string;
};

export type CustomerStats = {
  lastVisit?: string;
  totalVisits: number;
  totalSpent: number;
  averageTicket: number;
};

export type Customer = {
  id: string;
  userId: string;

  personal: CustomerPersonal;
  contact: CustomerContact;
  stats: CustomerStats;

  leadSource: LeadSource;
  isActive: boolean;

  createdAt: string;
  updatedAt: string;
};
