# Хусамуддин ас-Сығанақи Islamic Institute Website

Production React/Vite website for the Husamuddin as-Syganaqi Islamic Institute. The site is multilingual (`kz`, `ru`, `en`, `ar`), responsive, Firebase-ready, and built around the official institute structure from the presentation.

## Stack

- React 18 + Vite
- Tailwind CSS
- i18next / react-i18next
- Framer Motion
- Firebase Auth, Firestore, Storage, Analytics

## Local Development

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

## Environment

Create `.env` locally. Do not commit it.

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
VITE_SITE_URL=https://hsyganaki.kz
VITE_AI_ASSISTANT_ENDPOINT=
```

`VITE_AI_ASSISTANT_ENDPOINT` is optional. If configured, it must be a secure backend endpoint. Do not call OpenAI or any private AI key directly from the browser.

## Firebase Security

Deploy the included rules before public launch:

```bash
firebase deploy --only firestore:rules,storage
```

Admin access is role-based:

- Preferred: Firebase custom claim `admin: true` or `role: "admin"`.
- Supported fallback: Firestore document `adminRoles/{uid}` with `{ "role": "admin" }`.

Public users can only create sanitized `applications` and `inquiries`. Content, news, programs, gallery, assistant FAQ, uploads, and admin reads require admin access.

## AI Assistant

The floating assistant is institute-scoped. It refuses unrelated questions and answers from:

- institute profile and mission
- admission steps and document requirements
- programs and books
- faculty data
- partners and scientific activity
- contacts, gallery, events, graduate outcomes
- optional Firestore `assistantFaq`
- optional secure backend endpoint

## SEO

The app includes:

- route-aware meta titles and descriptions
- OpenGraph and Twitter metadata
- canonical links
- favicon and Apple touch icon
- `robots.txt`
- `sitemap.xml`

If the production domain changes, update `VITE_SITE_URL`, `public/robots.txt`, and `public/sitemap.xml`.

`firebase.json` includes SPA rewrites, long-lived static asset caching, and browser security headers. If `VITE_AI_ASSISTANT_ENDPOINT` is hosted on another domain, add that domain to the `connect-src` directive before deploying hosting.

## Content Source

Core public data lives in:

```text
src/data/instituteContent.js
```

Translations live in:

```text
src/translations/
```

Real institute photos are served from:

```text
public/institute/
```

## Deployment Checklist

1. Set production `.env` variables.
2. Confirm Firebase project and Storage bucket.
3. Set admin custom claims for real administrators.
4. Deploy Firestore and Storage rules.
5. Build with `npm run build`.
6. Deploy hosting with `firebase deploy --only hosting`.
7. Verify `/`, `/programs`, `/teachers`, `/partners`, `/admission`, `/news`, `/gallery`, `/contacts` on desktop and mobile.
8. Submit `https://hsyganaki.kz/sitemap.xml` to search engines.
