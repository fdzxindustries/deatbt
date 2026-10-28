import { skills } from "../data.js";

export default function Skills() {
  return (
    <section className="block" id="keahlian">
      <h2>Keahlian</h2>
      <div className="skills">
        {skills.map((s) => (
          <div key={s.title}>
            <h3>{s.title}</h3>
            <p>{s.items}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
