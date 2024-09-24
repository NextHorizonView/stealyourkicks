"use client"
import { useEffect } from "react";
import Scrollbar from "smooth-scrollbar";

const Scroll = () => {
  const options = {
    damping: 0.07,
  };

  useEffect(() => {
    // Initialize scrollbar
    const scrollbar = Scrollbar.init(document.body, options);

    return () => {
      // Ensure scrollbar is destroyed properly
      if (scrollbar) {
        scrollbar.destroy();
      }
    };
  }, []);

  return null;
};

export default Scroll;
