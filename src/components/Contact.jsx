import { profile } from "../data.js";

export default function Contact() {
  return (
    <section className="block" id="kontak">
      <h2>Kontak</h2>
      <p className="contact-lead">
        Punya proyek atau ingin ngobrol? Kirim email, biasanya saya balas dalam sehari.
      </p>
      <a className="btn" href={`mailto:${profile.email}`}>{profile.email}</a>
      <ul className="social">
        {profile.socials.map((s) => (
          <li key={s.label}>
            <a href={s.href}>{s.label}</a>
          </li>
        ))}
      </ul>
    </section>
  );
}
