import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { galleries } from "../data/galleries";
import "./album.css";

export default function Album() {
  const { category } = useParams();
  const images = galleries[category] || [];

  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Disable background scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = selectedImage ? "hidden" : "auto";
  }, [selectedImage]);

  // Keyboard navigation
  useEffect(() => {
    if (!selectedImage) return;

    const handleKeyPress = (e) => {
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
      if (e.key === "Escape") setSelectedImage(null);
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [selectedImage, currentIndex]);

  const openLightbox = (imageSrc) => {
    const index = images.findIndex((img) => img.src === imageSrc);
    setCurrentIndex(index);
    setSelectedImage(imageSrc);
  };

  const goToNext = () => {
    const nextIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(nextIndex);
    setSelectedImage(images[nextIndex].src);
  };

  const goToPrevious = () => {
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(prevIndex);
    setSelectedImage(images[prevIndex].src);
  };

  if (!images) return <h2 style={{ textAlign: "center" }}>Gallery not found</h2>;

  // Build layout rows
  const rows = [];
  let i = 0;

  while (i < images.length) {
    const current = images[i];

    if (current.layout === "horizontal") {
      rows.push({ type: "single", image: current });
      i++;
    } else if (current.layout === "vertical") {
      const next = images[i + 1];

      if (next && next.layout === "vertical") {
        rows.push({ type: "pair", images: [current, next] });
        i += 2;
      } else {
        rows.push({ type: "single-vertical", image: current });
        i++;
      }
    }
  }

  return (
    <>
      <section className="album-page">
        <div className="album-canvas">
          {rows.map((row, index) => (
            <div key={index} className="album-row">

              {row.type === "single" && (
                <div className="img horizontal">
                  <img
                    src={row.image.src}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    onClick={() => openLightbox(row.image.src)}
                  />
                </div>
              )}

              {row.type === "single-vertical" && (
                <div className="img vertical single-vertical">
                  <img
                    src={row.image.src}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    onClick={() => openLightbox(row.image.src)}
                  />
                </div>
              )}

              {row.type === "pair" && (
                <div className="vertical-pair">
                  <div className="img vertical">
                    <img
                      src={row.images[0].src}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      onClick={() => openLightbox(row.images[0].src)}
                    />
                  </div>

                  <div className="img vertical">
                    <img
                      src={row.images[1].src}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      onClick={() => openLightbox(row.images[1].src)}
                    />
                  </div>
                </div>
              )}

            </div>
          ))}
        </div>
      </section>

      {selectedImage && (
        <div className="lightbox" onClick={() => setSelectedImage(null)}>

          <span className="close-btn" onClick={() => setSelectedImage(null)}>
            ✕
          </span>

          <button
            className="lightbox-arrow lightbox-arrow--prev"
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
          >
            ‹
          </button>

          <img
            src={selectedImage}
            alt="Full"
            className="lightbox-image"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            className="lightbox-arrow lightbox-arrow--next"
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
          >
            ›
          </button>

        </div>
      )}
    </>
  );
}