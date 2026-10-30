
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
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/books">All Books</Link>
      </li>

      {user && (
        <>
          <li>
            <Link href="/add-book">Add Book</Link>
          </li>
          <li>
            <Link href="/my-books">My Books</Link>
          </li>
          <li>
            <Link href="/my-borrows">My Borrows</Link>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm px-4 lg:px-10">
      {/* Logo */}
      <div className="navbar-start">
        <Link href="/" className="text-2xl font-bold text-">
          📚 Paper Haven
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-medium gap-1">
          {links}
        </ul>
      </div>

      {/* Right Side */}
      <div className="navbar-end gap-2">

        {!isPending && !user && (
          <>
            <Link href="/signIn" className="btn btn-outline btn-primary btn-sm">
              SignIn
            </Link>

            <Link href="/signUp" className="btn btn-primary btn-sm">
              SignUp
            </Link>
          </>
        )}

        {/* User Profile Dropdown */}
        {!isPending && user && (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <Image
                  src={user.image || "/default-avatar.png"}
                  alt={user.name || "User"}
                  width={40}
                  height={40}
                />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu dropdown-content bg-base-100 rounded-box z-50 mt-3 w-56 p-3 shadow-lg border border-base-200"
            >
              <li className="menu-title">
                <span>{user.name || "User"}</span>
              </li>

              <li>
                <Link href="/profile">My Profile</Link>
              </li>

              <li>
                <button onClick={handleLogout} className="text-error">
                  Logout
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
            className="btn btn-ghost btn-circle"
          >
            ☰
          </div>

          <ul
            tabIndex={0}
            className="menu dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-3 shadow-lg"
          >
            {links}
          </ul>
        </div>

      </div>
    </div>
  );
};

export default Navbar;
