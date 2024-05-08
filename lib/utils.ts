import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]): ReturnType<typeof twMerge> {
  return twMerge(clsx(inputs))
}

export function toUpperFirst(str: string): string {
  return str[0].toUpperCase() + str.slice(1)
}

export function pick<T>(collection: T[]): T {
  const length = collection.length
  const index = Math.floor(Math.random() * length)

  return collection[index]
}
