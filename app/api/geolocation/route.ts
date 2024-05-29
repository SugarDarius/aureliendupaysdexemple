import { geolocation } from '@vercel/edge'

export async function GET(request: Request): Promise<Response> {
  const { latitude, longitude } = geolocation(request)

  return Response.json({ latitude, longitude })
}
