import { updateVehicle } from '@/lib/vehicleUtils';

const ADMIN_PASSWORD = 'mateus2025'; // Mude isso em produção!

export async function PUT(request: any, context: any) {
  // Resolve params whether it's a Promise or a plain object (Vercel/Next can vary)
  const paramsObj = context?.params && typeof context.params.then === 'function' ? await context.params : context?.params;
  const id = paramsObj?.id;

  const password = request.headers.get?.('x-admin-password') ?? request.headers['x-admin-password'];

  if (password !== ADMIN_PASSWORD) {
    return Response.json({ error: 'Não autorizado' }, { status: 401 });
  }

  const body = await request.json();
  const updated = updateVehicle(id, body);

  if (!updated) {
    return Response.json({ error: 'Veículo não encontrado' }, { status: 404 });
  }

  return Response.json(updated);
}
