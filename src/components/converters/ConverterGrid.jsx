import ConverterCard from "./ConverterCard.jsx";

export default function ConverterGrid({ converters }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {converters.map((item) => (
        <ConverterCard key={item.id} converter={item} />
      ))}
    </div>
  );
}
