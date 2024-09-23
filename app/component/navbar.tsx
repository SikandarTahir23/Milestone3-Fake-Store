"use client";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 w-full sm:w-[90%] ml-auto mr-auto rounded-md">
      <div className="px-2 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <a className="text-2xl text-white font-mono">FakeStore</a>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <a
              href="/"
              className="text-gray-400 hover:text-white p-2 rounded-md"
            >
              Home
            </a>
            <a
              href="/cart"
              className="text-gray-400 hover:text-white p-2 rounded-md"
            >
              Cart
            </a>
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              className="text-gray-400 hover:text-white focus:outline-none p-2"
              aria-label="Open Menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      <div className="md:hidden">
        <a href="/" className="block text-gray-400 hover:text-white p-2">
          Home
        </a>
        <a href="/cart" className="block text-gray-400 hover:text-white p-2">
          Cart
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
