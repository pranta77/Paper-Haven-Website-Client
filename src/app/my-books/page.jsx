"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import Image from "next/image";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

const MyBooksPage = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingBook, setEditingBook] = useState(null);
  const [deletingBook, setDeletingBook] = useState(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    image: "",
    description: "",
  });

  // Get user's books
  useEffect(() => {
    if (isPending) return;

    if (!user) {
      setLoading(false);
      return;
    }

    const getBooks = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/my-books/${user.id}`,
        );

        if (!res.ok) throw new Error("Failed to fetch books");

        const data = await res.json();
        setBooks(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getBooks();
  }, [user, isPending]);

  // Open edit modal
  const handleEdit = (book) => {
    setEditingBook(book);

    setFormData({
      title: book.title,
      author: book.author,
      category: book.category,
      image: book.image,
      description: book.description,
    });
  };

  // Update book
  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    // JWT TOKEN
    const token = await getTokenFromClient();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/my-books/${editingBook._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...formData,
            ownerId: user.id,
          }),
        },
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setBooks((previousBooks) =>
        previousBooks.map((book) =>
          book._id === editingBook._id ? { ...book, ...formData } : book,
        ),
      );

      setEditingBook(null);
      toast.success("Book updated successfully!");
    } catch (error) {
      toast.error(error.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  // Delete book
  const handleDelete = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/my-books/${deletingBook._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ownerId: user.id }),
        },
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setBooks((previousBooks) =>
        previousBooks.filter((book) => book._id !== deletingBook._id),
      );

      setDeletingBook(null);
      toast.success("Book deleted successfully!");
    } catch (error) {
      toast.error(error.message || "Delete failed");
    }
  };

  if (isPending || loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-[#285943]"></span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-[#285943]">
          Please sign in to view your books.
        </h2>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F4EA] px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#285943]">My Books</h1>
          <p className="text-gray-500 mt-2">Manage the books you have added.</p>
        </div>

        {books.length === 0 ? (
          <div className="bg-white rounded-xl p-10 text-center">
            <h2 className="text-xl font-semibold text-[#285943]">
              You haven&apos;t added any books yet.
            </h2>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book) => (
              <div
                key={book._id}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <Image
                  src={book.image}
                  alt={book.title}
                  className="w-full h-64 object-cover"
                  width={500}
                  height={500}
                />

                <div className="p-5">
                  <span className="badge bg-[#285943] text-white border-none">
                    {book.category}
                  </span>

                  <h2 className="text-xl font-bold text-[#285943] mt-3">
                    {book.title}
                  </h2>

                  <p className="text-gray-500 mt-1">By {book.author}</p>

                  <div className="flex gap-3 mt-5">
                    <button
                      onClick={() => handleEdit(book)}
                      className="btn flex-1 bg-[#285943] hover:bg-[#1f4433] text-white border-none"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => setDeletingBook(book)}
                      className="btn flex-1 bg-red-600 hover:bg-red-700 text-white border-none"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editingBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-[#285943] mb-5">
              Edit Book
            </h2>

            <form onSubmit={handleUpdate} className="space-y-4">
              <input
                name="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Book Title"
                className="input input-bordered w-full"
                required
              />

              <input
                name="author"
                value={formData.author}
                onChange={(e) =>
                  setFormData({ ...formData, author: e.target.value })
                }
                placeholder="Author Name"
                className="input input-bordered w-full"
                required
              />

              <select
                name="category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="select select-bordered w-full"
                required
              >
                <option value="Fiction">Fiction</option>
                <option value="Science">Science</option>
                <option value="History">History</option>
                <option value="Kids">Kids</option>
                <option value="Others">Others</option>
              </select>

              <input
                name="image"
                type="url"
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
                placeholder="Book Image URL"
                className="input input-bordered w-full"
                required
              />

              <textarea
                name="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description: e.target.value,
                  })
                }
                placeholder="Book Description"
                className="textarea textarea-bordered w-full"
                required
              />

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setEditingBook(null)}
                  className="btn flex-1"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="btn flex-1 bg-[#285943] text-white hover:bg-[#1f4433]"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm text-center">
            <h2 className="text-xl font-bold text-[#285943]">Delete Book?</h2>

            <p className="text-gray-500 mt-3">
              Are you sure you want to delete {deletingBook.title}?
            </p>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setDeletingBook(null)}
                className="btn flex-1"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="btn flex-1 bg-red-600 hover:bg-red-700 text-white border-none"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default MyBooksPage;
