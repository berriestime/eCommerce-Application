# Lava Lamps

Welcome to the repository for Lava Lamps, a cutting-edge e-commerce platform dedicated to providing a diverse range of high-quality lamps. Our application is designed to deliver an exceptional shopping experience, allowing users to explore, select, and purchase their favorite lamps with ease.

## Purpose

Lava Lamps aims to illuminate the lives of our customers by offering a selection of lamps that cater to various tastes and preferences. We strive to create a user-friendly platform that simplifies the process of finding and purchasing the perfect lamp for any setting, be it home or office.

## Technology Stack

Our application leverages a modern technology stack to ensure a seamless and efficient user experience:

- **Frontend**: React, React Router
- **State Management**: Redux, Redux Toolkit, RTK Query, React Hook Forms, Zod
- **UI Components**: UI-kit Mantine
- **Development Tools**: Vite, TypeScript, ESLint, Prettier
- **Testing**: Vitest
- **CI/CD**: Husky, Deploy on Netlify

## Development Sprints

### Sprint 1: Project Setup

- Initialize the project repository.
- Establish project management with a task board.
- Integrate with CommerceTools for project and API client creation.
- Configure the development environment with Vite, TypeScript, ESLint, Prettier, Husky, and Vitest.

### Sprint 2: Authentication and Navigation

- Implement login and registration pages.
- Perform input validation with React Hook Forms + Zod.
- Integrate with an authentication service.
- Manage user authentication state and token persistence.
- Provide navigational buttons and implement routing with React Router.

### Sprint 3: Catalog and User Profile

- Create Catalog Product and Detailed Product pages using commercetools API.
- Implement filtering, sorting, searching, and interactive product cards.
- Design Detailed Product page with image slider, modal window for images, breadcrumb navigation, and product option selectors.
- Develop User Profile page with personal information display and edit mode for updating details.

### Sprint 4: Enhancements and Basket Functionality

- Enhance Detailed Product Page with add/remove from cart and quantity controls.
- Build Basket page with item list, quantity adjustments, item removal, subtotal and total price display, and checkout navigation.
- Improve Catalog page with interactive product cards and cart integration.
- Utilize performance optimization techniques such as lazy loading, pagination, or infinite scroll with commercetools API.

## Getting Started

To get started with the development:

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Run the development server using `npm start`.

# Scripts

This project includes a number of npm scripts that can be used to facilitate the development process. Below is a brief description of each:

- `build`: Compiles the TypeScript codebase using the TypeScript Compiler (tsc) and then builds the production version of the application with Vite.

- `ci:format`: Checks if the files in the project adhere to the formatting standards set by Prettier without writing any changes.

- `dev`: Starts the Vite development server, allowing for hot module replacement and a rich development experience.

- `format`: Formats the code in the project according to the rules specified by Prettier, rewriting all files in place.

- `lint:fix`: Runs ESLint on the `src` directory, automatically fixing any linting errors that can be resolved without human intervention, and outputs the results with color in the terminal.

- `lint`: Executes ESLint on the `src` directory to check for linting issues without automatically fixing them.

- `prepare`: Sets up Husky, which can be used to configure Git hooks to run tasks like linting before a commit.

- `preview`: Serves the production build locally using Vite's built-in static server for previewing before deployment.

- `typecheck`: Uses the TypeScript Compiler to perform type checking across the codebase without emitting JavaScript files.

- `test`: Runs the test suite using Vitest, a Vite-native test framework.

To run any of these scripts, you can use `npm run` followed by the script name. For example, to start the development server, you would run:

```
bash
npm install
npm run dev
```

## Project Team

The following contributors have worked on this project:

- **Nadya** - Developer | Designer - [GitHub](https://github.com/NadyaGus)
- **Anna** - Developer | Designer - [GitHub](https://github.com/Naya252)
- **Lena** - Developer | Project Manager - [GitHub](https://github.com/berriestime)

Enjoy lighting up your world with Lava Lamps!
