// Input validation and sanitization
export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export function sanitizeInput(input: string): string {
  if (typeof input !== 'string') {
    throw new ValidationError('Input must be a string');
  }

  // Remove potential XSS vectors
  return input
    .replace(/[<>"']/g, '')
    .trim()
    .slice(0, 1000); // Max length
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validateImageFile(file: File): { valid: boolean; error?: string } {
  // Check file type
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'Only JPEG, PNG, and WebP images are allowed' };
  }

  // Check file size (max 10MB)
  const maxSize = 10 * 1024 * 1024;
  if (file.size > maxSize) {
    return { valid: false, error: 'Image must be less than 10MB' };
  }

  // Check dimensions (will be done after loading)
  return { valid: true };
}

export function validateLifestyleData(data: any): boolean {
  const validSunExposure = ['low', 'medium', 'high'];
  const validSleepQuality = ['poor', 'fair', 'good'];
  const validStressLevel = ['low', 'medium', 'high'];
  const validConsistency = ['rarely', 'sometimes', 'daily'];

  return (
    validSunExposure.includes(data.sunExposure) &&
    validSleepQuality.includes(data.sleepQuality) &&
    validStressLevel.includes(data.stressLevel) &&
    validConsistency.includes(data.skincareConsistency)
  );
}

export function sanitizeUrl(url: string): string {
  try {
    const parsed = new URL(url);
    // Only allow https and http
    if (!['https:', 'http:'].includes(parsed.protocol)) {
      throw new Error('Invalid protocol');
    }
    return parsed.toString();
  } catch {
    throw new ValidationError('Invalid URL');
  }
}

export function rateLimit(key: string, maxAttempts: number = 5, windowMs: number = 60000): boolean {
  if (typeof window === 'undefined') return true;

  const now = Date.now();
  const storageKey = `rateLimit_${key}`;
  const stored = localStorage.getItem(storageKey);

  if (!stored) {
    localStorage.setItem(storageKey, JSON.stringify({ count: 1, timestamp: now }));
    return true;
  }

  const data = JSON.parse(stored);

  // Reset if window expired
  if (now - data.timestamp > windowMs) {
    localStorage.setItem(storageKey, JSON.stringify({ count: 1, timestamp: now }));
    return true;
  }

  // Increment count
  if (data.count >= maxAttempts) {
    return false;
  }

  data.count++;
  localStorage.setItem(storageKey, JSON.stringify(data));
  return true;
}