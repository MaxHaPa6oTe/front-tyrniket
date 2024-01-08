import React, { useRef, useEffect } from 'react';
import './Button2.css'; // Assuming you have some CSS styles defined

const Button2: React.FC = () => {
  
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Access the current button reference
    const button = buttonRef.current;

    if (button) {
      // The handler is better created inside the effect to avoid adding/removing it unnecessarily
      const handleAnimation = (e: MouseEvent) => {
        button.classList.remove('animate');
        button.classList.add('animate');
        setTimeout(() => {
          button.classList.remove('animate');
        }, 700);
      };

      // Add event listener
      button.addEventListener('click', handleAnimation);

      // Cleanup the event listener when the component is unmounted
      return () => {
        button.removeEventListener('click', handleAnimation);
      };
    }
  }, []);

  // Assign the ref to the button with the `ref` prop
  return (
    <button ref={buttonRef} className="bubbly-button">Click me!</button>
  );
};

export default Button2;
