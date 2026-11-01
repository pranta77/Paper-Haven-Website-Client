"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [name, setName] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const currentName = name ?? user?.name ?? "";
  const currentImage = image ?? user?.image ?? "/default-avatar.png";

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    if (!currentName.trim()) {
      toast.error("Name is required");
      return;
    }

    setLoading(true);

    try {
      const { error } = await authClient.updateUser({
        name: currentName.trim(),
        image: image === null ? user.image : image.trim(),
      });

      if (error) {
        toast.error(error.message || "Failed to update profile");
        return;
      }

      toast.success("Profile updated successfully!");

      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  if (isPending) {
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

        <p className="mt-2 text-gray-500">Sign in to manage your profile.</p>

        <Link
          href="/signIn"
          className="btn mt-5 bg-[#285943] text-white border-none"
        >
          Sign In
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F4EA] px-4 py-12">
      <div className="mx-auto max-w-5xl">
        {/* Page Heading */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-extrabold text-[#285943] md:text-4xl">
            My Profile
          </h1>

          <p className="mt-2 text-gray-500">
            Manage your personal information and account settings.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Profile Preview */}
          <div className="rounded-3xl bg-white p-8 text-center shadow-sm">
            <div className="mx-auto mb-5 h-28 w-28 overflow-hidden rounded-full border-4 border-[#D6A85F] bg-[#285943]/10">
              <Image
                src={currentImage || "/default-avatar.png"}
                alt={currentName || "User"}
                width={112}
                height={112}
                unoptimized
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>

            <h2 className="text-xl font-bold text-[#285943]">
              {currentName || "User"}
            </h2>

            <p className="mt-1 break-all text-sm text-gray-500">{user.email}</p>

            <div className="mt-5">
              {user.emailVerified ? (
                <span className="badge badge-success gap-1 text-white">
                  ✓ Verified Account
                </span>
              ) : (
                <span className="badge badge-warning">Email Not Verified</span>
              )}
            </div>

            <div className="mt-7 border-t border-gray-100 pt-5 text-left">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Account Information
              </p>

              <p className="mt-3 text-sm text-gray-600">
                <span className="font-semibold">Member:</span> {user.name}
              </p>
            </div>
          </div>

          {/* Edit Profile Form */}
          <div className="rounded-3xl bg-white p-6 shadow-sm md:col-span-2 md:p-8">
            <h2 className="mb-2 text-2xl font-bold text-[#285943]">
              Edit Profile
            </h2>

            <p className="mb-8 text-sm text-gray-500">
              Update your profile details below.
            </p>

            <form onSubmit={handleUpdateProfile} className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="mb-2 block font-semibold text-[#285943]">
                  Full Name
                </label>

                <input
                  type="text"
                  value={currentName}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="input input-bordered w-full bg-white"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block font-semibold text-[#285943]">
                  Email Address
                </label>

                <input
                  type="email"
                  value={user.email || ""}
                  readOnly
                  className="input input-bordered w-full bg-gray-100 text-gray-500"
                />

                <p className="mt-2 text-xs text-gray-400">
                  Your email address cannot be changed here.
                </p>
              </div>

              {/* Profile Image */}
              <div>
                <label className="mb-2 block font-semibold text-[#285943]">
                  Profile Image URL
                </label>

                <input
                  type="url"
                  value={image ?? user.image ?? ""}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://example.com/profile.jpg"
                  className="input input-bordered w-full bg-white"
                />

                <p className="mt-2 text-xs text-gray-400">
                  Paste an image URL to update your profile picture.
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap gap-3 pt-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn border-none bg-[#285943] px-8 text-white hover:bg-[#1e4432]"
                >
                  {loading ? (
                    <>
                      <span className="loading loading-spinner loading-sm" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setName(user.name || "");
                    setImage(user.image || "");
                  }}
                  disabled={loading}
                  className="btn btn-outline border-[#285943] text-[#285943] hover:bg-[#285943] hover:text-white"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
