import { clsx } from 'clsx'
import type { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]): ReturnType<typeof twMerge> {
  return twMerge(clsx(inputs))
}

export function toUpperFirst(str: string): string {
  return str[0].toUpperCase() + str.slice(1)
}

export function pick<T>(collection: readonly T[], coefficient = 1): T {
  const { length } = collection

  const index =
    coefficient === 1
      ? Math.floor(Math.random() * length)
      : Math.floor((Math.random() * coefficient) % length)

  return collection[index]
}

export function slugify(input: string): string {
  return input
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replaceAll(/\s+/g, '-') // Replace spaces with -
    .replaceAll(/&/g, '-and-') // Replace & with 'and'
    .replaceAll(/[^\w-]+/g, '') // Remove all non-word characters except for -
    .replaceAll(/--+/g, '-') // Replace multiple - with single -
}

export function dasherize(input: string): string {
  return input
    .replaceAll(/([a-z])([A-Z])/g, '$1-$2') // e.g., 'camelCase' -> 'camel-Case'
    .replaceAll(/([A-Z])([A-Z][a-z])/g, '$1-$2') // e.g., 'HTMLParser' -> 'HTML-Parser'
    .replaceAll(/([0-9])([a-zA-Z])/g, '$1-$2') // e.g., '123abc' -> '123-abc'
    .replaceAll(/([a-zA-Z])([0-9])/g, '$1-$2') // e.g., 'abc123' -> 'abc-123'
    .replaceAll(/[^a-zA-Z0-9]+/g, '-') // Replace non-alphanumeric characters with dashes
    .replaceAll(/^-+|-+$/g, '') // Trim dashes from the start and end of the string
    .toLowerCase() // Convert the whole string to lowercase
}
