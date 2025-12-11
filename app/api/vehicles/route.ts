import { getVehicles } from '@/lib/vehicleUtils';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const brand = searchParams.get('brand');
  const q = searchParams.get('q');

  let vehicles = getVehicles();

  // Filter by brand
  if (brand) {
    vehicles = vehicles.filter((v: any) => v.brand.toLowerCase() === brand.toLowerCase());
  }

  // Filter by search query (title or model)
  if (q) {
    vehicles = vehicles.filter((v: any) =>
      v.title.toLowerCase().includes(q.toLowerCase()) ||
      v.model.toLowerCase().includes(q.toLowerCase())
    );
  }

  // Filter out sold vehicles
  vehicles = vehicles.filter((v: any) => v.status !== 'Vendido');

  return Response.json(vehicles);
}
