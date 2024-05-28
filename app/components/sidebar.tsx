import { Home, LayoutGrid, ListMusic } from 'lucide-react';
import { PlaylistNav } from './playlist-nav';
import { Link } from '@remix-run/react';

export function Sidebar() {
  return (
    <div className="sidebar">
      <section>
        <h2 className="mb-2">Discover</h2>

        <div className="space-y-1">
          <Link to="/app" className="sidebar_link">
            <Home />
            Home
          </Link>

          <Link to="/app/library" className="sidebar_link">
            <LayoutGrid />
            Library
          </Link>

          <Link to="/app/playlists" className="sidebar_link">
            <ListMusic />
            Your Playlists
          </Link>
        </div>
      </section>

      <section>
        <h2 className="mb-2">Playlists</h2>

        <PlaylistNav></PlaylistNav>
      </section>
    </div>
  );
}
