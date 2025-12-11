import fs from 'fs';
import path from 'path';

const adminConfigPath = path.join(process.cwd(), 'lib', 'admin-config.json');

export function getAdminConfig() {
  const data = fs.readFileSync(adminConfigPath, 'utf-8');
  return JSON.parse(data);
}

export function updateAdminConfig(updates: any) {
  const config = getAdminConfig();
  const updated = { ...config, ...updates };
  fs.writeFileSync(adminConfigPath, JSON.stringify(updated, null, 2));
  return updated;
}
