import { testimonials } from '@/data/content';

export async function GET() {
  return Response.json({ testimonials });
}
