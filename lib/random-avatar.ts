import { pick } from '@/lib/utils'

const avatars = [
  '/medias/images/memoji-avatar-zero.webp',
  '/medias/images/memoji-avatar-one.webp',
  '/medias/images/memoji-avatar-two.webp',
  '/medias/images/memoji-avatar-three.webp',
  '/medias/images/memoji-avatar-four.webp',
  '/medias/images/memoji-avatar-five.webp',
  '/medias/images/memoji-avatar-six.webp',
  '/medias/images/memoji-avatar-seven.webp',
  '/medias/images/memoji-avatar-eight.webp',
  '/medias/images/memoji-avatar-nine.webp',
]

export function getRandomAvatar(): string {
  return pick(avatars, 10)
}
