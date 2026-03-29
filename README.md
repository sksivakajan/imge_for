# Meta Analyzer

A small React + Vite app to upload images, extract metadata, and analyze risk/locations.

## Features
- Upload images and view raw metadata
- Map view with location pins (Leaflet)
- Metadata cards and risk analysis
- Export tools (PDF/image) and raw viewer

## Tech Stack
- React 18
- Vite
- Leaflet, react-leaflet
- exifr for image metadata

## Quickstart
Prerequisites: Node.js 18+ and npm

Install:

```bash
npm install
```

Run (development):

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Project Structure

- `src/` — main source
  - `App.jsx` — app root
  - `main.jsx` — entry
  - `components/` — UI components (Dashboard, UploadSection, MapPanel, etc.)
  - `hooks/` — custom hooks
  - `utils/` — helper utilities

## Scripts
- `dev`: start Vite dev server
- `build`: create production build
- `preview`: preview production build

## Contributing
PRs welcome. Please open issues for bugs or feature requests.

## License
This project is provided as-is. Add a license if you plan to publish.
