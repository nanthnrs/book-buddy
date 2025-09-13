# BookBuddy

## Technical information

- **Framework:** [Angular]([https://](https://angular.dev/))
- **UI Components** [daisyUI]([https://daisyui.com/])
- **Styling:** [Tailwind CSS]([https://](https://tailwindcss.com/))
- **State Management:** [NgRx]([https://](https://ngrx.io/docs))
  - [Store]([https://](https://ngrx.io/guide/store))
  - [Effects]([https://](https://ngrx.io/guide/effects))
- **Icons:** [Bootstrap Icons]([https://](https://icons.getbootstrap.com/))

## Project structure

```.
server                          # Mock Auth API (Hono)
src/
  app/
    components/                 # Shared UI components
    core/
      constants                 # Constant values 
      models                    # Data types
    layout/
      footer                    # Footer UI for mobile views
      header                    # Header UI
      main                      # Main container
      navbar                    # Navigation bar UI for desktop views
    pages/                      # Application pages
    services/                   # API Services
    state/                      # State management
  environments/
    environment.development.ts  # Development configuration
    environment.ts              # Production configuration
```

## Development server

### Frontend

To start a local development server, run:

```bash
npm start
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

### Backend (Auth API)

To start a web api for authentication

```bash
cd server
npm run dev
```

The web api will be running on `http://localhost:3000`

## Building

To build the project run:

```bash
npm run build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

```bash
npm run test
```

Generate code coverage report

```bash
npm run test -- --code-coverage
```

## Running e2e tests

Before running e2e testing you have to run frontend and backend

- [Running Frontend](#frontend)
- [Running Backend](#backend-auth-api)

To run e2e testing

```bash
npm run e2e
```
