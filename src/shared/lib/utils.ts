import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function reportError(error: unknown) {
  let message;
  if (error instanceof Error) message = error.message;
  else message = String(error);

  console.error(message);
  return message;
}

export function updateUrlParams(
  url: string,
  params: Record<string, unknown | null> | null
) {
  if (!params) return url;

  const urlObj = new URL(url);
  Object.keys(params).forEach((key) => {
    const value = params[key];
    if (value && typeof value === 'string') urlObj.searchParams.set(key, value);
  });
  return urlObj.toString();
}

export function generateRandomString(length: number) {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function getFileExtension(fileName: string) {
  return fileName
    .slice(((fileName.lastIndexOf('.') - 1) >>> 0) + 2)
    .toLowerCase();
}

export const isValidUrl = (url) => {
  const urlPattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-zA-Z0-9\\-]+\\.)+[a-zA-Z]{2,})|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?' + // port
      '(\\/[-a-zA-Z0-9%_.~+&:]*)*' + // path
      '(\\?[;&a-zA-Z0-9%_.~+=-]*)?' + // query string
      '(\\#[-a-zA-Z0-9_]*)?$',
    'i'
  );
  return !!urlPattern.test(url);
};
