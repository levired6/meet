# Meet — Serverless PWA (React)

Meet is a serverless Progressive Web App (PWA) built with React that displays Google Calendar events, with offline support and charts. The app is configured to use mock data in local development so anyone can run and explore it quickly.

## Quick overview

- Frontend: Vite + React (entry: `index.html` → `src/main.jsx` → `src/App.jsx`).
- Mock data: `src/mock-data.js` (used automatically on `localhost`).
- API helpers and auth flow: `src/api.js`.
- Auth backend handlers (serverless): `auth-server/handler.js` (deployable to AWS Lambda/Vercel).
- PWA: configured using `vite-plugin-pwa` in `vite.config.js`. Service worker registration is enabled for production builds only.

---

## Quick start (run locally — no Google setup required)

Requirements
- Node.js 18+ (recommended)
- npm

Steps
1. Clone the repo

   git clone https://github.com/levired6/meet.git
   cd meet

2. Install dependencies

   npm ci

3. Start the dev server (Vite)

   npm run dev

4. Open the app

   http://localhost:5173

Notes
- When running on `http://localhost` the app uses the included mock data so you won't need Google OAuth to see the UI and features.
- The service worker and PWA features are enabled in production builds only. To preview production (and test SW/PWA behavior):

  npm run build
  npm run preview

---

## Scripts
- `npm run dev` — start the dev server (Vite)
- `npm run build` — create a production build
- `npm run preview` — serve the production build locally (useful to test PWA/service worker)
- `npm test` — run tests (Jest)
- `npm run test:coverage` — run tests with coverage
- `npm run lint` — run ESLint

---

## Enabling Google Calendar (optional)

The frontend currently expects an auth backend for exchanging codes and retrieving events. The repository includes `auth-server/handler.js` (example serverless handlers) but you must deploy or run an auth server and provide Google credentials.

High level steps:
1. Create a Google OAuth Client ID (Web application) in Google Cloud Console and add your redirect URI(s).
2. Deploy the auth server (e.g., AWS Lambda, Vercel) or run an equivalent server that implements the endpoints used in `src/api.js`:
   - `/api/get-auth-url` — returns an `authUrl` to redirect the user
   - `/api/token/:code` — exchanges a code for an access token
   - `/api/get-events/:access_token` — returns calendar events
3. Set environment variables on the auth server: `CLIENT_ID`, `CLIENT_SECRET`, `CALENDAR_ID`.
4. Update endpoint URLs in `src/api.js` if you deploy the backend to a URL different from the one in the file.
5. Ensure Google redirect URIs match the deployed app URL and the auth backend configuration.

If you do not configure an auth backend, the app will fall back to cached events (if available) or the mock data on localhost.

---

## Troubleshooting

- Blank page / no events: confirm `npm run dev` is running and you opened the port printed by Vite (default: `http://localhost:5173`).
- OAuth / 401 / CORS errors: those come from the auth backend or Google — check the backend CORS headers, credentials, and redirect URIs.
- Service worker not registering in dev: that's expected — SW registration only runs when `NODE_ENV === 'production'`. Use `npm run build` + `npm run preview` to test SW.
- Tests failing: ensure dev dependencies are installed (`npm ci`) and run `npm test` locally. Puppeteer-based tests may require extra CI configuration.

---

## Where to look in the code
- App entry: `src/main.jsx`
- App component: `src/App.jsx`
- API helpers and auth flow: `src/api.js`
- Mock data: `src/mock-data.js`
- Service worker registration: `src/serviceWorkerRegistration.js`
- PWA config: `vite.config.js`
- Auth server example (lambda handlers): `auth-server/handler.js`

---

## Contact / Contributing
If you'd like to contribute or have questions, open an issue or a PR. For quick problems, include the command you ran and the exact error output so the issue is reproducible.

---

Made with ❤️ — Levired
