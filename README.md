# Expense Tracker Web Application

A modern expense tracking application built with Next.js that helps users manage their expenses and set spending limits by category.

## Features

- 🔐 User Authentication (Login/Register)
- 💰 Track Expenses by Category
- 🎯 Set Monthly Spending Limits
- 📊 View Expense Analytics
- 💼 Category-wise Expense Management
- 🎨 Modern and Responsive UI

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Redux Toolkit (State Management)
- RTK Query (API Integration)
- Zod (Form Validation)
- CSS Modules (Styling)

## Local Setup

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/noyonalways/expense-tracker-web.git
cd expense-tracker-web
```

2. Install dependencies:

Using npm:

```bash
npm install
```

Using yarn:

```bash
yarn install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

Update the `.env.local` file with your API URL:

```
NEXT_PUBLIC_API_URL=your_api_url_here
```

4. Start the development server:

Using npm:

```bash
npm run dev
```

Using yarn:

```bash
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build for Production

Using npm:

```bash
npm run build
npm start
```

Using yarn:

```bash
yarn build
yarn start
```

## Project Structure

```
src/
├── app/                 # Next.js app router pages
├── components/         # Reusable UI components
├── modules/           # Feature-specific modules
├── redux/            # Redux store and slices
├── services/         # API services
├── styles/           # Global styles
└── utils/            # Utility functions
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
