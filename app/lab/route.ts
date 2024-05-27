import { redirect } from 'next/navigation'

export function GET(): Promise<void> {
  redirect('/')
}
