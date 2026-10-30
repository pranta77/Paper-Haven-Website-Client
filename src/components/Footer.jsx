
import Link from "next/link";
import {
  BookOpen,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Github,
  ArrowUpRight,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#285943] text-white mt-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <Link
              href="/"
              className="flex items-center gap-2 text-2xl font-bold text-white"
            >
              <BookOpen size={30} className="text-[#D6A85F]" />
              Paper Haven
            </Link>

            <p className="mt-5 text-sm leading-7 text-white/75">
              Your little corner of the internet for discovering,
              sharing, and enjoying books. Explore new stories
              and build your own reading journey with Paper Haven.
            </p>

            <p className="mt-5 text-sm text-[#D6A85F] font-medium">
              A little haven for every book lover. ❤️
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-5 text-[#D6A85F]">
              Quick Links
            </h3>

            <ul className="space-y-3 text-sm text-white/75">
              <li>
                <Link href="/" className="hover:text-[#D6A85F] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/books" className="hover:text-[#D6A85F] transition-colors">
                  All Books
                </Link>
              </li>
              <li>
                <Link href="/add-book" className="hover:text-[#D6A85F] transition-colors">
                  Add Book
                </Link>
              </li>
              <li>
                <Link href="/my-books" className="hover:text-[#D6A85F] transition-colors">
                  My Books
                </Link>
              </li>
              <li>
                <Link href="/my-borrows" className="hover:text-[#D6A85F] transition-colors">
                  My Borrows
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-5 text-[#D6A85F]">
              Contact Us
            </h3>

            <ul className="space-y-4 text-sm text-white/75">
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-[#D6A85F] shrink-0" />
                <a href="mailto:support@paperhaven.com" className="hover:text-white">
                  support@paperhaven.com
                </a>
              </li>

              <li className="flex items-center gap-3">
                <Phone size={18} className="text-[#D6A85F] shrink-0" />
                <a href="tel:+8801700000000" className="hover:text-white">
                  +880 1700-000000
                </a>
              </li>

              <li className="flex items-center gap-3">
                <MapPin size={18} className="text-[#D6A85F] shrink-0" />
                <span>Bangladesh</span>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-bold text-lg mb-5 text-[#D6A85F]">
              Follow Us
            </h3>

            <p className="text-sm leading-7 text-white/75 mb-5">
              Stay connected with us and discover
              more reading inspiration.
            </p>

            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-[#D6A85F] hover:text-[#285943] hover:border-[#D6A85F] transition-all"
              >
                {/* <Facebook size={18} /> */}
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-[#D6A85F] hover:text-[#285943] hover:border-[#D6A85F] transition-all"
              >
                {/* <Instagram size={18} /> */}
              </a>

              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-[#D6A85F] hover:text-[#285943] hover:border-[#D6A85F] transition-all"
              >
                {/* <Github size={18} /> */}
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-white/20 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">

          <p className="text-sm text-white/65 text-center">
            © {new Date().getFullYear()} Paper Haven. All rights reserved.
          </p>

          <Link
            href="/"
            className="text-sm text-[#D6A85F] hover:text-white flex items-center gap-1 transition-colors"
          >
            Back to Home <ArrowUpRight size={16} />
          </Link>

        </div>

      </div>
    </footer>
  );
};

export default Footer;
