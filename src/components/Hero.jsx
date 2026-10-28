import Scene from "./Scene.jsx";
import { profile } from "../data.js";

export default function Hero() {
  return (
    <section className="hero" id="top">
      <Scene />
      <div className="hero-text">
        <p className="role">{profile.role}</p>
        <h1>
          {profile.name[0]}
          <br />
          {profile.name[1]}
        </h1>
        <p className="lead">{profile.lead}</p>
        <a className="btn" href="#proyek">Lihat proyek</a>
      </div>
    </section>
  );
}
