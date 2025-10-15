import { portfolio } from '@/data/content';

export async function GET() {
  return Response.json({ portfolio });
}
