'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';

export default function Navbar() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-blue-600">Care.xyz</span>
            </Link>
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              <Link href="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                Home
              </Link>
              <Link href="/#services" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                Services
              </Link>
              <Link href="/#about" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                About
              </Link>
              <Link href="/#contact" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                Contact
              </Link>
            </div>
          </div>
          <div className="hidden md:flex md:items-center">
            {session ? (
              <div className="flex items-center space-x-4">
                <Link href="/my-bookings" className="text-gray-700 hover:text-blue-600 text-sm font-medium">
                  My Bookings
                </Link>
                <button
                  onClick={() => signOut()}
                  className="text-gray-700 hover:text-blue-600 text-sm font-medium"
                >
                  Sign Out
                </button>
                <span className="text-sm text-gray-500">{session.user?.name}</span>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/login" className="text-gray-700 hover:text-blue-600 text-sm font-medium">
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-gray-900 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="block text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium">
              Home
            </Link>
            <Link href="/#services" className="block text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium">
              Services
            </Link>
            <Link href="/#about" className="block text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium">
              About
            </Link>
            {session ? (
              <>
                <Link href="/my-bookings" className="block text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium">
                  My Bookings
                </Link>
                <button
                  onClick={() => signOut()}
                  className="block w-full text-left text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="block text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium">
                  Sign In
                </Link>
                <Link href="/register" className="block text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}