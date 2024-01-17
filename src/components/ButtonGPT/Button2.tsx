import React, { useRef, useEffect } from 'react';
import './Button2.css'; 

interface IButton2 {
  text: string
}
const Button2: React.FC<IButton2> = ({text}) => {
  
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const button = buttonRef.current;

    if (button) {
      const handleAnimation = (e: MouseEvent) => {
        button.classList.remove('animate');
        button.classList.add('animate');
        setTimeout(() => {
          button.classList.remove('animate');
        }, 700);
      };

      button.addEventListener('click', handleAnimation);

      return () => {
        button.removeEventListener('click', handleAnimation);
      };
    }
  }, []);

  return (
    <button ref={buttonRef} className="bubbly-button">{text}</button>
  );
};

export default Button2;
