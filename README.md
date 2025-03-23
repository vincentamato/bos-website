# BOS Website

A modern streaming platform website built with Next.js and Sanity CMS, featuring shows, episodes, and extras content.

## Technologies

- **Frontend**: Next.js 15 with React 19
- **CMS**: Sanity
- **Styling**: Tailwind CSS v4
- **Video Player**: Mux Player
- **TypeScript**: For type-safe code

## Features

- **Show Catalog**: Browse all available shows
- **Featured Shows**: Highlighted shows on the homepage
- **Episode Listings**: View episodes for each show
- **Extras Content**: Additional content for shows
- **Credits Section**: Structured credits for cast and crew
- **Responsive Design**: Works on all device sizes
- **Video Playback**: Streaming via Mux

## Getting Started

### Prerequisites

- Node.js (latest LTS version recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd bos-website
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file with the following variables:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-sanity-project-id
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_TOKEN=your-sanity-api-token
   ```

4. Start the development server:
   ```
   npm run dev
   ```
   The site will be available at [http://localhost:3000](http://localhost:3000)

## Project Structure

- `app/`: Next.js app directory with pages and components
- `sanity/`: Sanity CMS configuration and schemas
  - `schemas/`: Content types (show, episode, extra)
  - `lib/`: Helper functions for Sanity
- `public/`: Static assets

## Content Model

### Shows
Each show contains:
- Title
- Description
- Hero Image (for show page)
- Card Image (for listings)
- Credits
- Slug
- Episodes & Extras (references)

### Episodes
Each episode contains:
- Title
- Description
- Mux Playback ID
- Thumbnail
- Episode Number
- Reference to parent show

### Extras
Additional content related to shows:
- Title
- Description
- Mux Playback ID
- Thumbnail
- Reference to parent show

## Deployment

The project can be deployed to any platform that supports Next.js applications, such as Vercel or Netlify:

```
npm run build
```

## License

[Add your license information here]
