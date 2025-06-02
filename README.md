# ChotuURL - URL Shortener

A modern, minimal URL shortener built with Next.js 15, Supabase, and Tailwind CSS.

<a href="https://www.producthunt.com/products/chotuurl?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-chotuurl" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=973153&theme=dark&t=1748897005873" alt="ChotuURL - A&#0032;modern&#0044;&#0032;minimal&#0044;&#0032;open&#0045;source&#0044;&#0032;ad&#0045;free&#0032;URL&#0032;shortene | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" /></a>

## Features

- 🔗 Shorten long URLs instantly
- 📊 Click tracking
- 🎨 Beautiful, minimal UI with floating navbar and footer
- 📱 Fully responsive design
- ⚡ Fast and reliable with Supabase backend
- 🔒 Secure with Row Level Security

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **ID Generation**: nanoid
- **Language**: TypeScript

## Setup Instructions

### 1. Database Setup

1. Go to [Supabase](https://supabase.com) and create a new project
2. In the SQL Editor, run the commands from `database-schema.sql` to create the required table
3. Copy your project URL and anon key from Settings > API

### 2. Environment Variables

Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Enter a long URL in the input field
2. Click "Shorten URL"
3. Copy the generated short URL
4. Share your short URL - it will redirect to the original URL and track clicks

## Project Structure

```
src/
├── app/
│   ├── components/          # React components
│   │   ├── Navbar.tsx      # Floating navigation bar
│   │   ├── Footer.tsx      # Minimal footer with social links
│   │   └── UrlShortenerForm.tsx  # Main URL shortening form
│   ├── [shortCode]/        # Dynamic route for redirects
│   │   └── page.tsx
│   └── api/
│       └── [shortCode]/    # API route for redirects
│           └── route.ts
└── lib/
    └── supabase.ts         # Supabase client configuration
```

## License

MIT License - feel free to use this project for your own purposes.
