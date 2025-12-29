export type LifestyleData = {
  sunExposure: 'low' | 'medium' | 'high';
  sleepQuality: 'poor' | 'fair' | 'good';
  stressLevel: 'low' | 'medium' | 'high';
  skincareConsistency: 'rarely' | 'sometimes' | 'daily';
};

export type SkinMetrics = {
  texture: number;
  tone: number;
  clarity: number;
  hydration: number;
};

export type TrendType = 'improving' | 'stable' | 'at-risk';

export type UserProfile = {
  id: string;
  email?: string;
  createdAt: Date;
  imageUrl?: string;
  lifestyle?: LifestyleData;
  baseline?: {
    metrics: SkinMetrics;
    trend: TrendType;
    score: number;
    analyzedAt: Date;
  };
};

export type RoutineStep = {
  id: string;
  category: 'cleanser' | 'toner' | 'serum' | 'moisturizer' | 'sunscreen';
  timeOfDay: 'am' | 'pm';
  completed?: boolean;
};

export type HabitLog = {
  date: string;
  routineCompleted: boolean;
  steps: RoutineStep[];
};

export type WeatherAlert = {
  type: 'uv' | 'pollution' | 'humidity';
  level: 'low' | 'medium' | 'high';
  message: string;
  recommendation: string;
};