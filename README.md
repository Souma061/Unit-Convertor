# Metriq - Modern Unit Converter

![Metriq Banner](https://img.shields.io/badge/Metriq-Unit_Converter-blue?style=for-the-badge&logo=react)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&style=for-the-badge)
![Vite](https://img.shields.io/badge/Vite-6.0-9F7AEA?style=for-the-badge)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?logo=tailwindcss&style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**Metriq** is a professional, high-performance unit conversion application built with modern web technologies. It offers a seamless user experience with real-time currency rates, instant search, developer tools, and a beautiful responsive design that works flawlessly across all devices.

## 🚀 Features

- **⚡ Comprehensive Conversion:** Support for 16+ categories including Length, Weight, Temperature, Area, Data, Cooking, Speed, Pressure, Energy, Volume, Time, and more.
- **🛠️ Developer Tools:** Dedicated converters for Number Bases (Binary/Hex/Octal), Color Formats (HEX/RGB/HSL), and Screen Units (px/rem/em).
- **⚛️ Science Suite:** Advanced physics calculators, significant figures, and fundamental constants references.
- **💱 Real-Time Currency:** Live exchange rates with intelligent caching using **TanStack Query** to minimize API calls and ensure fast response times.
- **🔍 Instant Search:** Fuzzy search capability powered by **Fuse.js** to find converters instantly from any category.
- **🎨 Modern UI/UX:** Fully responsive design with **Tailwind CSS v4**, featuring a custom **Canvas Cursor**, smooth transitions, glass morphism effects, and a premium feel.
- **❄️ Interactive Effects:** Seasonal snowfall effects and dynamic visual elements for an immersive experience.
- **🌗 Dark Mode:** Built-in theme switching (Dark/Light) with automatic system preference detection and persistent user preference storage.
- **📝 Formula Display:** Shows the actual mathematical formula used for each conversion, helping users understand the process.
- **📚 Reference Tables:** Quick lookup tables for common values in every category for easy comparison and conversion.
- **⏱️ Recent History:** Automatically saves your recent conversions with timestamps for quick access to frequently used conversions.
- **🏎️ Performance:** Optimized with code splitting, lazy loading, memoization, and efficient re-rendering strategies.
- **🔒 Privacy-First:** All conversion history stored locally in browser; no data sent to external servers.
- **♿ Accessibility:** WCAG compliant with keyboard navigation and screen reader support.

## 🛠️ Tech Stack

- **Core:** [React 19](https://react.dev/) - Modern UI library with latest features
- **Build Tool:** [Vite](https://vitejs.dev/) - Lightning-fast frontend build tool
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) - Utility-first CSS framework
- **Animations:** [Motion](https://motion.dev/) & [React Snowfall](https://github.com/cahilfoley/react-snowfall) - For smooth transitions and effects
- **Routing:** [React Router v7](https://reactrouter.com/) - Client-side routing
- **State/Caching:** [TanStack Query](https://tanstack.com/query/latest) - Powerful async state management
- **Search:** [Fuse.js](https://www.fusejs.io/) - Lightweight fuzzy-search library
- **Icons:** [React Icons](https://react-icons.github.io/react-icons/) - Popular icon library
- **SEO:** [React Helmet Async](https://github.com/staylor/react-helmet-async) - Document head management

## 📦 Installation

### Prerequisites

- Node.js 18.0 or higher
- npm or yarn package manager

### Setup Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Souma061/Unit-Convertor.git
   cd unit-convertor
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`

4. **Build for production:**

   ```bash
   npm run build
   ```

   Output files will be in the `dist/` directory

5. **Preview production build locally:**
   ```bash
   npm run preview
   ```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Deploy to Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### Docker Deployment

```bash
docker build -t metriq .
docker run -p 80:3000 metriq
```

## 📂 Project Structure

```
src/
├── assets/             # Static assets (images, icons)
├── components/         # Reusable UI components
│   ├── CanvasCursor.jsx
│   ├── Layout.jsx
│   ├── common/         # Header, Footer, Splash, etc.
│   ├── converters/     # ConverterUI, ReferenceTable, etc.
│   ├── science/        # Science tools components
│   └── search/         # SearchBar, SearchResults
├── context/            # Theme, Settings, and Global Context providers
├── data/               # Unit definitions and static data
│   ├── units/          # Individual unit category definitions (Length, Color, etc.)
│   └── converters.js   # Main converter configuration
├── hooks/              # Custom React hooks
│   ├── useConverter.js
│   ├── useCurrencyRates.js
│   ├── useCanvasCursor.js
│   └── useSearch.js
├── pages/              # Route pages (Home, ConverterDetail, etc.)
├── utils/              # Helper functions and conversion engines
│   ├── conversions/    # Core conversion logic
│   ├── formatting/     # Number formatting and precision
│   ├── api/            # API calls and caching
│   └── validation/     # Input validation
├── App.jsx             # Main app component
├── Router.jsx          # Route configuration
├── main.jsx            # Entry point
└── index.css           # Global styles and Tailwind directives
```

## 🔧 Available Scripts

| Command           | Description                       |
| ----------------- | --------------------------------- |
| `npm run dev`     | Start development server          |
| `npm run build`   | Create optimized production build |
| `npm run preview` | Preview production build locally  |
| `npm run lint`    | Check code with ESLint            |

## 🎯 Usage Examples

### Converting Units

1. Select a converter category from the home page
2. Enter a value in the "From" field
3. Select units from the dropdowns
4. View the converted result instantly
5. Click the swap button to reverse the conversion

### Using Developer & Science Tools

- **Color Converter:** Enter a HEX code (e.g., #3b82f6) to see RGB/HSL equivalents instantly.
- **Screen Converter:** Input pixels to get REM values based on base root size.
- **Science Mode:** Access physics constants and specialized calculators.

### Using Search

- Click the search icon in the header or press `Ctrl + K`
- Type any unit name, category, or keyword (e.g., "pixel", "force", "blue")
- Results appear in real-time with fuzzy matching
- Click a result to navigate to that converter

### Checking Recent Conversions

- Conversions are automatically saved to your browser
- Access them from the Recent Conversions panel
- Clear history anytime with the clear button

## 🌐 Supported Converters

- **📏 Length:** Meter, Kilometer, Mile, Yard, Foot, Inch, Centimeter, Millimeter, Nautical Mile
- **⚖️ Weight:** Kilogram, Gram, Pound, Ounce, Stone, Ton, Milligram
- **🌡️ Temperature:** Celsius, Fahrenheit, Kelvin
- **📐 Area:** Square Meter, Square Kilometer, Square Mile, Square Yard, Square Foot, Hectare, Acre
- **🧴 Volume:** Liter, Milliliter, Gallon, Quart, Pint, Cup, Fluid Ounce
- **💾 Data:** Byte, Kilobyte, Megabyte, Gigabyte, Terabyte, Petabyte
- **🍳 Cooking:** Teaspoon, Tablespoon, Cup, Fluid Ounce, Milliliter
- **🏎️ Speed:** Meter/Second, Kilometer/Hour, Mile/Hour, Knot
- **🔧 Pressure:** Pascal, Bar, PSI, Atmosphere
- **⚡ Energy:** Joule, Calorie, BTU, Kilowatt-hour
- **⏳ Time:** Second, Minute, Hour, Day, Week, Month, Year
- **📐 Angle:** Degree, Radian, Gradian
- **👨‍💻 Number Base:** Binary, Octal, Decimal, Hexadecimal
- **🎨 Color:** HEX, RGB, HSL
- **🖥️ Screen:** Pixels, REM, EM
- **⚛️ Science:** Physics Constants, Significant Figures
- **💱 Currency:** Real-time rates for 150+ currencies

## 🎨 Customization

### Changing Colors

Edit the Tailwind configuration in `tailwind.config.js` or `index.css` to customize the color scheme and CSS variables.

### Adding New Converters

1. Create a new unit definition file in `src/data/units/`
2. Add the converter to `src/data/converters.js`
3. Create conversion logic in `src/utils/conversions/`
4. Add the route in `src/Router.jsx` (if creating a custom page)

### Modifying API Sources

Currency rates are fetched from a reliable API. To use a different source:

1. Update the API URL in `src/data/constants.js`
2. Modify the parsing logic in `src/utils/api/exchangeRateApi.js`

## 🐛 Troubleshooting

**Build fails with module resolution errors:**

- Ensure all imports have proper file extensions (`.js`, `.jsx`)
- Clear `node_modules/` and reinstall: `rm -rf node_modules && npm install`

**Currency rates not loading:**

- Check internet connection
- Verify API endpoint is accessible
- Clear browser cache

**Dark mode or Effects not working:**

- Check that JavaScript is enabled
- Clear localStorage: `localStorage.clear()`
- Verify `prefers-reduced-motion` settings if animations are missing

**Search not finding converters:**

- Ensure you've typed at least 1 character
- Try exact unit names from the reference

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **React Community** for the amazing ecosystem
- **Tailwind Labs** for the incredible CSS framework
- **TanStack** for powerful state management tools
- **Vercel** for hosting and deployment platform

## 📞 Contact & Support

For support, feature requests, or bug reports:

- GitHub Issues: [Create an issue](https://github.com/Souma061/Unit-Convertor/issues)
- Email: contact@soumabrata.me
- Twitter: [@Souma061](https://twitter.com/Souma061)

## 👨‍💻 Author

**Soumabrata Ghosh**

- GitHub: [@Souma061](https://github.com/Souma061)
- Portfolio: [soumabrata.me](https://soumabrata.me)
- LinkedIn: [Soumabrata Ghosh](https://www.linkedin.com/in/soumabrata-ghosh-85862530b/)

---

⭐ If you find this project helpful, please consider giving it a star on GitHub!

Made with ❤️ by Soumabrata Ghosh
