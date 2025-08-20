import "./MyWork.css";
import mywork_data from "../assets/mywork_data";
import white_arrow from "../assets/white_arrow.png";
import { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function MyWork() {
  const [isHovered, setIsHovered] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  return (
    <section id="projects" className="mywork">
      <div className="mywork-title">
        <h2>My latest work</h2>
      </div>

      <div className="mywork-container">
        {mywork_data.map((work, index) => (
          <div key={index} className="box">
            {work.w_img.length > 1 ? (
              <Swiper
                modules={[Navigation]}
                navigation
                spaceBetween={10}
                slidesPerView={1}
                className="mywork-swiper"
              >
                {work.w_img.map((img, imgIndex) => (
                  <SwiperSlide key={imgIndex}>
                    <img
                      src={img}
                      alt={`Project ${index + 1} img ${imgIndex + 1}`}
                      onClick={() => setModalImage(img)}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <img
                src={work.w_img[0]}
                alt={`Project ${index + 1} image`}
                onClick={() => setModalImage(work.w_img[0])}
              />
            )}

            <div className="titicon">
              <h2>{work.w_name || "Untitled Project"}</h2>
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
        ))}
      </div>

      {modalImage && (
        <div
          className="custom-modal-overlay"
          onClick={() => setModalImage(null)}
        >
          <div
            className="custom-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="custom-modal-close"
              onClick={() => setModalImage(null)}
            >
              ×
            </button>
            <img src={modalImage} alt="Enlarged project" />
          </div>
        </div>
      )}

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
