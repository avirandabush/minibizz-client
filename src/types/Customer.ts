export const LeadSource = {
  FRIEND: 'FRIEND',
  SOCIAL_MEDIA: 'SOCIAL_MEDIA',
  ONLINE_AD: 'ONLINE_AD',
  WALK_IN: 'WALK_IN',
} as const;
export type LeadSource = (typeof LeadSource)[keyof typeof LeadSource];

export type Customer = {
  id: string;
  userId: string;

  name: string;
  birthDate: string;
  phone: string;
  email: string;
  address: string;
  notes: string;
  leadSource: LeadSource;
  isActive: boolean;

  createdAt: string;
  updatedAt: string;
};
