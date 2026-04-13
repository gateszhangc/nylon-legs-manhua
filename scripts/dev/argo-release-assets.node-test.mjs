import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";

const projectRoot = process.cwd();

async function read(relativePath) {
  return readFile(path.join(projectRoot, relativePath), "utf8");
}

test("argo release assets stay aligned with the Nylon Legs deployment mapping", async () => {
  const workflow = await read(".github/workflows/build-and-release.yml");
  const overlay = await read("deploy/k8s/overlays/prod/kustomization.yaml");
  const deployment = await read("deploy/k8s/base/deployment.yaml");
  const configmap = await read("deploy/k8s/base/configmap.yaml");
  const application = await read("deploy/argocd/application.yaml");
  const dockerfile = await read("Dockerfile");
  const prodEnv = await read(".env.production");
  const devEnv = await read(".env.development");
  const gitignore = await read(".gitignore");

  assert.match(workflow, /IMAGE_REPOSITORY: registry\.144\.91\.77\.245\.sslip\.io\/nylon-legs-manhua/);
  assert.match(workflow, /NEXT_PUBLIC_CLARITY_PROJECT_ID: wazw1tamcn/);
  assert.match(workflow, /NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: G-DR97CKPZ10/);
  assert.match(workflow, /KUSTOMIZATION_PATH: deploy\/k8s\/overlays\/prod\/kustomization\.yaml/);
  assert.match(overlay, /newTag: bootstrap/);
  assert.match(deployment, /path: \/robots\.txt/);
  assert.match(configmap, /NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: G-DR97CKPZ10/);
  assert.match(application, /repoURL: https:\/\/github\.com\/gateszhangc\/nylon-legs-manhua\.git/);
  assert.match(application, /path: deploy\/k8s\/overlays\/prod/);
  assert.match(dockerfile, /ARG NEXT_PUBLIC_CLARITY_PROJECT_ID=wazw1tamcn/);
  assert.match(dockerfile, /COPY --from=builder --chown=nextjs:nodejs \/app\/\.next\/build\/server \.\/\.next\/build\/server/);
  assert.match(prodEnv, /NEXT_PUBLIC_WEB_URL = "https:\/\/nylon-legs-manhua\.lol"/);
  assert.match(prodEnv, /NEXT_PUBLIC_PROJECT_NAME = "nylon-legs-manhua"/);
  assert.match(prodEnv, /NEXT_PUBLIC_CLARITY_PROJECT_ID = "wazw1tamcn"/);
  assert.match(prodEnv, /NEXT_PUBLIC_GOOGLE_ANALYTICS_ID = "G-DR97CKPZ10"/);
  assert.match(prodEnv, /NEXT_PUBLIC_AUTH_DISABLED = "true"/);
  assert.match(devEnv, /NEXT_PUBLIC_WEB_URL = "http:\/\/localhost:3000"/);
  assert.match(devEnv, /NEXT_PUBLIC_PROJECT_NAME = "nylon-legs-manhua"/);
  assert.match(devEnv, /NEXT_PUBLIC_CLARITY_PROJECT_ID = "wazw1tamcn"/);
  assert.match(devEnv, /NEXT_PUBLIC_GOOGLE_ANALYTICS_ID = "G-DR97CKPZ10"/);
  assert.match(devEnv, /NEXT_PUBLIC_AUTH_DISABLED = "true"/);
  assert.match(gitignore, /^\.env\.development$/m);
  assert.match(gitignore, /^\.env\.production$/m);
});
