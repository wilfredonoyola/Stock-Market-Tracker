# Project Description

This project is a React application (TypeScript) for displaying real-time stock data using the Finnhub Stock APIs. The app includes three main components:

1.  **Left Form**: A form with a dropdown to select a stock to watch and an input field for setting a price alert.
2.  **Top Cards**: Displays the stock name, current value, and percentage change. The card color changes to red if the value is below the alert value and green if it is above.
3.  **Graph**: Plots the value of all added stocks in dollar value.

Real-time tracking is implemented using Sockets API to provide live updates on stock prices
## Next.js Project

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:
	

    npm install

    npm run dev


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying \`app/page.tsx\`. The page auto-updates as you edit the file.

## Project Overview

### Goals and Inspirations

As senior software engineers, we aim to create a robust, scalable, and maintainable application that meets high standards of quality and performance. This project is inspired by a dark theme design, providing a modern and sleek user experience.

### Features

- **Real-time Stock Data**: The application integrates real-time stock data for companies like Apple and Amazon. We use WebSocket technology to update stock prices dynamically.
- **Dark Theme Design**: The UI is inspired by dark theme design principles, ensuring a visually appealing interface.

### Technological Debts

1. **Real-time Data Testing**: Due to the nature of stock trading hours, we need to further test the real-time data integration during active market hours.
2. **Request Optimization**: We plan to optimize the number of requests made to the server to enhance performance.
3. **Responsive Design Improvements**: Additional improvements are needed to ensure the application is fully responsive on all devices.

## Continuous Integration/Continuous Deployment (CI/CD)

We use Vercel for continuous integration and deployment. Every push to the main branch triggers a new deployment, ensuring that the latest changes are always available in our production environment.

## Demo

Check out the live demo of the project here: [Live Demo](https://stock-market-tracker-olive.vercel.app)

## Project Structure

Each component in the project follows a structured pattern to maintain consistency and organization. The typical structure for a component includes:

    ComponentName/
      ├── ComponentName.tsx      // The main component file
      ├── index.ts               // Barrel file for easy imports
      ├── ComponentName.test.tsx // Test file for the component
      ├── styles.module.css      // CSS module for the component's styles


### Example

    TopBar/
      ├── TopBar.tsx
      ├── index.ts
      ├── TopBar.test.tsx
      ├── styles.module.css

### Workflow

The development workflow involved creating feature branches and opening Pull Requests (PRs) that were then merged into the main branch. This ensured an organized and systematic approach to adding features and making changes. Below is the list of PRs made for this project:

1.  **[Chore(part-1): Implement UI](https://github.com/wilfredonoyola/Stock-Market-Tracker/pull/1)**
2.  **[Chore(part-2): API integrations](https://github.com/wilfredonoyola/Stock-Market-Tracker/pull/2)**
3.  **[Chore(part-3): Real time integrations](https://github.com/wilfredonoyola/Stock-Market-Tracker/pull/3)**
4.  **[Chore(part-4): Tests and documentation](https://github.com/wilfredonoyola/Stock-Market-Tracker/pull/4)**

## Technologies Used

- **Next.js**: The React framework for production.
- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A strongly typed programming language that builds on JavaScript.
- **Jest**: A delightful JavaScript testing framework with a focus on simplicity.
- **WebSocket**: A protocol for full-duplex communication channels over a single TCP connection.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **CSS Modules**: A CSS file in which all class.
- **Vercel**: A cloud platform for static sites and Serverless Functions that fits perfectly with Next.js.
- **Finnhub API**: We connect to the Finnhub API to fetch real-time financial data.

## Environment Variables

The following environment variables are used in the project:

- `NEXT_PUBLIC_WEB_SOCKET_URL`: The URL for the WebSocket server.
- `NEXT_PUBLIC_FINNUB_API_KEY`: The API key for accessing financial data.
- `NEXT_PUBLIC_WEB_SOCKET_URL`: The URL for Finnub api.

Make sure to set these variables in your `.env` file for local development:

    NEXT_PUBLIC_WEB_SOCKET_URL=your_web_socket_url
    NEXT_PUBLIC_FINNUB_API_KEY=your_api_key
    NEXT_PUBLIC_WEB_SOCKET_URL=your_web_api_url


## Testing with Jest

This project uses Jest for unit testing. Below are the steps to run the tests and a description of the basic tests implemented.

### Installation

To install the necessary dependencies, run:


    npm install


### Running Tests

To run all tests, use the following command:

    npm test

### Basic Tests Implemented

Basic tests have been implemented to verify that the components render correctly. These tests can be found in the corresponding test files for each component (\`*.test.tsx\`).

#### Example of a Basic Test

    describe('TopBar', () => {
      it('simple test to pass', () => {
        expect(true).toBe(true);  // This test will always pass
      });
    
      // TODO: Add more tests to verify functionality and display of stock data
    });


### TODO

- Add more tests to verify the functionality and display of data in the components.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
