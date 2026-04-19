# Portfolio Website - Next.js Version

A modern, black and white portfolio website featuring an interactive 3D Earth globe animation built with Next.js 16, TypeScript, and Tailwind CSS.

## Features

- **3D Rotating Earth Globe**: Accurate continent shapes using real GeoJSON data from Natural Earth
- **Toronto Location Marker**: Red marker highlighting Toronto, Ontario, Canada
- **Smooth Animations**: Characters transition from globe formation to centered text
- **Mobile-First Design**: Optimized for mobile with responsive desktop support
- **Company Name Rotation**: Animated typing effect showing work experience
- **Scrollable Portfolio**: Complete sections for About, Experience, Skills, Projects, and Contact

## Tech Stack

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Canvas API** - 3D globe rendering
- **GeoJSON** - Real geographic data for accurate continents

## Getting Started

### Prerequisites

- Node.js 20.9.0 or higher
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

## Project Structure

```
portfolio-next/
├── app/
│   ├── components/
│   │   └── EarthGlobe.tsx    # 3D globe animation component
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout with fonts
│   └── page.tsx               # Main portfolio page
├── public/                    # Static assets
└── package.json
```

## Customization

### Update Personal Information

Edit `app/page.tsx` to update:
- About section
- Work experience
- Skills
- Projects
- Contact links

### Change Location Marker

Edit `app/components/EarthGlobe.tsx`:

```typescript
const TORONTO_LAT = 43.6532;  // Your latitude
const TORONTO_LON = -79.3832; // Your longitude
```

### Adjust Animation

Modify these constants in `EarthGlobe.tsx`:
- `PHRASE` - Opening text
- `COMPANIES` - Company names to rotate
- `rotationSpeed` - Globe rotation speed
- Detection radius for location marker

## Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Other Platforms

Build the static export:

```bash
npm run build
```

Deploy the `.next` folder to your hosting provider.

## License

MIT License - feel free to use this for your own portfolio!

## Credits

- Geographic data from [Natural Earth](https://www.naturalearthdata.com/)
- Font: JetBrains Mono
- Inspired by modern Japanese web design aesthetics
