import { getVehicles, getVehicleById } from '@/lib/vehicleUtils';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = await Promise.resolve(params.id);
  const vehicle = getVehicleById(id);

  if (!vehicle) {
    return Response.json({ error: 'Veículo não encontrado' }, { status: 404 });
  }

  return Response.json(vehicle);
}
