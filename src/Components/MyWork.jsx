import "./MyWork.css";
import mywork_data from "../assets/mywork_data";
import white_arrow from "../assets/white_arrow.png";
import { useState } from "react";

export default function MyWork() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section id="projects" className="mywork">
      <div className="mywork-title">
        <h2>My latest work</h2>
      </div>
      <div className="mywork-container">
        {mywork_data.map((work, index) => {
          return (
            <div key={index} className="box">
              <img src={work.w_img} alt="Work image" />
              <div className="titicon">
                <h2>{work.w_name}</h2>
                {work.github && (
                  <a
                    href={work.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="circle" title="GitHub">
                      <i className="fa-brands fa-github fa-lg"></i>
                    </div>
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div
        className="mywork-showmore"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <p>{isHovered ? "Coming Soon" : "Show More"}</p>
        <img src={white_arrow} alt="White arrow" />
      </div>
    </section>
  );
}
