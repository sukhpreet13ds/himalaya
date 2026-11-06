# HimalayaHikes

A responsive Next.js travel website with Tailwind CSS, Lucide icons and Motion. Includes all nine destination detail pages, package filters and search, About, Contact, galleries and destination-specific WhatsApp enquiries.

Live production website: https://himalayahikes.vercel.app (public; no login required).

Vercel project: `himalayahikes`. Use the Next.js framework preset and leave the Output Directory override empty. The deployment build command is `node scripts/ensure-assets.mjs && npm run build`. The asset helper restores missing assets from the published source and verifies SHA-256 checksums; local builds use the existing public files. `scripts/prepare-vercel.mjs` prepares the source bundle for connector-based uploads. Local Vercel project association is stored in the ignored `.vercel/project.json`.

Run `node scripts/verify-deployed.mjs` to verify the public production pages, asset checksums, desktop/mobile layout and WhatsApp links. Latest report: `artifacts/vercel-verification.json`.

## Run locally

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Build with `npm run build`; the static export is written to `out/`. Deploy on Vercel as a Next.js project with the default build command. No environment variables, database or paid services are required.

## Content and branding

- Edit the nine destinations in `lib/packages.ts`. The WhatsApp number and URL builder are in the same file.
- The supplied logo is `public/himalayahikes-logo.png`.
- Photo files are in `public/images/`, with source, author and licence details in `lib/photo-credits.json`. Credits are displayed at `/photo-credits/`.
- Fonts are self-hosted in `public/fonts/`, with the Open Font License included.
- Package prices, durations, departure dates, itineraries and inclusions were not supplied. The site asks travellers to request those details over WhatsApp. It does not present unconfirmed details as an offer.
- No business address, email or social profiles were supplied, so none are invented.

## Verification

`npm run build` includes TypeScript checks. To repeat browser verification, run `node scripts/serve.mjs` after building, then `npm run verify` in another terminal. The verifier uses installed Google Chrome in headless mode. It checks all routes at 1440, 768, 390 and 320 pixels, loaded images, overflow, package routes, WhatsApp URL content, filters, search, mobile navigation and contact message generation. Reports and screenshots go to the ignored `artifacts/` directory. The verifier does not send messages.

Photographs are served locally as high-quality WebP files, with smaller variants for cards and mobile banners. Original sources are at least 1920 pixels wide. Photography remains subject to each linked Creative Commons licence.
