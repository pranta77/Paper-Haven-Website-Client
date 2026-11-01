"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

const MyBorrowsPage = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [borrows, setBorrows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isPending) return;

    if (!user?.email) {
      setLoading(false);
      return;
    }

    const fetchBorrows = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/my-borrows/${encodeURIComponent(user.email)}`,
        );

        const data = await res.json();

        if (!res.ok) {
          toast.error("Failed to load borrowed books");
          return;
        }

        setBorrows(data);
      } catch (error) {
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchBorrows();
  }, [user?.email, isPending]);

  const handleReturn = async (id) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/my-borrows/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userEmail: user.email,
          }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Could not return book");
        return;
      }

      setBorrows((previous) => previous.filter((borrow) => borrow._id !== id));

      toast.success("Book returned successfully!");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  if (isPending || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F4EA]">
        <span className="loading loading-spinner loading-lg text-[#285943]" />
      </div>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-[#F7F4EA] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-[#285943]">Please Sign In</h2>
        <Link href="/signIn" className="btn mt-4 bg-[#285943] text-white">
          Sign In
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F4EA] px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-[#285943]">
            My Borrowed Books
          </h1>
          <p className="text-gray-500 mt-2">
            Keep track of the books you have borrowed.
          </p>
        </div>

        {borrows.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center shadow-sm">
            <h2 className="text-xl font-semibold text-[#285943]">
              No borrowed books yet!
            </h2>
            <p className="text-gray-500 mt-2">
              Explore our library and borrow your favorite books.
            </p>
            <Link
              href="/all-books"
              className="btn mt-5 bg-[#285943] text-white border-none"
            >
              Explore Books
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-2xl shadow-sm">
            <table className="table">
              <thead>
                <tr className="text-[#285943]">
                  <th>Image</th>
                  <th>Book Title</th>
                  <th>Borrow Date</th>
                  <th>Return Date</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {borrows.map((borrow) => (
                  <tr key={borrow._id}>
                    <td>
                      <div className="w-14 h-16 relative">
                        <Image
                          src={borrow.bookImage}
                          alt={borrow.bookTitle}
                          fill
                          sizes="56px"
                          className="object-cover rounded-lg"
                        />
                      </div>
                    </td>

                    <td className="font-semibold text-[#285943]">
                      {borrow.bookTitle}
                    </td>

                    <td>{formatDate(borrow.borrowDate)}</td>

                    <td>{formatDate(borrow.returnDate)}</td>

                    <td>
                      <button
                        onClick={() => handleReturn(borrow._id)}
                        className="btn btn-sm bg-[#285943] text-white hover:bg-[#1f4433] border-none"
                      >
                        Return Book
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
};

export default MyBorrowsPage;
