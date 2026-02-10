# AGENTS Guidelines for This Repository

This repository contains a Flask application running root of this repository.  This application serves as the back end, deploying a Vite application as the frontend located in a subfolder from the root. Flask uses flask-sqlalchemy and alembic for SQL database manipulation.  The SQL database use sqlite while in development and postgres while in production. Redux is used in the frontend Vite application to manage states.  Tailwind is used in conjunction with base CSS for frontend styles.  When working on the project interactively with an agent (e.g. the Codex CLI) please follow the guidelines below so that the development experience continues to work smoothly.  


## 1. Use `npm run build` before `flask run` while in Development

* **Always use `npm run build` before running `flask run` to see the updated backend.  Because the Flask backend is deploying the Vite frontend, running `flask run` will run the Vite frontend built by `npm run build` 
* **Do _not_ run `npm run dev`**  Running the development command in the the react-vite subfolder will **only** run the frontend and not the backend.

## 2. Keep Dependencies in Sync

If you add or update dependencies remember to:

1. Update the appropriate lockfile (`package-lock.json`, `pipfile.lock`).
2. Re-start the development server so that Flask and React Vite picks up the changes.

## 3. Coding Conventions

* Do not use TypeScript (`.tsx`/`.ts`) for new components or utilities.
* Co-locate component-specific styles in the same folder as the component when
  practical.
* Use flask-sqlalchemy and alembic syntax in the backend when adding or manipulating code for SQL database
* Use Redux syntax in the frontend when making requests to the backend
* Use Tailwind class syntax in HTML elements when manipulating frontend styles

## 4. Useful Commands Recap

| Command                   | Purpose                                   |
| ------------------------- | ----------------------------------------- |
| `npm run build`           | Build updated Vite application            |
| `flask run`               | Start Flask server and Vite application.  |
| `flask db upgrade head`   | Run sqlalchemy migrations.                |
| `flask db downgrade base` | Undo sqlalchemy migrations.               |
| `flask seed all`      | Enter seed data into SQL database.            |
| `flask seed undo`    | Remove seed data from SQL database.            |

---

Following these practices ensures that the agent-assisted development workflow stays
fast and dependable.  When in doubt, restart the dev server rather than running the
production build.