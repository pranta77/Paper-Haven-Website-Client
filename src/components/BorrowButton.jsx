"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

const BorrowButton = ({ bookId }) => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleBorrow = async () => {
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/borrow-book`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bookId,
            userEmail: user.email,
          }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Could not borrow this book");
        return;
      }

      toast.success("Book borrowed successfully!");
      setIsOpen(false);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <p className="text-sm text-gray-500">
        Please sign in to borrow this book.
      </p>
    );
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="btn mt-6 bg-[#285943] text-white hover:bg-[#1f4433] border-none"
      >
        Borrow This Book
      </button>

      {isOpen && (
        <div className="modal modal-open">
          <div className="modal-box bg-white">
            <h3 className="text-2xl font-bold text-[#285943]">
              Borrow This Book
            </h3>

            <div className="mt-5 space-y-4">
              <div>
                <label className="label">User Name</label>
                <input
                  type="text"
                  value={user.name || ""}
                  readOnly
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="label">Email Address</label>
                <input
                  type="email"
                  value={user.email || ""}
                  readOnly
                  className="input input-bordered w-full"
                />
              </div>

              <p className="text-sm text-gray-500">
                Your return date will be automatically set to 14 days after
                borrowing.
              </p>
            </div>

            <div className="modal-action">
              <button
                onClick={() => setIsOpen(false)}
                className="btn btn-ghost"
                disabled={loading}
              >
                Cancel
              </button>

              <button
                onClick={handleBorrow}
                disabled={loading}
                className="btn bg-[#285943] text-white hover:bg-[#1f4433] border-none"
              >
                {loading ? "Borrowing..." : "Confirm Borrow"}
              </button>
            </div>
          </div>
          <div
            className="modal-backdrop"
            onClick={() => !loading && setIsOpen(false)}
          />
        </div>
      )}
    </>
  );
};

export default BorrowButton;
