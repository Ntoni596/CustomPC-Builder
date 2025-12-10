# Custom PC Builder

An interactive 3D web application for building custom PCs. Built with React, Three.js, and React Three Fiber.

## Features

- **Interactive 3D Visualization**: Rotate, zoom, and pan around your custom PC build
- **Component Selection**: Choose from different PC components:
  - Case types (Standard, Compact)
  - Motherboards (ATX, Micro ATX)
  - More components coming soon!
- **Real-time Updates**: See your selections instantly reflected in the 3D scene
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **React 19**: Latest React features for modern UI development
- **Vite**: Fast build tool and dev server
- **Three.js**: 3D graphics library
- **React Three Fiber**: React renderer for Three.js
- **React Three Drei**: Useful helpers for React Three Fiber

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Ntoni596/CustomPC-Builder.git
cd CustomPC-Builder
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint

## Usage

1. **Rotate the View**: Click and drag on the 3D scene to rotate the camera
2. **Zoom**: Use the mouse wheel to zoom in and out
3. **Pan**: Right-click and drag (or use two fingers on trackpad) to pan
4. **Select Components**: Use the control panel on the right to select different PC components
5. **Watch Changes**: See your selections update in real-time in the 3D view

## Project Structure

```
CustomPC-Builder/
├── public/             # Static assets
├── src/
│   ├── components/     # React components
│   │   ├── PCBuilderScene.jsx  # Main 3D scene container
│   │   └── PCCase.jsx          # 3D PC case component
│   ├── App.jsx         # Main application component
│   ├── App.css         # Application styles
│   ├── main.jsx        # Application entry point
│   └── index.css       # Global styles
├── index.html          # HTML template
├── package.json        # Project dependencies
└── vite.config.js      # Vite configuration
```

## Future Enhancements

- Add more PC components (CPU, GPU, RAM, Storage)
- Component compatibility checking
- Price calculator
- Save and share builds
- Export build list
- Texture and material customization
- Animation effects for component installation

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.
