import { insights } from '@/data/content';

export async function GET() {
  return Response.json({ insights });
}
