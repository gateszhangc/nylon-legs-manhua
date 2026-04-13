# Nylon Legs Argo CD Release

GitHub repository -> branch -> image repository -> K8s manifest path -> Argo CD application:

`gateszhangc/nylon-legs-manhua` -> `main` -> `registry.144.91.77.245.sslip.io/nylon-legs-manhua` -> `deploy/k8s/overlays/prod` -> `nylon-legs-manhua`

Dokploy project:

- `n/a` (Task 4 goes through Argo CD + Kubernetes, not Dokploy)

Primary domain:

- `https://nylon-legs-manhua.lol`

Argo manifests:

- `deploy/argocd/appproject.yaml`
- `deploy/argocd/application.yaml`

Kubernetes manifests:

- `deploy/k8s/base`
- `deploy/k8s/overlays/prod`

Required GitHub secrets:

- `REGISTRY_USERNAME`
- `REGISTRY_PASSWORD`

Built-in launch defaults:

- `NEXT_PUBLIC_WEB_URL=https://nylon-legs-manhua.lol`
- `NEXT_PUBLIC_PROJECT_NAME=nylon-legs-manhua`
- `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-DR97CKPZ10`
- `NEXT_PUBLIC_CLARITY_PROJECT_ID=wazw1tamcn`
- `NEXT_PUBLIC_AUTH_DISABLED=true`

Public env source of truth:

- `.env.production` keeps the production-facing public values for `NEXT_PUBLIC_WEB_URL`, `NEXT_PUBLIC_PROJECT_NAME`, `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID`, and `NEXT_PUBLIC_CLARITY_PROJECT_ID`
- `.env.development` keeps the local URL but mirrors the project name and analytics ids
- `.env.production` and `.env.development` stay local and should not be committed to GitHub

Launch gates from `webapp-launch-analytics`:

- Cloudflare DNS is ready for `nylon-legs-manhua.lol` and `www.nylon-legs-manhua.lol`
- GitHub Actions builds and pushes `registry.144.91.77.245.sslip.io/nylon-legs-manhua:<git-sha>`
- Argo CD reaches `Healthy` + `Synced`
- Homepage renders in a browser and the homepage poster image loads
- `robots.txt`, `sitemap.xml`, canonical metadata, GSC ownership, GA4 binding, and Clarity id are aligned with `nylon-legs-manhua.lol`

Release flow:

1. Push to `main`.
2. GitHub Actions builds `Dockerfile` and pushes `registry.144.91.77.245.sslip.io/nylon-legs-manhua:<git-sha>`.
3. The workflow rewrites `deploy/k8s/overlays/prod/kustomization.yaml` `newTag` to that SHA and pushes the manifest update back to `main`.
4. Argo CD syncs `deploy/k8s/overlays/prod`.
5. The app serves `https://nylon-legs-manhua.lol` with `www` redirected to apex.

One-time Argo bootstrap:

```bash
kubectl apply -f deploy/argocd/appproject.yaml
kubectl apply -f deploy/argocd/application.yaml
```
