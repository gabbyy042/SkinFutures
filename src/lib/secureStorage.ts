// Secure client-side storage with encryption
import CryptoJS from 'crypto-js';

const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_STORAGE_KEY || 'skinfutures-default-key-change-in-production';

export class SecureStorage {
  private static encrypt(data: string): string {
    return CryptoJS.AES.encrypt(data, ENCRYPTION_KEY).toString();
  }

  private static decrypt(encryptedData: string): string {
    const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  static setItem(key: string, value: any): void {
    try {
      const serialized = JSON.stringify(value);
      const encrypted = this.encrypt(serialized);
      localStorage.setItem(key, encrypted);
    } catch (error) {
      console.error('SecureStorage: Failed to save item', error);
      throw new Error('Failed to save data securely');
    }
  }

  static getItem<T>(key: string): T | null {
    try {
      const encrypted = localStorage.getItem(key);
      if (!encrypted) return null;

      const decrypted = this.decrypt(encrypted);
      if (!decrypted) return null;

      return JSON.parse(decrypted) as T;
    } catch (error) {
      console.error('SecureStorage: Failed to retrieve item', error);
      return null;
    }
  }

  static removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  static clear(): void {
    localStorage.clear();
  }

  static hasItem(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }
}