# বাজার দর (Bazar Dor)

A Bangla-language web app for checking today's market prices of everyday essentials such as rice, lentils, oil, vegetables, fish, meat, eggs and spices, all in one place.

**Live site:** https://ph-ass-07.vercel.app

## Features

1. **Daily price dashboard.** The home page groups products into *আজ দাম বেড়েছে* (prices went up today), *আজ দাম কমেছে* (prices went down today) and *সব পণ্য* (all products). Each card shows today's price and the percentage change with a ▲/▼ indicator.

2. **Live price ticker.** A scrolling ticker under the navbar shows price movements across products. It pauses when you hover over it.

3. **Category browsing with sorting.** Browse products by category (চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম-দুধ, মসলা) and sort them by price, low to high or high to low.

4. **Product detail and market comparison.** Each product page shows its lowest, highest and average price, plus a table comparing that product's prices across different markets.

5. **Authentication and user profile.** Sign up and sign in with email and password, or with Google or GitHub, powered by Better Auth with MongoDB. After login, the navbar shows a user menu, and the profile page lets you update your name or sign out.

## Tech Stack

- [Next.js 16](https://nextjs.org) (App Router, Cache Components) with React 19 and TypeScript
- [Tailwind CSS v4](https://tailwindcss.com) and [daisyUI](https://daisyui.com)
- [Better Auth](https://better-auth.com) with a MongoDB adapter
- [lucide-react](https://lucide.dev) icons and [react-hot-toast](https://react-hot-toast.com) notifications

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file in the project root:

```env
NEXT_PUBLIC_API_BASE_URL=<price data API base URL>

MONGODB_URI=<MongoDB connection string>
MONGODB_DB_NAME=bazardor

BETTER_AUTH_SECRET=<long random string>
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```

For social login, register these OAuth callback URLs with each provider:

- Google: `http://localhost:3000/api/auth/callback/google`
- GitHub: `http://localhost:3000/api/auth/callback/github`

### 3. Run the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/
│   ├── api/auth/[...all]/   # Better Auth route handler
│   ├── category/[slug]/     # Category page
│   ├── product/[slug]/      # Product detail page
│   ├── profile/             # User profile
│   ├── signin/  signup/     # Auth pages
│   └── page.tsx             # Home page
├── components/              # Navbar, Hero, ProductCard, UserMenu, ...
├── lib/                     # Auth server/client setup, sign-out hook
└── utils/                   # API helpers, Bangla number/date formatting
```

## Deployment

The app is deployed on Vercel. In production:

- Set all the variables above in the Vercel project settings, with the URLs pointing to the production domain.
- Add the production callback URLs to the Google and GitHub OAuth apps.
- Allow Vercel to reach MongoDB Atlas by adding `0.0.0.0/0` under Network Access.
