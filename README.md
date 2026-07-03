# MovieVerse

A dark-themed React movie app built with Vite, TMDB API, Axios, and React Router DOM.

## Features

- Home page with trending movies
- Search movies by title
- Movie detail page
- Favorites system with localStorage persistence
- Login and registration using localStorage
- Responsive dark theme UI

## Project Structure

- `src/` — application entry and main components
- `components/` — reusable UI components
- `pages/` — route pages for Home, Login, Register, Favorites, Movie Details
- `services/` — API and auth helpers

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the project root:

```env
VITE_TMDB_API_KEY=YOUR_TMDB_API_KEY
```

3. Start the development server:

```bash
npm run dev
```

4. Open the app in your browser at the URL shown by Vite.

## TMDB API

Get a free API key from [The Movie Database](https://www.themoviedb.org/) and set it in `.env` as `VITE_TMDB_API_KEY`.

## Notes

- User authentication is simulated in localStorage and is not secure for production use.
- Favorites are saved per logged-in user in localStorage.
