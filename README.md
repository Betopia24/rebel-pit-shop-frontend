# Next.js template

This is a Next.js template with shadcn/ui.

## Adding components

To add components to your app, run the following command:

```bash
npx shadcn@latest add button
```

This will place the ui components in the `components` directory.

## Using components

To use the components in your app, import them as follows:

```tsx
import { Button } from "@/components/ui/button";
```

## Production Docker deployment

This project uses a multi-stage Docker build with Next.js standalone output.

1. Copy `.env.example` to `.env` and set `NEXT_PUBLIC_APP_URL` to your VPS IP, for example `http://203.0.113.10`.
2. Build and start the service:

```bash
docker compose up -d --build
```

3. Check the container:

```bash
docker compose ps
docker compose logs -f web
```

The app listens on `127.0.0.1:${APP_PORT:-3000}` so it can sit behind an Nginx or Caddy reverse proxy. If you want to access it directly by IP without a reverse proxy, change the Compose port mapping to `3000:3000`. IP-only HTTP access is fine for initial testing, but HTTPS should be added before collecting personal information.

To stop the deployment:

```bash
docker compose down
```
