import { useState, useCallback } from 'react';
import { validateImageFile } from '@/lib/validation';

interface ProcessedImage {
  url: string;
  file: File;
  width: number;
  height: number;
}

export function useImageProcessor() {
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processImage = useCallback(async (file: File): Promise<ProcessedImage | null> => {
    setProcessing(true);
    setError(null);

    try {
      // Validate file
      const validation = validateImageFile(file);
      if (!validation.valid) {
        throw new Error(validation.error);
      }

      // Load and validate image dimensions
      const image = await loadImage(file);

      if (image.width < 400 || image.height < 400) {
        throw new Error('Image must be at least 400x400 pixels');
      }

      if (image.width > 4096 || image.height > 4096) {
        // Resize large images
        const resized = await resizeImage(image, 2048, 2048);
        const blob = await canvasToBlob(resized);
        const resizedFile = new File([blob], file.name, { type: file.type });

        return {
          url: URL.createObjectURL(resizedFile),
          file: resizedFile,
          width: resized.width,
          height: resized.height,
        };
      }

      return {
        url: URL.createObjectURL(file),
        file,
        width: image.width,
        height: image.height,
      };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to process image';
      setError(message);
      return null;
    } finally {
      setProcessing(false);
    }
  }, []);

  return { processImage, processing, error };
}

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = URL.createObjectURL(file);
  });
}

function resizeImage(
  img: HTMLImageElement,
  maxWidth: number,
  maxHeight: number
): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  let { width, height } = img;

  if (width > maxWidth || height > maxHeight) {
    const ratio = Math.min(maxWidth / width, maxHeight / height);
    width *= ratio;
    height *= ratio;
  }

  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Failed to get canvas context');

  ctx.drawImage(img, 0, 0, width, height);
  return canvas;
}

function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error('Failed to convert canvas to blob'));
      },
      'image/jpeg',
      0.9
    );
  });
}