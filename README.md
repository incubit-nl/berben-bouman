# Payload CMS + Next.js Template

A minimal, flexible template for building websites with Payload CMS and Next.js.

## Features

- **Payload CMS Integration**: Headless CMS with a customizable admin panel
- **Next.js App Router**: Modern React framework with server components
- **TypeScript**: Type-safe code throughout the project
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Dynamic Pages**: Render pages from Payload CMS content
- **API Utilities**: Helper functions for working with Payload CMS data

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- MongoDB (local or Atlas)

### Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and fill in your environment variables
4. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

- `/app`: Next.js app router pages
- `/collections`: Payload CMS collection definitions
- `/components`: React components
- `/lib`: Utility functions and helpers
- `/public`: Static assets

## Customization

### Collections

Modify or add collections in the `/collections` directory to change the content structure.

### Theme

Edit `app/globals.css` to customize CSS variables for colors, spacing, and other design elements.

### Pages

The template includes a dynamic page renderer that can display content from Payload CMS. Create pages in the Payload CMS admin panel and they will be automatically rendered.

## Deployment

### Deploying to Vercel

1. Push your code to a Git repository
2. Create a new project on Vercel and import your repository
3. Configure environment variables in the Vercel dashboard
4. Deploy!

## License

This project is licensed under the MIT License. 