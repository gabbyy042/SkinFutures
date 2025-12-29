// Rule-based image transformation helpers
// These create visual simulations, NOT real predictions

export type ImageFilter = {
  brightness: number;
  contrast: number;
  saturation: number;
  blur: number;
  warmth: number;
};

export function getCurrentPathFilter(years: number): ImageFilter {
  // Simulate aging/neglect path
  return {
    brightness: Math.max(50, 100 - years * 5),
    contrast: Math.max(80, 100 - years * 2),
    saturation: Math.max(70, 100 - years * 3),
    blur: Math.min(5, years * 0.3),
    warmth: Math.min(120, 100 + years * 2),
  };
}

export function getImprovementPathFilter(years: number): ImageFilter {
  // Simulate improvement path
  return {
    brightness: Math.min(110, 100 + years * 1),
    contrast: Math.min(110, 100 + years * 1),
    saturation: Math.min(110, 100 + years * 1),
    blur: 0,
    warmth: 100,
  };
}

export function applyFilterToCanvas(
  canvas: HTMLCanvasElement,
  filter: ImageFilter
): void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Apply CSS filters
  ctx.filter = `
    brightness(${filter.brightness}%)
    contrast(${filter.contrast}%)
    saturate(${filter.saturation}%)
    blur(${filter.blur}px)
    sepia(${filter.warmth - 100}%)
  `;
}

export function generateSimulationImage(
  originalImage: HTMLImageElement,
  filter: ImageFilter
): string {
  const canvas = document.createElement('canvas');
  canvas.width = originalImage.width;
  canvas.height = originalImage.height;

  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  ctx.filter = `
    brightness(${filter.brightness}%)
    contrast(${filter.contrast}%)
    saturate(${filter.saturation}%)
    blur(${filter.blur}px)
  `;

  ctx.drawImage(originalImage, 0, 0);

  return canvas.toDataURL('image/png');
}