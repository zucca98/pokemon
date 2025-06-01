import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Helper function to merge Tailwind CSS classes
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}