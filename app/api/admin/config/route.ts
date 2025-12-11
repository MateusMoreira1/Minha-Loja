import { getAdminConfig } from '@/lib/adminConfigUtils';

export async function GET() {
  const config = getAdminConfig();
  return Response.json(config);
}

const ADMIN_PASSWORD = 'mateus2025';

export async function PUT(request: Request) {
  const password = request.headers.get('x-admin-password');

  if (password !== ADMIN_PASSWORD) {
    return Response.json({ error: 'Não autorizado' }, { status: 401 });
  }

  const body = await request.json();
  const updated = require('@/lib/adminConfigUtils').updateAdminConfig(body);

  return Response.json(updated);
}
