import { Instagram } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

/**
 * Footer component - displays site footer with social links and copyright
 */
const Footer = () => {
  return (
    <footer className="border-t border-gray-200 w-full bg-white container mx-auto">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand column */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            {/* Logo - adjusted spacing */}
            <Link
              href="/"
              className="flex-shrink-0 flex items-center mr-4 sm:mr-6"
            >
              <Image
                src="/assets/logo.png"
                alt="Recipe Picks"
                width={250}
                height={100}
              />
            </Link>

            <p className="text-sm text-gray-500 my-4">
              Discover, share, and compete with your favorite recipes
            </p>
            <div className="flex space-x-5">
              {/* TikTok */}
              <a
                href="#"
                className="text-gray-500 hover:text-primary transition-colors"
              >
                <span className="sr-only">TikTok</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="#"
                className="text-gray-500 hover:text-primary transition-colors"
              >
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" />
              </a>

              {/* YouTube */}
              <a
                href="#"
                className="text-gray-500 hover:text-primary transition-colors"
              >
                <span className="sr-only">YouTube</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase mb-4">
              Explore
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/recipes"
                  className="text-gray-500 hover:text-primary transition-colors"
                >
                  All Recipes
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="text-gray-500 hover:text-primary transition-colors"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  href="/popular"
                  className="text-gray-500 hover:text-primary transition-colors"
                >
                  Popular
                </Link>
              </li>
              <li>
                <Link
                  href="/competitions"
                  className="text-gray-500 hover:text-primary transition-colors"
                >
                  Competitions
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-gray-500 hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-500 hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-gray-500 hover:text-primary transition-colors"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase mb-4">
              Get Recipe Updates
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Sign up for our newsletter to receive weekly recipe inspiration.
            </p>
            <form className="flex gap-1">
              <input
                type="email"
                placeholder="Your email"
                className="min-w-0 flex-1 px-3 py-2 rounded-full border border-gray-300 focus:ring-primary focus:border-primary sm:text-sm"
                required
              />
              <button
                type="submit"
                className="flex-shrink-0 bg-primary border border-primary text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom section with copyright and legal links */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Recipe Picks. All rights
              reserved.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <Link
                href="/privacy"
                className="text-sm text-gray-500 hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-gray-500 hover:text-primary transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/cookies"
                className="text-sm text-gray-500 hover:text-primary transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
