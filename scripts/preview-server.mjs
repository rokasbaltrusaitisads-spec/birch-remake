import { createServer } from "node:http";
import { promises as fs } from "node:fs";
import path from "node:path";

const PORT = Number(process.env.PORT || 4173);
const HOST = process.env.HOST || "0.0.0.0";
const rootDir = path.resolve("preview");

const MIME_TYPES = new Map([
  [".html", "text/html; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".svg", "image/svg+xml"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".txt", "text/plain; charset=utf-8"]
]);

const server = createServer(async (req, res) => {
  try {
    const url = (req.url || "/").split("?")[0];
    const relativePath = url === "/" ? "/index.html" : url;
    const filePath = path.join(rootDir, relativePath);
    const stat = await fs.stat(filePath).catch(async (error) => {
      if (error.code === "ENOENT") {
        // fall back to index for client-side routes
        return fs.stat(path.join(rootDir, "index.html"));
      }
      throw error;
    });

    let finalPath = filePath;
    if (!stat.isFile()) {
      finalPath = path.join(rootDir, "index.html");
    }

    const ext = path.extname(finalPath);
    const mime = MIME_TYPES.get(ext) || "application/octet-stream";
    const content = await fs.readFile(finalPath);
    res.writeHead(200, {
      "Content-Type": mime,
      "Content-Length": content.length,
      "Cache-Control": "no-store"
    });
    res.end(content);
  } catch (error) {
    res.writeHead(error.code === "ENOENT" ? 404 : 500, {
      "Content-Type": "text/plain; charset=utf-8"
    });
    res.end(error.code === "ENOENT" ? "Not found" : "Internal error");
  }
});

server.listen(PORT, HOST, () => {
  const resolvedHost = HOST === "0.0.0.0" ? "localhost" : HOST;
  const url = `http://${resolvedHost}:${PORT}`;
  console.log(`Birch static preview available at ${url}`);
  console.log("Press Ctrl+C to stop the preview server.");
});
