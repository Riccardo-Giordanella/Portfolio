import "./About.css";
import profile_img from "../assets/riccardo_2.jpg";

export default function About() {
  return (
    <section className="about">
      <div className="about-title">
        <h1>About me</h1>
      </div>
      <div className="about-sections">
        <div className="about-left">
          <img src={profile_img} alt="Profile Image" />
        </div>
        <div className="about-right">
          <div className="about-para">
            <p>
              Developer by craft, problem-solver by nature. I love bringing
              ideas to life on both ends of the stack.
            </p>
            <p>
              My goal? To merge technology and creativity for solutions that are
              as functional as they are beautiful.
            </p>
          </div>
          <div className="about-skills">
            <div className="about-skill">
              <p>HTML & CSS</p>
              <hr style={{ width: "100%" }} />
            </div>
            <div className="about-skill">
              <p>Javascript</p>
              <hr style={{ width: "100%" }} />
            </div>
            <div className="about-skill">
              <p>React</p>
              <hr style={{ width: "70%" }} />
            </div>
            <div className="about-skill">
              <p>Bootstrap</p>
              <hr style={{ width: "100%" }} />
            </div>
            <div className="about-skill">
              <p>PHP</p>
              <hr style={{ width: "75%" }} />
            </div>
            <div className="about-skill">
              <p>MySQL</p>
              <hr style={{ width: "75%" }} />
            </div>
            <div className="about-skill">
              <p>Laravel</p>
              <hr style={{ width: "75%" }} />
            </div>
          </div>
        </div>
      </div>
      <div className="about-achievements">
        <div className="about-achievement">
          <h2>2+</h2>
          <p>YEARS OF EXPERIENCE</p>
        </div>
        <hr />
        <div className="about-achievement">
          <h2>10+</h2>
          <p>PROJECTS COMPLETED</p>
        </div>
        <hr />
        <div className="about-achievement">
          <h2>15+</h2>
          <p>HAPPY CLIENTS</p>
        </div>
      </div>
    </section>
  );
}
