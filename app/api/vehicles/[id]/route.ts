import { getVehicles, getVehicleById } from '@/lib/vehicleUtils';

export async function GET(request: any, context: any) {
  // Context may provide `params` either as an object or as a Promise depending on environment.
  const paramsObj = context?.params && typeof context.params.then === 'function' ? await context.params : context?.params;
  const id = paramsObj?.id;
  const vehicle = getVehicleById(id);

  if (!vehicle) {
    return Response.json({ error: 'Veículo não encontrado' }, { status: 404 });
  }

  return Response.json(vehicle);
}
