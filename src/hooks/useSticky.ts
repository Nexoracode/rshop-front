import { useEffect, useState } from "react";

export default function useSticky() {
  const [isVisible, setIsVisibale] = useState(true);

  useEffect(() => {
    let lastScroll = 0;
    const handleScroll = () => {
      const current = window.scrollY;
      if (current > lastScroll && current > 50) {
        // اسکرول رو به پایین
        setIsVisibale(false);
      } else if (current < lastScroll) {
        // اسکرول به بالا
        setIsVisibale(true);
      }
      lastScroll = current;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { isVisible };
}
