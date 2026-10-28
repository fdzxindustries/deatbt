import { profile, navLinks } from "../data.js";

export default function Navbar() {
  return (
    <header className="nav">
      <a className="brand" href="#top" aria-label="Beranda">{profile.brand}</a>
      <nav aria-label="Navigasi utama">
        {navLinks.map((l) => (
          <a key={l.href} href={l.href}>{l.label}</a>
        ))}
      </nav>
    </header>
  );
}
