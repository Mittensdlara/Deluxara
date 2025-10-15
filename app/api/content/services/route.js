import { services } from '@/data/content';

export async function GET() {
  return Response.json({ services });
}
