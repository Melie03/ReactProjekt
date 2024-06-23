import { Link } from '@remix-run/react';

export function NavBar() {
  return (
    <header className="border-b items-baseline py-4 px-5">
      <nav className="flex gap-3 text-sm">
        <Link to="/" className="px-3 py-1 font-bold hover:bg-accent rounded-sm  tracking-tight uppercase">
          Home
        </Link>

        <Link to="/jokes" className="px-3 py-1 font-medium hover:bg-accent rounded-sm">
          Jokes
        </Link>
        <Link to="/app/collections" className="px-3 py-1 font-medium hover:bg-accent rounded-sm">
          Collections
        </Link>
      </nav>
    </header>
  );
}
