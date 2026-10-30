"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
    router.refresh();
  };

  const links = (
    <>
      <li>
        <Link href="/" className="rounded-xl px-4 py-2 transition-all hover:bg-[#285943] hover:text-white">
          Home
        </Link>
      </li>
      <li>
        <Link href="/books" className="rounded-xl px-4 py-2 transition-all hover:bg-[#285943] hover:text-white">
          All Books
        </Link>
      </li>

      {user && (
        <>
          <li>
            <Link href="/add-book" className="rounded-xl px-4 py-2 transition-all hover:bg-[#285943] hover:text-white">
              Add Book
            </Link>
          </li>
          <li>
            <Link href="/my-books" className="rounded-xl px-4 py-2 transition-all hover:bg-[#285943] hover:text-white">
              My Books
            </Link>
          </li>
          <li>
            <Link href="/my-borrows" className="rounded-xl px-4 py-2 transition-all hover:bg-[#285943] hover:text-white">
              My Borrows
            </Link>
          </li>
        </>
      )}
    </>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-[#285943]/10 bg-[#F7F4EA]/95 shadow-sm backdrop-blur-md">
      <div className="navbar mx-auto max-w-7xl px-4 py-3 lg:px-8">

        {/* Logo */}
        <div className="navbar-start">
          <Link href="/" className="group flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#285943] text-2xl shadow-md transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105">
              📚
            </div>

            <div>
              <h1 className="text-xl font-extrabold tracking-tight text-[#285943] sm:text-2xl">
                Paper Haven
              </h1>
              <p className="text-[10px] font-medium tracking-[3px] text-[#D6A85F]">
                YOUR WORLD OF BOOKS
              </p>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal items-center gap-1 rounded-2xl bg-white/70 p-2 text-sm font-semibold text-[#1F2933] shadow-sm">
            {links}
          </ul>
        </div>

        {/* Right Side */}
        <div className="navbar-end gap-2">

          {/* Logged Out */}
          {!isPending && !user && (
            <div className="hidden items-center gap-2 sm:flex">
              <Link
                href="/signIn"
                className="rounded-xl border border-[#285943] px-4 py-2 text-sm font-semibold text-[#285943] transition-all hover:bg-[#285943]/10"
              >
                Sign In
              </Link>

              <Link
                href="/signUp"
                className="rounded-xl bg-[#285943] px-5 py-2 text-sm font-semibold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-[#1e4432] hover:shadow-lg"
              >
                Sign Up
              </Link>
            </div>
          )}

          {/* User Profile Dropdown */}
          {!isPending && user && (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar ring-2 ring-[#D6A85F] ring-offset-2 ring-offset-[#F7F4EA] transition-all hover:ring-[#285943]"
              >
                <div className="w-10 overflow-hidden rounded-full bg-[#285943]/10">
                  <Image
                    src={user.image || "/default-avatar.png"}
                    alt={user.name || "User"}
                    width={40}
                    height={40}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              <ul
                tabIndex={0}
                className="menu dropdown-content z-50 mt-4 w-60 rounded-2xl border border-[#285943]/10 bg-[#F7F4EA] p-3 shadow-xl"
              >
                <li className="menu-title border-b border-[#285943]/10 pb-3">
                  <span className="text-sm font-bold text-[#285943]">
                    {user.name || "User"}
                  </span>
                </li>

                <li>
                  <Link
                    href="/profile"
                    className="rounded-xl py-3 font-medium text-[#1F2933] hover:bg-[#285943]/10 hover:text-[#285943]"
                  >
                    👤 My Profile
                  </Link>
                </li>

                <li>
                  <button
                    onClick={handleLogout}
                    className="rounded-xl py-3 font-medium text-red-600 hover:bg-red-50"
                  >
                    ↪ Logout
                  </button>
                </li>
              </ul>
            </div>
          )}

          {/* Mobile Menu */}
          <div className="dropdown dropdown-end lg:hidden">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-circle border-none bg-[#285943] text-xl text-white shadow-md hover:bg-[#1e4432]"
            >
              ☰
            </div>

            <ul
              tabIndex={0}
              className="menu dropdown-content z-50 mt-4 w-60 rounded-2xl border border-[#285943]/10 bg-[#F7F4EA] p-3 text-sm font-semibold text-[#1F2933] shadow-xl"
            >
              {links}

              {!isPending && !user && (
                <>
                  <li className="mt-2 border-t border-[#285943]/10 pt-2 sm:hidden">
                    <Link href="/signIn" className="rounded-xl py-3 hover:bg-[#285943]/10">
                      Sign In
                    </Link>
                  </li>
                  <li className="sm:hidden">
                    <Link href="/signUp" className="rounded-xl bg-[#285943] py-3 text-white hover:bg-[#1e4432]">
                      Sign Up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Navbar;