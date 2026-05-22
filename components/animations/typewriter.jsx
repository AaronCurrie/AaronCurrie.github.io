'use client';
import { useState, useEffect, cloneElement } from "react";

export default function Typewriter({ children, speed = 50, pause = 800 }) {
  const [current, setCurrent] = useState(0);
  const [displayed, setDisplayed] = useState([""]);
  useEffect(() => {
    setCurrent(0);
    setDisplayed([""]);
  }, [children, speed, pause]);

  useEffect(() => {
    if (!Array.isArray(children)) return;
    let i = 0;
    let interval;
    function typeSentence() {
      interval = setInterval(() => {
        setDisplayed((prev) => {
          const newDisplayed = [...prev];
          newDisplayed[current] = children[current].props.children.slice(0, i + 1);
          return newDisplayed;
        });
        i++;
        if (i >= children[current].props.children.length) {
          clearInterval(interval);
          if (current < children.length - 1) {
            setTimeout(() => {
              setDisplayed((prev) => [...prev, ""]);
              setCurrent((c) => c + 1);
            }, pause);
          }
        }
      }, speed);
    }
    typeSentence();
    return () => clearInterval(interval);
  }, [current, children, speed, pause]);

  return (
    <>
      {Array.isArray(children)
        ? children.map((child, idx) =>
            cloneElement(child, { key: idx }, displayed[idx] || "")
          )
        : null}
    </>
  );
}