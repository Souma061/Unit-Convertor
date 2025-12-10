export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 border-t border-gray-800 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-6 text-center">
        <p className="text-gray-400 text-sm hover:text-gray-300 transition">
          © {year} Unit Converter · All conversions accurate and reliable.
        </p>
      </div>
    </footer>
  );
}
