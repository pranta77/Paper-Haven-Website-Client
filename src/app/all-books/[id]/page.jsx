import BorrowButton from "@/components/BorrowButton";
import { getTokenFromServer } from "@/lib/getTokenFromServer";
import Image from "next/image";
import Link from "next/link";

const BooksDetailPage = async ({ params }) => {
  const { id } = await params;
  // JWT TOKEN
  const token = await getTokenFromServer();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/all-books/${id}`,
    {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );

  if (!res.ok) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-[#285943]">Book Not Found</h2>
        <Link href="/all-books" className="btn mt-4 bg-[#285943] text-white">
          Back to Books
        </Link>
      </div>
    );
  }

  const book = await res.json();
  console.log(book);
  

  return (
    <main className="min-h-screen bg-[#F7F4EA] px-4 py-12">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="grid md:grid-cols-2 gap-8 p-6 md:p-10">
          {/* Book Image */}
          <div>
            <Image
              src={book.image}
              alt={book.title}
              className="w-full h-112.5 object-cover rounded-xl"
              width={500}
              height={400}
              preload
            />
          </div>

          {/* Book Information */}
          <div className="flex flex-col justify-center">
            <span className="badge bg-[#285943] text-white border-none mb-4">
              {book.category}
            </span>

            <h1 className="text-3xl font-bold text-[#285943]">{book.title}</h1>

            <p className="text-gray-500 mt-2">By {book.author}</p>

            <div className="divider"></div>

            <h2 className="text-lg font-bold text-[#285943]">Description</h2>

            <p className="text-gray-600 leading-relaxed mt-2">
              {book.description}
            </p>

            {/* Added By */}
            <div className="bg-[#F7F4EA] rounded-xl p-4 mt-6">
              <h3 className="font-semibold text-[#285943]">Added By</h3>

              <p className="text-gray-700 mt-1">{book.userName}</p>

              <p className="text-gray-500 text-sm">{book.userEmail}</p>
            </div>

            {/* Borrow Button */}
            <BorrowButton bookId={book._id} totalCopies={book.totalCopies} />
            <p className="mt-3 text-gray-600">
              Available Copies:{" "}
              <span className="font-bold text-[#285943]">
                {book.totalCopies}
              </span>
            </p>

            <Link
              href="/all-books"
              className="text-center text-[#285943] mt-4 hover:underline"
            >
              ← Back to All Books
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BooksDetailPage;
