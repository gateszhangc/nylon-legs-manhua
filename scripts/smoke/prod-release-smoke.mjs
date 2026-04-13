import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { access, cp, mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import { setTimeout as delay } from "node:timers/promises";
import path from "node:path";

const projectRoot = process.cwd();
const serverEntry = path.join(projectRoot, ".next/build/standalone/server.js");
const serverAssetsDir = path.join(projectRoot, ".next/build/server");
const staticAssetsDir = path.join(projectRoot, ".next/build/static");
const publicDir = path.join(projectRoot, "public");
const port = Number(process.env.SMOKE_PORT || 3100);
const baseUrl = `http://127.0.0.1:${port}`;

async function waitForReady(url, timeoutMs) {
  const startedAt = Date.now();

  while (Date.now() - startedAt < timeoutMs) {
    try {
      const response = await fetch(url, { method: "HEAD" });
      if (response.ok) {
        return;
      }
    } catch {
      // Retry until timeout.
    }

    await delay(500);
  }

  throw new Error(`Timed out waiting for ${url}`);
}

async function stopChild(child, timeoutMs = 5_000) {
  if (child.exitCode !== null) {
    return;
  }

  child.kill("SIGTERM");
  await Promise.race([
    new Promise((resolve) => child.once("exit", resolve)),
    delay(timeoutMs),
  ]);

  if (child.exitCode !== null) {
    return;
  }

  child.kill("SIGKILL");
  await Promise.race([
    new Promise((resolve) => child.once("exit", resolve)),
    delay(timeoutMs),
  ]);
}

await access(serverEntry);
await access(serverAssetsDir);
await access(staticAssetsDir);
await access(publicDir);

const runnerDir = await mkdtemp(path.join(os.tmpdir(), "nylon-legs-prod-smoke-"));
const runnerStaticDir = path.join(runnerDir, ".next/build/static");
const runnerServerDir = path.join(runnerDir, ".next/build/server");
const runnerPublicDir = path.join(runnerDir, "public");
await cp(path.join(projectRoot, ".next/build/standalone"), runnerDir, { recursive: true });
await cp(staticAssetsDir, runnerStaticDir, { recursive: true });
await cp(serverAssetsDir, runnerServerDir, { recursive: true });
await cp(publicDir, runnerPublicDir, { recursive: true });

const child = spawn("node", [path.join(runnerDir, "server.js")], {
  cwd: runnerDir,
  env: {
    ...process.env,
    PORT: String(port),
    HOSTNAME: "127.0.0.1",
    NODE_ENV: "production",
    NEXT_PUBLIC_WEB_URL: "https://nylon-legs-manhua.lol",
    NEXT_PUBLIC_PROJECT_NAME: "nylon-legs-manhua",
    NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: "G-DR97CKPZ10",
    NEXT_PUBLIC_CLARITY_PROJECT_ID: "wazw1tamcn",
    NEXT_PUBLIC_AUTH_DISABLED: "true",
  },
  stdio: "inherit",
});

try {
  await waitForReady(`${baseUrl}/robots.txt`, 60_000);

  const homepage = await fetch(`${baseUrl}/en`);
  const homepageHtml = await homepage.text();
  assert.equal(homepage.status, 200);
  assert.match(homepageHtml, /Nylon Legs/);
  assert.match(homepageHtml, /rel="canonical"[^>]+https:\/\/nylon-legs-manhua\.lol\/en"/);
  assert.match(homepageHtml, /rel="alternate"[^>]+hrefLang="zh"[^>]+https:\/\/nylon-legs-manhua\.lol\/zh/);

  const poster = await fetch(`${baseUrl}/nylon-legs/brand/poster.svg`, {
    method: "HEAD",
  });
  assert.equal(poster.status, 200);
  assert.match(poster.headers.get("content-type") || "", /image\/svg\+xml/);

  const robots = await fetch(`${baseUrl}/robots.txt`);
  const robotsText = await robots.text();
  assert.equal(robots.status, 200);
  assert.match(robotsText, /Sitemap: https:\/\/nylon-legs-manhua\.lol\/sitemap\.xml/);
} finally {
  await stopChild(child);
  await rm(runnerDir, { recursive: true, force: true });
}
