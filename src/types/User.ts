export const UserPlan = {
  SILVER: 'SILVER',
  GOLD: 'GOLD',
  PLATINUM: 'PLATINUM',
} as const;
export type UserPlan = (typeof UserPlan)[keyof typeof UserPlan];

export type User = {
  id: string;

  name: string;
  businessName: string;
  email: string;
  phone: string;
  address: string;
  plan: UserPlan;

  createdAt: string;
  updatedAt: string;
};
