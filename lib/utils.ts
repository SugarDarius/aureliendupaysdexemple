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

export function slugify(input: string): string {
  return input
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w-]+/g, '') // Remove all non-word characters except for -
    .replace(/--+/g, '-') // Replace multiple - with single -
}
