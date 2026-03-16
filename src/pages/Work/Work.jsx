import projects from "../../data/projects";
import React, { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./Work.css";
import { gsap } from "gsap";
import Transition from "../../components/Transition/Transition";

const Work = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();
  const total = projects.length;

  const prevCardRef = useRef(null);
  const centerCardRef = useRef(null);
  const nextCardRef = useRef(null);
  const dragStartX = useRef(null);
  const dragStartTime = useRef(null);

  const getIndexes = useCallback(
    (center) => ({
      prev: (center - 1 + total) % total,
      center,
      next: (center + 1) % total,
    }),
    [total]
  );

  const slideTo = useCallback(
    (direction) => {
      if (isAnimating) return;
      setIsAnimating(true);

      const newIndex =
        direction === 1
          ? (activeIndex + 1) % total
          : (activeIndex - 1 + total) % total;

      const prevEl = prevCardRef.current;
      const centerEl = centerCardRef.current;
      const nextEl = nextCardRef.current;

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set([prevEl, centerEl, nextEl], { clearProps: "all" });
          setActiveIndex(newIndex);
          setIsAnimating(false);
        },
      });

      if (direction === 1) {
        // slide forward: center→left, next→center, prev fades out
        tl.to(prevEl, { opacity: 0, scale: 0.85, duration: 0.35, ease: "power2.in" }, 0)
          .to(centerEl, { x: "-100%", opacity: 0, duration: 0.45, ease: "power3.inOut" }, 0)
          .to(nextEl, {
            x: "-100%",
            scale: 1,
            opacity: 1,
            filter: "brightness(1)",
            duration: 0.45,
            ease: "power3.inOut",
          }, 0);
      } else {
        // slide back: center→right, prev→center, next fades out
        tl.to(nextEl, { opacity: 0, scale: 0.85, duration: 0.35, ease: "power2.in" }, 0)
          .to(centerEl, { x: "100%", opacity: 0, duration: 0.45, ease: "power3.inOut" }, 0)
          .to(prevEl, {
            x: "100%",
            scale: 1,
            opacity: 1,
            filter: "brightness(1)",
            duration: 0.45,
            ease: "power3.inOut",
          }, 0);
      }
    },
    [isAnimating, activeIndex, total]
  );

  const handleDragStart = (clientX) => {
    dragStartX.current = clientX;
    dragStartTime.current = Date.now();
  };
  const handleDragEnd = (clientX) => {
    if (dragStartX.current === null) return;
    const dx = clientX - dragStartX.current;
    const dt = Date.now() - dragStartTime.current;
    if (Math.abs(dx) > 40 || (Math.abs(dx) > 20 && dt < 300)) {
      slideTo(dx < 0 ? 1 : -1);
    }
    dragStartX.current = null;
  };

  const { prev, center, next } = getIndexes(activeIndex);

  return (
    <div className="page work">
      <div
        className="work-slider-wrapper"
        onMouseDown={(e) => handleDragStart(e.clientX)}
        onMouseUp={(e) => handleDragEnd(e.clientX)}
        onMouseLeave={() => (dragStartX.current = null)}
        onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
        onTouchEnd={(e) => handleDragEnd(e.changedTouches[0].clientX)}
      >
        <div className="work-track">
          {/* PREV */}
          <div
            ref={prevCardRef}
            className="work-card work-card--side work-card--prev"
            onClick={() => !isAnimating && slideTo(-1)}
          >
            <img src={projects[prev].image} alt={projects[prev].title} draggable={false} />
            <div className="work-card-label">{projects[prev].title}</div>
          </div>

          {/* CENTER */}
          <div
            ref={centerCardRef}
            className="work-card work-card--center"
            onClick={() => !isAnimating && navigate(projects[center].link)}
          >
            <img src={projects[center].image} alt={projects[center].title} draggable={false} />
            <div className="work-card-label">{projects[center].title}</div>
          </div>

          {/* NEXT */}
          <div
            ref={nextCardRef}
            className="work-card work-card--side work-card--next"
            onClick={() => !isAnimating && slideTo(1)}
          >
            <img src={projects[next].image} alt={projects[next].title} draggable={false} />
            <div className="work-card-label">{projects[next].title}</div>
          </div>
        </div>

        {/* Arrows */}
        <div className="work-arrows">
          <button
            className="work-arrow"
            onClick={() => slideTo(-1)}
            aria-label="Previous"
            disabled={isAnimating}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <button
            className="work-arrow"
            onClick={() => slideTo(1)}
            aria-label="Next"
            disabled={isAnimating}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="9 6 15 12 9 18" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Transition(Work);