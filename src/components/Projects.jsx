import { projects } from "../data.js";

export default function Projects() {
  return (
    <section className="block" id="proyek">
      <h2>Proyek</h2>
      <ul className="projects">
        {projects.map((p) => (
          <li key={p.name}>
            <a href={p.href}>
              <span className="p-name">{p.name}</span>
              <span className="p-desc">{p.desc}</span>
              <span className="p-tech">{p.tech}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
