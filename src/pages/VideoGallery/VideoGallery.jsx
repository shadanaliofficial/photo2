// src/pages/VideoGallery/VideoGallery.jsx
import { useState, useEffect } from "react";
import { videos } from "../../data/videoData";
import Transition from "../../components/Transition/Transition";
import "./VideoGallery.css";

const VideoGallery = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    document.body.style.overflow = activeIndex !== null ? "hidden" : "auto";
  }, [activeIndex]);

  useEffect(() => {
    if (activeIndex === null) return;
    const handleKey = (e) => {
      if (e.key === "ArrowLeft")  setActiveIndex((i) => (i - 1 + videos.length) % videos.length);
      if (e.key === "ArrowRight") setActiveIndex((i) => (i + 1) % videos.length);
      if (e.key === "Escape")     setActiveIndex(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeIndex]);

  const activeVideo = activeIndex !== null ? videos[activeIndex] : null;

  return (
    <>
      <section className="vgallery-page">
        <div className="vgallery-canvas">
          <div className="vgallery-grid">
            {videos.map((video, index) => (
              <div
                key={index}
                className="vgallery-thumb"
                onClick={() => setActiveIndex(index)}
              >
                <img
                  src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    e.target.src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
                  }}
                />
                <div className="vgallery-thumb-overlay">
                  <div className="vgallery-play">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {activeVideo && (
        <div className="vgallery-lightbox" onClick={() => setActiveIndex(null)}>

          <span className="vgallery-close" onClick={() => setActiveIndex(null)}>✕</span>

          <button
            className="vgallery-arrow vgallery-arrow--prev"
            onClick={(e) => {
              e.stopPropagation();
              setActiveIndex((i) => (i - 1 + videos.length) % videos.length);
            }}
          >‹</button>

          {/* Shorts use /shorts/ embed path */}
          <div className="vgallery-player" onClick={(e) => e.stopPropagation()}>
            <div className="vgallery-embed">
              <iframe
                key={activeIndex}
                src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=1&rel=0`}
                title="video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          <button
            className="vgallery-arrow vgallery-arrow--next"
            onClick={(e) => {
              e.stopPropagation();
              setActiveIndex((i) => (i + 1) % videos.length);
            }}
          >›</button>

        </div>
      )}
    </>
  );
};

export default Transition(VideoGallery);