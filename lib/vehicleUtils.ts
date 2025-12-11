import fs from 'fs';
import path from 'path';

const vehiclesPath = path.join(process.cwd(), 'lib', 'vehicles.json');

export function getVehicles() {
  const data = fs.readFileSync(vehiclesPath, 'utf-8');
  return JSON.parse(data);
}

export function getVehicleById(id: string) {
  const vehicles = getVehicles();
  return vehicles.find((v: any) => v.id === id);
}

export function saveVehicles(vehicles: any[]) {
  fs.writeFileSync(vehiclesPath, JSON.stringify(vehicles, null, 2));
}

export function updateVehicle(id: string, updates: any) {
  const vehicles = getVehicles();
  const index = vehicles.findIndex((v: any) => v.id === id);
  if (index !== -1) {
    vehicles[index] = { ...vehicles[index], ...updates };
    saveVehicles(vehicles);
    return vehicles[index];
  }
  return null;
}

export function addVehicle(vehicle: any) {
  const vehicles = getVehicles();
  vehicles.push(vehicle);
  saveVehicles(vehicles);
  return vehicle;
}
