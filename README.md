![tailwind-nextjs-banner](/public/images/brand/dashboard_repo.png)

# dashboard.news47ell.com

[![GitHub Repo stars](https://img.shields.io/github/stars/Music47ell/Dashboard?style=social)](https://GitHub.com/Music47ell/Dashboard/stargazers/)
[![GitHub forks](https://img.shields.io/github/forks/Music47ell/Dashboard?style=social)](https://GitHub.com/Music47ell/Dashboard/network/)

# My Personal Dashboard

This is a personal dashboard that displays statistics from my Last.fm and Trakt accounts, as well as a few more statistics from my blog.

## Stack

- `Next.js` - A React framework for building server-side rendered and static web applications.
- `TypeScript` - A typed superset of JavaScript that compiles to plain JavaScript.
- `Tailwind CSS` - A utility-first CSS framework for rapidly building custom user interfaces.
- `Drizzle ORM` - A lightweight and simple ORM for Node.js that supports multiple databases.
- `Turso` - A Fast, Easy and Cheap Database.
- `Vercel` - A cloud platform for static sites and serverless functions.

## Features

- Displays my blog statistics, including the number of posts, views.
- Display coding statistics from my CodeStats.
- Displays my top albums and recent tracks from Last.fm.
- Displays my watched movies and TV shows from Trakt.

## Getting Started

1. Clone the repository: `git clone https://github.com/Music47ell/Dashboard.git`
2. Install dependencies: `npm install`
3. Create a `.env.local` file and add the following variables:

```bash
DATABASE_AUTH_TOKEN=""
DATABASE_URL=""
EMAILOCTOPUS_API_KEY=""
EMAILOCTOPUS_LIST_ID=""
LASTFM_API_KEY=""
NEXT_PUBLIC_UMAMI_TRACKER_SCRIPT_URL=""
NEXT_PUBLIC_UMAMI_WEBSITE_ID=""
TMDB_API_TOKEN=""
TRAKT_CLIENT_ID=""
```

4. Start the development server: `npm run dev`
5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## Contributing

Contributions are welcome! Please open an issue or pull request if you have any suggestions or bug fixes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
