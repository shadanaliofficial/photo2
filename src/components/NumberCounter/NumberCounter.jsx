import { useEffect, useRef, useState } from "react";
import "./numberCounter.css";

const stats = [
  { value: 15, suffix: "+", label: "Years Of Experience" },
  { value: 100, suffix: "+", label: "Clicks Per Day" },
  { value: 10, suffix: "+", label: "Photographers" },
  { value: 150, suffix: "+", label: "Clients" },
];

function useCountUp(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);

  return count;
}

function StatItem({ value, suffix, label, animate }) {
  const count = useCountUp(value, 1800, animate);

  return (
    <div className="stat-item">
      <div className="stat-number">
        <span className="stat-value">{count}</span>
        <span className="stat-suffix">{suffix}</span>
      </div>
      <div className="stat-divider" />
      <p className="stat-label">{label}</p>
    </div>
  );
}

export default function StatsCounter() {
  const sectionRef = useRef(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animate) {
          setAnimate(true);
        }
      },
      { threshold: 0.4 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [animate]);

  return (
    <section className="stats-section" ref={sectionRef}>
      <div className="stats-inner">
        {stats.map((stat, i) => (
          <StatItem key={i} {...stat} animate={animate} />
        ))}
      </div>
    </section>
  );
}