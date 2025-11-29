import { format, isDate } from 'date-fns';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { ClassValue } from 'clsx';

export function cn(...inputs: Array<ClassValue>) {
  return twMerge(clsx(inputs));
}

export async function sleep(ms: number, fn?: () => void): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (fn) {
        fn();
      }
      resolve();
    }, ms);
  });
}

export function truncateFileName(fileName: string, maxLength = 40) {
  if (fileName.length > maxLength) {
    return fileName.slice(0, maxLength - 10) + '...' + fileName.slice(-10);
  }
  return fileName;
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Number.parseFloat((bytes / k ** i).toFixed(2)) + ' ' + sizes[i];
}

export function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '--:--';
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return h > 0
    ? `${h}h ${m.toString().padStart(2, '0')}m ${s.toString().padStart(2, '0')}s`
    : m > 0
      ? `${m.toString().padStart(2, '0')}m ${s.toString().padStart(2, '0')}s`
      : s > 0
        ? `${s.toString().padStart(2, '0')}s`
        : '01s';
}

export function formatSpeed(bytesPerSecond: number): string {
  if (!bytesPerSecond || bytesPerSecond <= 0) return '0 B/s';

  const units = ['B/s', 'KB/s', 'MB/s', 'GB/s', 'TB/s'];
  let speed = Math.round(bytesPerSecond);
  let unitIndex = 0;

  while (speed >= 1024 && unitIndex < units.length - 1) {
    speed /= 1024;
    unitIndex++;
  }

  return `${speed.toFixed(speed < 10 ? 2 : speed < 100 ? 1 : 0)} ${units[unitIndex]}`;
}

export function parseFileSize(value: string, unit: string): number {
  const num = Number.parseFloat(value);
  switch (unit) {
    case 'GB':
      return num * 1024 * 1024 * 1024;
    case 'MB':
      return num * 1024 * 1024;
    case 'KB':
      return num * 1024;
    default:
      return num;
  }
}

export function getFileType(fileName: string, mimeType: string): string {
  const type = mimeType;
  const extension = fileName.split('.').pop()?.toLowerCase();

  if (type.startsWith('image/')) return 'IMAGE';
  if (type.startsWith('video/')) return 'VIDEO';
  if (type.startsWith('audio/')) return 'AUDIO';

  if (
    type === 'application/pdf' ||
    type === 'application/msword' ||
    type ===
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    type === 'application/vnd.ms-excel' ||
    type ===
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
    type === 'application/vnd.ms-powerpoint' ||
    type ===
      'application/vnd.openxmlformats-officedocument.presentationml.presentation' ||
    type === 'application/vnd.google-apps.document' ||
    type === 'application/vnd.google-apps.spreadsheet' ||
    type === 'application/vnd.google-apps.presentation' ||
    type === 'application/vnd.google-apps.script' ||
    type === 'application/vnd.google-apps.drawing' ||
    type === 'application/vnd.google-apps.form' ||
    type === 'application/vnd.google-apps.fusiontable' ||
    type === 'application/vnd.google-apps.site' ||
    type.startsWith('text/') ||
    type === 'application/json' ||
    [
      'doc',
      'docx',
      'xls',
      'xlsx',
      'ppt',
      'pptx',
      'txt',
      'md',
      'json',
      'html',
      'css',
      'js',
      'ts',
      'jsx',
      'tsx',
      'xml',
    ].includes(extension ?? '')
  ) {
    return 'DOCUMENT';
  }

  if (type === 'text/csv' || extension === 'csv') return 'CSV';
  if (
    type === 'application/zip' ||
    type === 'application/x-rar-compressed' ||
    type === 'application/x-7z-compressed' ||
    type === 'application/x-tar' ||
    type === 'application/gzip' ||
    ['zip', 'rar', '7z', 'tar', 'gz'].includes(extension ?? '')
  ) {
    return 'ARCHIVE';
  }

  return 'OTHERS';
}

export function formatDate(date: Date, formatString?: string): string {
  if (!isDate(date)) {
    return '';
  }

  const f = formatString ?? 'dd MMM yyyy';
  return format(date, f);
}

export function stringToSlug(str: string) {
  if (!str) {
    return '';
  }

  return str
    .toLowerCase() // Convert to lowercase
    .trim() // Remove leading/trailing whitespace
    .replace(/[^a-zA-Z0-9\s-]/g, ' ') // Remove special characters except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

export function slugToString(slug: string) {
  if (!slug) {
    return '';
  }

  return slug.replace(/-/g, ' ').trim();
}

export function slugToTitle(slug: string) {
  return slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (match) => match.toUpperCase())
    .trim();
}

export function createSlug(
  str: string,
  options: { maxLength?: number; separator?: string } = {},
) {
  const { maxLength = 100, separator = '-' } = options;

  if (!str) {
    return '';
  }

  let slug = str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, separator)
    .replace(new RegExp(`${separator}+`, 'g'), separator)
    .replace(new RegExp(`^${separator}+|${separator}+$`, 'g'), '');

  if (slug.length > maxLength) {
    slug = slug.substring(0, maxLength);
    slug = slug.replace(new RegExp(`${separator}+$`), '');
  }

  return slug;
}

type DebouncedFunction<T extends (...args: Array<any>) => any> = {
  (...args: Parameters<T>): void;
  cancel: () => void;
};

export function debounce<T extends (...args: Array<any>) => any>(
  func: T,
  wait: number,
): DebouncedFunction<T> {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const debounced = (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, wait);
  };

  debounced.cancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  return debounced;
}

export async function withRetry<T>(
  fn: () => Promise<T>,
  retries = 3,
  delay = 1000,
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (attempt < retries - 1) {
        await new Promise((res) => setTimeout(res, delay * (attempt + 1)));
      }
    }
  }

  throw lastError;
}
