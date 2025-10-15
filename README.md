# Déluxara Digital Atelier

A luxurious single-page experience built with Next.js 14 that showcases Déluxara's services, portfolio, philosophy, and insights. The experience includes ambient animations, custom cursors, interactive testimonials, and a fully functional consultation form backed by API routes.

## Getting Started

Install dependencies and launch the development server:

```bash
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to explore the atelier.

## Available Scripts

- `npm run dev` – Start the Next.js development server.
- `npm run build` – Create a production build.
- `npm start` – Run the production build locally.
- `npm run lint` – Lint the project using Next.js defaults.

## API Routes

The application exposes JSON APIs that power the interactive sections:

- `GET /api/content/services`
- `GET /api/content/portfolio`
- `GET /api/content/process`
- `GET /api/content/testimonials`
- `GET /api/content/insights`
- `GET /api/content/stats`
- `POST /api/contact` – Submit consultation requests (validated and logged server-side).

These endpoints can be extended to integrate with real data sources or automation workflows.

## Project Structure

- `app/` – Next.js App Router pages and API routes.
- `data/content.js` – Curated content used across the application and APIs.
- `public/` – Static assets such as icons.
- `next.config.mjs` – Next.js configuration.

## Accessibility & Experience Notes

- Custom cursor interactions degrade gracefully—keyboard and touch interactions remain available.
- Animated counters and testimonials rely on the Intersection Observer API and `requestAnimationFrame` for smooth performance.
- All content requests are performed through the provided API routes to demonstrate full-stack capabilities.
