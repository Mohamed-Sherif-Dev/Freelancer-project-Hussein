export default function ProductSkeleton() {
  return (
    <div className="bg-white rounded-2xl border p-4 animate-pulse">
      <div className="bg-gray-200 h-40 rounded-xl mb-4" />
      <div className="bg-gray-200 h-4 w-3/4 mb-2 rounded" />
      <div className="bg-gray-200 h-4 w-1/2 rounded" />
    </div>
  );
}
