import reviews from "../../data/reviews";
import React, { useState, useEffect, useRef } from "react";
import "./Reviews.css";

import SplitType from "split-type";
import gsap from "gsap";

const GOOGLE_REVIEWS_URL =
  "https://www.google.com/search?sca_esv=4f066e9b983aac04&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOR3e5WyzAM4Y9B_RTPUtGolz0Qg9Dc2R4HYaoitZHkNExymmRBarRP1tj1AtlX7burA7ODfNwf99edB5QfDFKi0ldw-N&q=Som+Creations+Reviews&sa=X&ved=2ahUKEwi_1YjurJKTAxUTsVYBHTP9BVcQ0bkNegQITBAH&biw=1410&bih=628&dpr=2";

const ReviewsSlider = () => {
  const [activeReview, setActiveReview] = useState(0);
  const containerRef = useRef(null);
  const animationInProgressRef = useRef(false);
  const initialRenderRef = useRef(true);

  useEffect(() => {
    if (initialRenderRef.current) {
      initialRenderRef.current = false;

      const reviewItems = document.querySelectorAll(".rs-review-item");
      if (reviewItems.length > 0) {
        const firstCopy = reviewItems[0].querySelector("#rs-review-copy");
        const firstAuthor = reviewItems[0].querySelector("#rs-review-author");

        if (firstCopy && firstAuthor) {
          new SplitType(firstCopy, { types: "lines", lineClass: "line" });
          new SplitType(firstAuthor, { types: "lines", lineClass: "line" });

          [firstCopy, firstAuthor].forEach((el) => {
            el.querySelectorAll(".line").forEach((line) => {
              const content = line.innerHTML;
              line.innerHTML = `<span>${content}</span>`;
            });
          });

          const allSpans = reviewItems[0].querySelectorAll(".line span");
          gsap.set(allSpans, { yPercent: 110 });
          gsap.to(allSpans, {
            yPercent: 0,
            duration: 0.8,
            stagger: 0.08,
            ease: "power4.out",
            delay: 0.2,
          });
        }
      }
      return;
    }

    if (animationInProgressRef.current) return;
    animationInProgressRef.current = true;

    const currentItems = document.querySelectorAll(".rs-review-item");

    if (currentItems.length > 0) {
      const lastItem = currentItems[currentItems.length - 1];
      const lineSpans = lastItem.querySelectorAll(".line span");

      gsap.to(lineSpans, {
        yPercent: -110,
        duration: 0.6,
        stagger: 0.04,
        ease: "power4.in",
      });
    }

    const newItem = document.createElement("div");
    newItem.className = "rs-review-item";
    newItem.innerHTML = `
      <p id="rs-review-copy">${reviews[activeReview].copy}</p>
      <span id="rs-review-author">— ${reviews[activeReview].author}</span>
    `;

    if (containerRef.current) {
      containerRef.current.appendChild(newItem);

      const newCopy = newItem.querySelector("#rs-review-copy");
      const newAuthor = newItem.querySelector("#rs-review-author");

      new SplitType(newCopy, { types: "lines", lineClass: "line" });
      new SplitType(newAuthor, { types: "lines", lineClass: "line" });

      const newSpans = [];
      [newCopy, newAuthor].forEach((el) => {
        el.querySelectorAll(".line").forEach((line) => {
          const content = line.innerHTML;
          line.innerHTML = `<span>${content}</span>`;
          newSpans.push(line.querySelector("span"));
        });
      });

      gsap.set(newSpans, { yPercent: 110 });
      gsap.to(newSpans, {
        yPercent: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power4.out",
        delay: 0.65,
        onComplete: () => {
          const items = document.querySelectorAll(".rs-review-item");
          for (let i = 0; i < items.length - 1; i++) items[i].remove();
          animationInProgressRef.current = false;
        },
      });
    }
  }, [activeReview]);

  const intervalRef = useRef(null);

  const startAutoPlay = () => {
    intervalRef.current = setInterval(() => {
      if (!animationInProgressRef.current) {
        setActiveReview((prev) => (prev + 1) % reviews.length);
      }
    }, 6000);
  };

  const stopAutoPlay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, []);

  const handlePrev = () => {
    if (!animationInProgressRef.current) {
      stopAutoPlay();
      setActiveReview((prev) => (prev - 1 + reviews.length) % reviews.length);
      startAutoPlay();
    }
  };

  const handleNext = () => {
    if (!animationInProgressRef.current) {
      stopAutoPlay();
      setActiveReview((prev) => (prev + 1) % reviews.length);
      startAutoPlay();
    }
  };

  const handleReviewClick = () => {
    window.open(GOOGLE_REVIEWS_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="reviews-slider">
      {/* Progress bar */}
      <div className="rs-progress-bar" key={activeReview}>
        <div className="rs-progress-fill" />
      </div>

      {/* Dot indicators */}
      <div className="rs-dots">
        {reviews.map((_, i) => (
          <button
            key={i}
            className={`rs-dot ${i === activeReview ? "active" : ""}`}
            onClick={() =>
              !animationInProgressRef.current &&
              i !== activeReview &&
              setActiveReview(i)
            }
            aria-label={`Go to review ${i + 1}`}
          />
        ))}
      </div>

      {/* Stars - static, always 5 */}
      <div className="rs-stars">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i}>★</span>
        ))}
      </div>

      {/* Text content — clicking opens Google Reviews */}
      <div
        className="rs-content"
        ref={containerRef}
        onClick={handleReviewClick}
        style={{ cursor: "pointer" }}
        title="Read all reviews on Google"
        role="link"
        aria-label="Read all Som Creations reviews on Google"
      >
        <div className="rs-review-item">
          <p id="rs-review-copy">{reviews[activeReview].copy}</p>
          <span id="rs-review-author">— {reviews[activeReview].author}</span>
        </div>
      </div>

      {/* Prev / Next arrows */}
      <div className="rs-arrows">
        <button
          className="rs-arrow"
          onClick={handlePrev}
          aria-label="Previous review"
        >
          ←
        </button>
        <button
          className="rs-arrow"
          onClick={handleNext}
          aria-label="Next review"
        >
          →
        </button>
      </div>
    </section>
  );
};

export default ReviewsSlider;