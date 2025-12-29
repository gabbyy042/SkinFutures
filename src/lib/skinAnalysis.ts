export type LifestyleFactors = {
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

export function analyzeSkinBaseline(lifestyle: LifestyleFactors): {
  metrics: SkinMetrics;
  trend: TrendType;
  score: number;
} {
  let score = 60;

  // Sun exposure impact
  if (lifestyle.sunExposure === 'low') score += 10;
  if (lifestyle.sunExposure === 'high') score -= 15;

  // Sleep quality impact
  if (lifestyle.sleepQuality === 'good') score += 12;
  if (lifestyle.sleepQuality === 'poor') score -= 12;

  // Stress level impact
  if (lifestyle.stressLevel === 'low') score += 8;
  if (lifestyle.stressLevel === 'high') score -= 10;

  // Skincare consistency impact
  if (lifestyle.skincareConsistency === 'daily') score += 15;
  if (lifestyle.skincareConsistency === 'rarely') score -= 15;

  // Normalize score
  score = Math.max(0, Math.min(100, score));

  // Calculate metrics with some variation
  const metrics: SkinMetrics = {
    texture: score + (Math.random() * 10 - 5),
    tone: score + (Math.random() * 10 - 5),
    clarity: score + (Math.random() * 10 - 5),
    hydration: score + (Math.random() * 10 - 5),
  };

  // Determine trend
  let trend: TrendType = 'stable';
  if (score >= 75) trend = 'improving';
  if (score < 50) trend = 'at-risk';

  return { metrics, trend, score };
}

export function predictFutureSkin(
  currentScore: number,
  lifestyle: LifestyleFactors,
  years: number,
  improvementPath: boolean = false
): number {
  let futureScore = currentScore;

  if (improvementPath) {
    // Optimistic path: good habits
    futureScore += years * 2;
    futureScore = Math.min(95, futureScore);
  } else {
    // Current path: maintain habits
    const negativeFactors = 
      (lifestyle.sunExposure === 'high' ? 1 : 0) +
      (lifestyle.sleepQuality === 'poor' ? 1 : 0) +
      (lifestyle.stressLevel === 'high' ? 1 : 0) +
      (lifestyle.skincareConsistency === 'rarely' ? 1 : 0);

    if (negativeFactors >= 2) {
      futureScore -= years * 3;
    } else if (negativeFactors === 1) {
      futureScore -= years * 1.5;
    }

    futureScore = Math.max(20, futureScore);
  }

  return futureScore;
}

export function calculateGlowScore(
  consistency: number,
  habitStreak: number,
  trendDirection: TrendType
): number {
  let glowScore = consistency * 0.6;

  // Streak bonus
  glowScore += Math.min(habitStreak * 0.5, 20);

  // Trend bonus
  if (trendDirection === 'improving') glowScore += 15;
  if (trendDirection === 'at-risk') glowScore -= 10;

  return Math.max(0, Math.min(100, Math.round(glowScore)));
}