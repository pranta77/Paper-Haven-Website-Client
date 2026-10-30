import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center bg-[#F7F4EA] px-4 text-center">

      {/* 404 Illustration */}
      <div className="mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-[#285943]/10 text-6xl">
        📚
      </div>

      <h1 className="text-7xl font-extrabold text-[#285943]">
        404
      </h1>

      <h2 className="mt-4 text-2xl font-bold text-[#1F2933] sm:text-3xl">
        Oops! Page Not Found
      </h2>

      <p className="mt-3 max-w-md text-gray-500">
        Looks like this page is missing from our bookshelf.
        Don&apos;t worry! Let&apos;s get you back to Paper Haven.
      </p>

      <Link
        href="/"
        className="mt-8 rounded-xl bg-[#285943] px-7 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-[#1e4432] hover:shadow-xl"
      >
        ←  Back to Home
      </Link>

    </div>
  );
}