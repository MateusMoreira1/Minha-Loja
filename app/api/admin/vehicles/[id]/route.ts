import { updateVehicle } from '@/lib/vehicleUtils';

const ADMIN_PASSWORD = 'mateus2025'; // Mude isso em produção!

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const password = request.headers.get('x-admin-password');

  if (password !== ADMIN_PASSWORD) {
    return Response.json({ error: 'Não autorizado' }, { status: 401 });
  }

  const id = await Promise.resolve(params.id);
  const body = await request.json();
  const updated = updateVehicle(id, body);

  if (!updated) {
    return Response.json({ error: 'Veículo não encontrado' }, { status: 404 });
  }

  return Response.json(updated);
}
