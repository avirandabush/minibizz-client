export const TreatmentColor = {
  BLUE: 'BLUE',
  GREEN: 'GREEN',
  ORANGE: 'ORANGE',
  PURPLE: 'PURPLE',
  RED: 'RED',
  YELLOW: 'YELLOW',
  GRAY: 'GRAY',
  PINK: 'PINK',
} as const;
export type TreatmentColor = (typeof TreatmentColor)[keyof typeof TreatmentColor];

export type TreatmentSpecs = {
  price: number;
  durationMinutes: number;
  bufferMinutes?: number;
};

export type Treatment = {
  id: string;
  userId: string;

  name: string;
  description: string;

  isFavorite?: boolean;
  isActive?: boolean;
  specs: TreatmentSpecs;
  color: TreatmentColor;

  createdAt: string;
  updatedAt: string;
};
