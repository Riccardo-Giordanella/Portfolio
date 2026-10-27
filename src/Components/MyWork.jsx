import "./MyWork.css";
import mywork_data from "../assets/mywork_data";
import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export default function MyWork() {
  // modal holds the whole image set of a project + the current index,
  // so the enlarged view can be browsed like the small slider.
  const [modal, setModal] = useState(null);

  const openModal = (images, index) => setModal({ images, index });
  const closeModal = useCallback(() => setModal(null), []);

  const showPrev = useCallback(
    () =>
      setModal((m) =>
        m ? { ...m, index: (m.index - 1 + m.images.length) % m.images.length } : m
      ),
    []
  );
  const showNext = useCallback(
    () =>
      setModal((m) =>
        m ? { ...m, index: (m.index + 1) % m.images.length } : m
      ),
    []
  );

  const modalOpen = modal !== null;
  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeModal();
      else if (e.key === "ArrowLeft") showPrev();
      else if (e.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalOpen, closeModal, showPrev, showNext]);

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
                        onClick={() => openModal(work.w_img, imgIndex)}
                        aria-label={`Enlarge project ${index + 1} image ${imgIndex + 1}`}
                      >
                        <img
                          src={img}
                          alt={`${work.w_name || `Project ${index + 1}`} — image ${imgIndex + 1}`}
                          loading="lazy"
                          decoding="async"
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
                  onClick={() => openModal(work.w_img, 0)}
                  aria-label={`Enlarge ${work.w_name || `Project ${index + 1}`}`}
                >
                  <img
                    src={work.w_img[0]}
                    alt={`${work.w_name || `Project ${index + 1}`}`}
                    loading="lazy"
                    decoding="async"
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

      {modal && createPortal(
        <div
          className="custom-modal-overlay"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="custom-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="custom-modal-close"
              onClick={closeModal}
              aria-label="Close"
            >
              ×
            </button>

            {modal.images.length > 1 && (
              <button
                className="custom-modal-nav custom-modal-nav-prev"
                onClick={showPrev}
                aria-label="Previous image"
              >
                ‹
              </button>
            )}

            <img
              src={modal.images[modal.index]}
              alt={`Enlarged project — image ${modal.index + 1}`}
            />

            {modal.images.length > 1 && (
              <>
                <button
                  className="custom-modal-nav custom-modal-nav-next"
                  onClick={showNext}
                  aria-label="Next image"
                >
                  ›
                </button>
                <span className="custom-modal-counter" aria-hidden="true">
                  {modal.index + 1} / {modal.images.length}
                </span>
              </>
            )}
          </div>
        </div>,
        document.body
      )}

      <button
        type="button"
        className="mywork-showmore"
        disabled
        aria-disabled="true"
        title="More projects coming soon"
      >
        <span>More coming soon</span>
        <span className="mywork-showmore-arrow" aria-hidden="true">✦</span>
      </button>
    </section>
  );
}
