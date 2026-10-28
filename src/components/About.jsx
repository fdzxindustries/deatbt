import { profile } from "../data.js";

export default function About() {
  return (
    <section className="block" id="tentang">
      <h2>Tentang</h2>
      <div className="cols">
        <p>{profile.about}</p>
        <ul className="facts">
          {profile.facts.map((f) => (
            <li key={f.label}>
              <strong>{f.label}</strong> {f.value}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
