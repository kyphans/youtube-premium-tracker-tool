import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

function parseDate(dateStr: string): Date {
  const [day, month, year] = dateStr.split("/").map(Number);
  return new Date(year, month - 1, day); // monthIndex starts from 0
}

export function calculateAvailable(endDate: string, todayArg?: Date) {
  const today = todayArg || new Date();
  const end = parseDate(endDate); // handle dd/mm/yyyy
  const timeDiff = end.getTime() - today.getTime();
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
}