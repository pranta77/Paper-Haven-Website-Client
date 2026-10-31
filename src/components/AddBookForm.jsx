
"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const categories = ["Fiction", "Science", "History", "Kids", "Others"];

const AddBookForm = () => {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    image: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please sign in first");
      return;
    }

    try {
      setLoading(true);

      const bookData = {
        ...formData,
        userName: user.name,
        userEmail: user.email,
        ownerId: user.id,
      };
    //   console.log(bookData);
      

      const response = await fetch("http://localhost:8000/add-book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
      });

      const result = await response.json();
    //   console.log(result);
      

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to add book");
      }

      toast.success("Book added successfully!");

      setFormData({
        title: "",
        author: "",
        category: "",
        image: "",
        description: "",
      });

      router.push("/my-books");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <p className="text-center py-16">
        Please sign in to add a book.
      </p>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg border border-[#285943]/10 p-6 md:p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#285943]">
            Add a New Book
          </h1>
          <p className="text-gray-500 mt-2">
            Share your favorite books with the Paper Haven community.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="label font-semibold">Book Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter book title"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="label font-semibold">Author Name</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Enter author name"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="label font-semibold">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="select select-bordered w-full"
              required
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="label font-semibold">Book Image URL</label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/book-image.jpg"
              className="input input-bordered w-full"
              required
            />

            {formData.image && (
              <img
                src={formData.image}
                alt="Book preview"
                className="mt-4 w-32 h-40 object-cover rounded-lg border"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
                onLoad={(e) => {
                  e.currentTarget.style.display = "block";
                }}
              />
            )}
          </div>

          <div>
            <label className="label font-semibold">
              Short Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Write a short description..."
              className="textarea textarea-bordered w-full min-h-28"
              required
            />
          </div>

          <div>
            <label className="label font-semibold">User Name</label>
            <input
              type="text"
              value={user.name || ""}
              readOnly
              className="input input-bordered w-full bg-gray-100"
            />
          </div>

          <div>
            <label className="label font-semibold">User Email</label>
            <input
              type="email"
              value={user.email || ""}
              readOnly
              className="input input-bordered w-full bg-gray-100"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn w-full bg-[#285943] hover:bg-[#1f4433] text-white border-none"
          >
            {loading ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Adding Book...
              </>
            ) : (
              "Add Book"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBookForm;
