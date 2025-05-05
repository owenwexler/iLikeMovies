# 🎬 iLikeMovies 

A lightweight, fast, and modern movie list web app built with the **BHANO Stack**:  
**Bun + HTMX + AlpineJS + Hono**, using a local **PostgreSQL** database and **Redis** cache.  
Movie info is retrieved using the [Open Movie Database (OMDB)](https://www.omdbapi.com/) API.

---

## 🚀 Features

- ⚡️ Ultra-fast server-side with **Bun** and **Hono** using **TypeScript**
- 🎥 Add movies to your list via OMDB by title
- 🧠 OMDB responses are cached with **Redis**
- 🗃️ Movie lists are stored per-user in **PostgreSQL**
- 🧩 Interactive UI with **HTMX** and **AlpineJS**
- 🛠️ A comprehensive test suite with **Playwright**
- 🛠️ Fully open source and easy to customize

---

## 🛠️ Requirements

Before you get started, ensure you have the following installed:

- [Bun](https://bun.sh/) - preferably Bun 1.2 or above*
- [PostgreSQL](https://www.postgresql.org/) (running locally)
- [Redis](https://redis.io/) (running locally)

You must also have a valid OMDB API key, which can be retrieved here:

- [OMDB API Key](https://www.omdbapi.com/apikey.aspx)

*iLikeMovies uses Bun's built-in PostgreSQL client, available only in Bun 1.2 or above.  If you must run the project in an earlier version of Bun, Postgres.js is a drop-in replacement for the Bun PostgreSQL client that has identical APIs, but you will have to change the import in 

---

## 📦 Installation

1. **Fork and clone the repository**

```bash
git clone https://github.com/yourusername/iLikeMovies.git
cd iLikeMovies
```

To run:

```bash
bun run dev
```

2. **Install Dependencies**

```bash
bun install
```
3. **Set Up The Database**

Set up the database in your PostgreSQL terminal according to the schema located in sql/schema.sql

4. **Set Up Environment Variables**

```dotenv
NODE_ENV='development' | 'production'
OMDB_API_KEY='FILL_ME_IN'
DEV_MODE='offline' | 'online' // offline uses prefetched OMDB responses in a JSON file, online uses live OMDB responses
HOST_URL='http://localhost:4321'
POSTGRES_URL='postgres://user:pass@localhost:5432/dbname' // used by Bun 1.2 SQL package for Postgres connection
```

Running iLikeMovies in "offline" dev mode as much as possible is recommended to avoid hitting OMDB rate limits, and running tests in "offline" mode is definitely recommended for consistent responses in testing.
In "offline" mode, the "omdbOffline" module that gets prefetched OMDB data from JSON files is called instead of a live OMDB call.

5. **Run The Development Server**

```bash
bun run dev
```
6. **Run The Tests & Ensure They All Pass**

```bash
bun run test:e2e:ui
```

The tests are designed to be run in offline development mode.  Ensure the appropriate environment variables are set before running the tests

iLikeMovies was scaffolded with [Owen Wexler's BHANO Stack Starter Template](https://github.com/owenwexler/bhano-starter-template).  All evergreen info about this starter template is included below:

# bhano-starter-template

This is a somewhat opinionated starter template for the BHANO Stack (Bun, HTMX, Alpine, Hono).

More info about the above technologies can be found in their documentation.
Bun is the runtime.  Hono is the backend framework.  Hono JSX is the templating engine.  HTMX is for server-side interactivity.  Alpine is for client-side interactivity.

This starter template includes the following:

- The latest versions of HTMX and Alpine, self-hosted, in the /static/lib directory.  Self-hosting is preferred over the use of CDNs for production applications.
- Scaffolds for a home route, partials routes, and API routes in Hono
- Generic Hono JSX components for Head and Body - the Head component includes all script tags for HTMX and Alpine.
- Sample HTMX and Alpine mini-apps: a counter demonstrating the use of Alpine, and a form whereyou enter your name and click the button and the Hello message is changed to Hello, [name]! demonstrating the use of HTMX with Hono partials.
- Components for the above mini-apps in Hono JSX format
(The mini-apps are not included in this repo)
- A Typescript config
- A Nodemon config for hot reload.  If you do not have Nodemon installed globally, install Nodemon in the project before running.
- A basic Tailwind config for Tailwind use.
- A Tailwind compile script in package.json that takes static/css/input.css and compiles it to static/css/output.css.  A link tag for output.css is included in the Head component, allowing the use of Tailwind via pre-compiled utility classes in output.css.
- An example .env template including the POSTGRES_URL variable expected by Bun SQL for Postgres.

After cloning the repo, type ``bun install`` to install all dependencies.

The Bun lockfile used for this template is for Bun 1.2.  If you're on an earlier version of Bun you'll need to delete it before running bun install to create a lockb file.

To run the dev server:
bun run dev

This starts nodemon, which runs the Tailwind compile script and starts/restarts the dev server on every change.

Even with hot reload, you will have to refresh your browser to see changes.  Looking for a fix for this issue currently.
