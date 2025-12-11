# Metriq - Modern Unit Converter

![Metriq Banner](https://img.shields.io/badge/Metriq-Unit_Converter-blue?style=for-the-badge&logo=react)

**Metriq** is a professional, high-performance unit conversion application built with modern web technologies. It offers a seamless user experience with real-time currency rates, instant search, and a beautiful responsive design.

## 🚀 Features

- **⚡ Comprehensive Conversion:** Support for 12+ categories including Length, Weight, Temperature, Area, Data, and Cooking.
- **💱 Real-Time Currency:** Live exchange rates with smart caching using **TanStack Query** to minimize API calls.
- **🔍 Instant Search:** Fuzzy search capability powered by **Fuse.js** to find converters instantly.
- **🎨 Modern UI/UX:** Fully responsive design with **Tailwind CSS**, featuring smooth transitions and a premium feel.
- **🌗 Dark Mode:** Built-in theme switching (Dark/Light) that persists user preference.
- **📝 Formula Display:** Shows the actual mathematical formula used for each conversion.
- **📚 Reference Tables:** Quick lookup tables for common values in every category.
- **⏱️ Recent History:** Automatically saves your recent conversions for quick access.
- **🏎️ Performance:** Optimized with lazy loading, memoization, and efficient re-rendering strategies.

## 🛠️ Tech Stack

- **Core:** [React 19](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Routing:** [React Router v7](https://reactrouter.com/)
- **State/Caching:** [TanStack Query](https://tanstack.com/query/latest)
- **Search:** [Fuse.js](https://www.fusejs.io/)
- **Icons:** [React Icons](https://react-icons.github.io/react-icons/)
- **SEO:** [React Helmet Async](https://github.com/staylor/react-helmet-async)

## 📦 Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Souma061/Unit-Convertor.git
    cd unit-convertor
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Run the development server:**

    ```bash
    npm run dev
    ```

4.  **Build for production:**
    ```bash
    npm run build
    ```

## 📂 Project Structure

```
src/
├── components/   # Reusable UI components (ConverterUI, etc.)
├── context/      # Theme and Global Context providers
├── data/         # Unit definitions and static data
├── hooks/        # Custom React hooks (useConverter, useCurrencyRates)
├── pages/        # Route pages (Home, ConverterDetail)
├── utils/        # Helper functions and conversion engines
└── ...
```

## 👨‍💻 Author

**Soumabrata Ghosh**

- GitHub: [@Souma061](https://github.com/Souma061)
- Portfolio: [souma061.github.io](https://souma061.github.io/)

---

Made with ❤️ by Soumabrata Ghosh
