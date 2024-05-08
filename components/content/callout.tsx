'use client'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

type CalloutProps = {
  icon?: React.ReactNode
  title?: string
  children: React.ReactNode
} & React.ComponentProps<typeof Alert>

export function Callout({ icon, title, children, ...props }: CalloutProps) {
  return (
    <Alert {...props}>
      {icon ? icon : null}
      {title ? (
        <AlertTitle className='font-semibold'>{title}</AlertTitle>
      ) : null}
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  )
}
