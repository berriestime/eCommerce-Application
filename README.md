# Lava Lamps

Welcome to the repository for Lava Lamps, a cutting-edge e-commerce platform dedicated to providing a diverse range of high-quality lamps. Our application is designed to deliver an exceptional shopping experience, allowing users to explore, select, and purchase their favorite lamps with ease.

<div style="text-align: center;">
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://i.imgur.com/6p65CzC.png">
  <source media="(prefers-color-scheme: light)" srcset="https://i.imgur.com/4htNEce.png">
  <img alt="lava lamps logo" src="https://i.imgur.com/4htNEce.png">
</picture>
</div>

## Purpose

Lava Lamps aims to illuminate the lives of our customers by offering a selection of lamps that cater to various tastes and preferences. We strive to create a user-friendly platform that simplifies the process of finding and purchasing the perfect lamp for any setting, be it home or office.

<div style="text-align: center;">
<img src="./src/assets/2006729-uhd_3840_2160_25fps-ezgif.com-video-to-gif-converter.gif" style="max-width: 100%; height: auto;" />
</div>

## Technology Stack

Our application leverages a modern technology stack to ensure a seamless and efficient user experience:

- **Frontend**: <a href="https://reactjs.org/"><img src="https://user-images.githubusercontent.com/25181517/183897015-94a058a6-b86e-4e42-a37f-bf92061753e5.png" width="20" alt="react"></a>, React Router
- **State Management**: <a href="https://redux.js.org/"><img src="https://user-images.githubusercontent.com/25181517/187896150-cc1dcb12-d490-445c-8e4d-1275cd2388d6.png" width="20" alt="redux"></a>, Redux Toolkit
- **UI Components**: UI-kit Mantine
- **Development Tools**: <a href="https://vitejs.dev/"><img src="https://github-production-user-asset-6210df.s3.amazonaws.com/62091613/261395532-b40892ef-efb8-4b0e-a6b5-d1cfc2f3fc35.png" width="20" alt="vite"></a>, <a href="https://www.typescriptlang.org/"><img src="https://user-images.githubusercontent.com/25181517/183890598-19a0ac2d-e88a-4005-a8df-1ee36782fde1.png" width="20" alt="typescript"></a>, ESLint, Prettier
- **Testing**: <a href="https://vitest.dev/"><img src="https://github.com/tandpfun/skill-icons/blob/main/icons/Vitest-Dark.svg" width="20" alt="vitest"></a>
- **CI/CD**: Husky, Deploy on Netlify <a href="https://www.netlify.com/"><img src="https://github.com/tandpfun/skill-icons/blob/main/icons/Netlify-Dark.svg" width="20" alt="netlify"></a>
- **Design**: <a href="https://www.figma.com/"><img src="https://user-images.githubusercontent.com/25181517/189715289-df3ee512-6eca-463f-a0f4-c10d94a06b2f.png" width="20" alt="figma"></a>

## Development Sprints

### Sprint 1: Project Setup

- Initialize the project repository.
- Establish project management with a task board.
- Integrate with CommerceTools for project and API client creation.
- Configure the development environment with Vite, TypeScript, ESLint, Prettier, Husky, and Vitest.

### Sprint 2: Authentication and Navigation

- Implement login and registration pages.
- Perform input validation with React Hook Form + Zod.
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

> [!NOTE]
> To get started with the development:
>
> 1. Clone the repository.
> 2. Install dependencies using `npm install`.
> 3. Run the development server using `npm run dev`.

# Scripts

This project includes a number of npm scripts that can be used to facilitate the development process. Below is a brief description of each:

- `build`: Compiles the TypeScript codebase using the esbuild and then builds the production version of the application with Vite.

- `ci:format`: Checks if the files in the project adhere to the formatting standards set by Prettier without writing any changes.

- `dev`: Starts the Vite development server, allowing for hot module replacement and a rich development experience.

- `format`: Formats the code in the project according to the rules specified by Prettier, rewriting all files in place.

- `lint:fix`: Runs ESLint on the `src` directory, automatically fixing any linting errors that can be resolved without human intervention, and outputs the results with color in the terminal.

- `lint`: Executes ESLint on the `src` directory to check for linting issues without automatically fixing them.

- `prepare`: Sets up Husky, which can be used to configure Git hooks to run tasks like linting before a commit.

- `preview`: Serves the production build locally using Vite's built-in static server for previewing before deployment.

- `typecheck`: Uses the TypeScript Compiler to perform type checking across the codebase without emitting JavaScript files.

- `test`: Runs the test suite using Vitest, a Vite-native test framework.

- `coverage`: Generates a test coverage report using Vitest, which assesses the proportion of your codebase that is covered by your tests. This helps identify any gaps in your test suite that might need attention.

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
