import React from 'react'

function Header() {
  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-red-700 shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <h1 className="font-lilita text-2xl tracking-wide text-white">
          WHO'S THAT CHARACTER?
        </h1>

        <span className="font-lilita text-sm tracking-wider text-white/80">
          MARVEL QUIZ
        </span>
      </div>
    </header>
  );
}

export default Header;
