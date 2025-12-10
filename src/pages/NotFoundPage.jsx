import NotFound from "../components/common/NotFound";

export default function NotFoundPage() {
  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <NotFound message="The page you're looking for doesn't exist." />
    </div>
  );
}
