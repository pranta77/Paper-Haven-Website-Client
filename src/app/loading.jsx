export default function Loading() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-[#F7F4EA]">
      <span className="loading loading-spinner loading-lg text-[#285943]"></span>

      <h2 className="mt-5 text-xl font-bold text-[#285943]">
        Loading Paper Haven...
      </h2>

      <p className="mt-2 text-sm text-gray-500">
        Please wait while we prepare your books.
      </p>
    </div>
  );
}