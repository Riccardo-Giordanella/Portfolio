import "./MyWork.css";
import mywork_data from "../assets/mywork_data";
import { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export default function MyWork() {
  const [isHovered, setIsHovered] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  return (
    <section id="projects" className="mywork">
      <div className="mywork-header">
        <span className="section-eyebrow">Selected work</span>
        <h2 className="section-heading">
          My latest <em>work</em>
        </h2>
      </div>

      <div className="mywork-container">
        {mywork_data.map((work, index) => (
          <article key={index} className="mywork-card">
            <div className="mywork-card-media">
              {work.w_img.length > 1 ? (
                <Swiper
                  modules={[Navigation]}
                  navigation
                  spaceBetween={10}
                  slidesPerView={1}
                  observer={true}
                  observeParents={true}
                  resizeObserver={true}
                  className="mywork-swiper"
                >
                  {work.w_img.map((img, imgIndex) => (
                    <SwiperSlide key={imgIndex}>
                      <button
                        type="button"
                        className="mywork-img-btn"
                        onClick={() => setModalImage(img)}
                        aria-label={`Enlarge project ${index + 1} image ${imgIndex + 1}`}
                      >
                        <img
                          src={img}
                          alt={`${work.w_name || `Project ${index + 1}`} — image ${imgIndex + 1}`}
                        />
                        <span className="mywork-zoom" aria-hidden="true">
                          ⤢
                        </span>
                      </button>
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <button
                  type="button"
                  className="mywork-img-btn"
                  onClick={() => setModalImage(work.w_img[0])}
                  aria-label={`Enlarge ${work.w_name || `Project ${index + 1}`}`}
                >
                  <img
                    src={work.w_img[0]}
                    alt={`${work.w_name || `Project ${index + 1}`}`}
                  />
                  <span className="mywork-zoom" aria-hidden="true">
                    ⤢
                  </span>
                </button>
              )}
            </div>

            <div className="mywork-card-meta">
              <div className="mywork-card-index">
                0{index + 1} <span aria-hidden="true">/</span> 0{mywork_data.length}
              </div>
              <h3 className="mywork-card-title">
                {work.w_name || "Untitled Project"}
              </h3>
              <div className="mywork-card-actions">
                {work.github && (
                  <a
                    href={work.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mywork-link"
                    title="View on GitHub"
                  >
                    <FontAwesomeIcon icon={faGithub} />
                    <span>Code</span>
                  </a>
                )}
                {work.live && (
                  <a
                    href={work.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mywork-link"
                    title="View live"
                  >
                    <span aria-hidden="true">↗</span>
                    <span>Live</span>
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      {modalImage && (
        <div
          className="custom-modal-overlay"
          onClick={() => setModalImage(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="custom-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="custom-modal-close"
              onClick={() => setModalImage(null)}
              aria-label="Close"
            >
              ×
            </button>
            <img src={modalImage} alt="Enlarged project" />
          </div>
        </div>
      )}

      <button
        type="button"
        className="mywork-showmore"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span>{isHovered ? "Coming Soon" : "Show More"}</span>
        <span className="mywork-showmore-arrow" aria-hidden="true">
          {isHovered ? "✦" : "→"}
        </span>
      </button>
    </section>
  );
}
