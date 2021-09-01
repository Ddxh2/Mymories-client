import React, { useState, useEffect, useRef } from "react";

import "./Welcome.css";

const Welcome = ({ username }) => {
  const [isShown, setIsShown] = useState(true);
  const welcomeRef = useRef();

  useEffect(() => {
    welcomeRef.current.addEventListener("animationend", () =>
      setIsShown(false)
    );
  }, [welcomeRef]);
  return isShown ? (
    <div ref={welcomeRef} className='welcome__container welcome__animate'>
      <span className='welcome__message'>Welcome {`${username}`}!</span>
    </div>
  ) : null;
};

export default Welcome;
