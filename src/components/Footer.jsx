import { profile } from "../data.js";

export default function Footer() {
  return (
    <footer>
      <p>&copy; {new Date().getFullYear()} {profile.name.join(" ")}</p>
    </footer>
  );
}
