import "./About.css";
import profile_img from "../assets/riccardo_2.jpg";
import useCountUp from "../hooks/useCountUp";

const skills = [
  { name: "HTML & CSS",   level: 95 },
  { name: "Javascript",   level: 90 },
  { name: "React",        level: 75 },
  { name: "Bootstrap",    level: 90 },
  { name: "PHP",          level: 75 },
  { name: "MySQL",        level: 78 },
  { name: "Laravel",      level: 72 },
];

function Stat({ target, suffix = "+", label }) {
  const [ref, value] = useCountUp(target);
  return (
    <div className="about-achievement" ref={ref}>
      <h2>
        <span className="stat-number">{Math.floor(value)}</span>
        <span className="stat-suffix">{suffix}</span>
      </h2>
      <p>{label}</p>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="about">
      <div className="about-header">
        <span className="section-eyebrow">About</span>
        <h2 className="section-heading">
          Developer by craft, <em>problem-solver</em> by nature.
        </h2>
      </div>

      <div className="about-sections">
        <div className="about-left">
          <div className="about-img-frame">
            <img src={profile_img} alt="Riccardo Giordanella portrait" />
            <span className="about-img-tag">riccardo.jpg</span>
          </div>
        </div>

        <div className="about-right">
          <div className="about-para">
            <p>
              I love bringing ideas to life on <em>both ends</em> of the stack — from
              pixel-perfect interfaces to robust server logic.
            </p>
            <p>
              My goal? Merging technology and creativity for solutions that are as
              <em> functional </em> as they are <em>beautiful</em>.
            </p>
          </div>

          <div className="about-skills">
            <h3 className="about-skills-title">
              <span className="about-skills-bullet" />
              Skills & tools
            </h3>
            {skills.map((skill) => (
              <SkillRow key={skill.name} name={skill.name} level={skill.level} />
            ))}
          </div>
        </div>
      </div>

      <div className="about-achievements">
        <Stat target={2} label="Years of experience" />
        <div className="about-stat-divider" />
        <Stat target={10} label="Projects completed" />
        <div className="about-stat-divider" />
        <Stat target={10} label="Happy clients" />
      </div>
    </section>
  );
}

function SkillRow({ name, level }) {
  const [ref, value] = useCountUp(level, { duration: 1400 });
  return (
    <div className="about-skill" ref={ref}>
      <p className="about-skill-name">{name}</p>
      <div className="about-skill-bar">
        <div className="about-skill-bar-fill" style={{ width: `${value}%` }} />
      </div>
      <span className="about-skill-value">{Math.floor(value)}%</span>
    </div>
  );
}
