export const TreatmentStatus = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
} as const;
export type TreatmentStatus = (typeof TreatmentStatus)[keyof typeof TreatmentStatus];

export const TreatmentColor = {
  BLUE: 'BLUE',
  GREEN: 'GREEN',
  ORANGE: 'ORANGE',
  PURPLE: 'PURPLE',
  RED: 'RED',
  YELLOW: 'YELLOW',
} as const;
export type TreatmentColor = (typeof TreatmentColor)[keyof typeof TreatmentColor];

export type Treatment = {
  id: string;
  userId: string;

  name: string;
  status: TreatmentStatus;
  price: number;
  durationMinutes: number;
  color: TreatmentColor;
  description: string;

  createdAt: string;
  updatedAt: string;
};
