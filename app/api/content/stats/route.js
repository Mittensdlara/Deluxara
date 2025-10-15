import { stats } from '@/data/content';

export async function GET() {
  return Response.json({ stats });
}
