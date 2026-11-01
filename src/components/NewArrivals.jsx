import Image from "next/image";
import Link from "next/link";

const NewArrivals = async () => {
  const res = await fetch(`http://localhost:8000/latest-books`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to load latest books");
  }

  const books = await res.json();

  return (
    <section className="bg-[#F7F4EA] py-16">
      <div className="mx-auto max-w-7xl px-4">
        {/* Section Heading */}
        <div className="mb-10 text-center">
          <p className="mb-2 font-semibold uppercase tracking-widest text-[#285943]">
            Fresh From Our Library
          </p>

          <h2 className="text-3xl font-bold text-[#1F2933] md:text-4xl">
            New Arrivals
          </h2>

          <p className="mt-3 text-gray-600">
            Explore the latest additions to our book collection.
          </p>
        </div>

        {/* Book Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {books.map((book) => (
            <div
              key={book._id}
              className="overflow-hidden rounded-xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl"
            >
              <figure className="relative h-56 bg-gray-100">
                <Image
                  src={book.image}
                  alt={book.title}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 16vw"
                  className="object-cover"
                />
              </figure>

              <div className="flex flex-col p-4">
                <h3 className="line-clamp-1 text-lg font-bold text-[#1F2933]">
                  {book.title}
                </h3>

                <p className="mt-1 text-sm text-gray-600">By {book.author}</p>

                <span className="mt-3 w-fit rounded-full bg-[#285943]/10 px-3 py-1 text-xs font-semibold text-[#285943]">
                  {book.category}
                </span>

                <Link
                  href={`/all-books/${book._id}`}
                  className="btn mt-4 border-none bg-[#285943] text-white hover:bg-[#1F4232]"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* See All Books */}
        <div className="mt-10 text-center">
          <Link
            href="/all-books"
            className="btn border-2 border-[#285943] bg-transparent px-8 text-[#285943] hover:bg-[#285943] hover:text-white"
          >
            See All Books
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
