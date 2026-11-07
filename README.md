# Vishwa's portfolio

The portfolio now runs as a React app. Its terminal look and commands are preserved, with project and certification content kept in small data modules.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000/`. The app uses Vite through the Express server, so the Spotify and lyrics API routes keep working on the same origin. Open the local URL rather than the HTML file directly.

To build and serve the production version:

```bash
npm run build
npm run preview
```

`npm start` builds first, then serves the production version.

## Add content

- Add a project object to [`src/data/projects.js`](src/data/projects.js). Set its `name` (URL and terminal slug), `topic`, `date`, `stack`, and Markdown `content`. It will appear in `projects`, `ls projects/`, the relevant topic, and the resume automatically.
- Add a certificate to [`src/data/certifications.js`](src/data/certifications.js). It will appear in `certifications`, `certifications.md`, and the resume automatically.
- Edit profile, experience, skills, and topic labels in [`src/data/profile.js`](src/data/profile.js).

## Add a terminal feature

Add an entry to [`src/features/commands.js`](src/features/commands.js). Each entry has a command `name`, `synopsis`, help text, and a `run` function. The engine registers it for command execution, help, manual pages, and tab completion. The `run` function receives `cat`, `ls`, a safe text `write` function, current `state`, `projects`, and `certifications`; it may return a promise for async work.

The React shell is in `src/components/TerminalShell.jsx`, the application entry is `src/App.jsx`, and the existing terminal behavior is isolated in `src/terminal/engine.js`. The original single-file version is retained at `legacy/portfolio-original.html` for reference. The API remains in `server.cjs`.

## Project visual explanations

Open any project with `cat projects/<project-name>` to see its problem, idea, and an interactive example of its input, process, and result. Each explanation has a component in `src/project-stories/`. `src/project-stories/ProjectVisual.jsx` maps project slugs to those components. Add a component and mapping when adding a project. The examples use illustrative data and do not call the projects' live backends.
