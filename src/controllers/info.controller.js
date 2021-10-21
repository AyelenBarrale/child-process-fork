import { arg } from "../server.js";

export async function renderInfo(req, res) {
  const datos = {
    argumentos: arg._,
    plataforma: process.platform,
    node: process.version,
    memoria: process.memoryUsage(),
    path: process.execPath,
    id: process.pid,
    folder: process.cwd(),
  };
  res.status(200).json({ datos });
}
