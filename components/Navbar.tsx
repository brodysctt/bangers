import Link from "next/link";

export const Navbar = ({ profile }) => (
  <nav className="navbar">
    <ul>
      <li>
        <Link href="/">
          <button className="btn-logo">BANGERS</button>
        </Link>
      </li>
      {profile && (
        <li>
          <img src={profile.images[0]?.url} />
        </li>
      )}
    </ul>
  </nav>
);
