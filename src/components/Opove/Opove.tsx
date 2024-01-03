import React, { useEffect } from 'react';
import './Opove.css'
import {Transition} from 'react-transition-group'

interface Props {
    text:string
}

const Opove = ({text}:Props) => {
  const [on, setOn] = React.useState(false)
  useEffect(()=>{
    setTimeout(()=>{setOn(true)},100)
    setTimeout(()=>{setOn(false)},5000)
  },[])
    return (
      <Transition
      in={on}
      timeout={400}
      unmountOnExit
      >
        {state => <div className={`circle ${state}`}>
        {text}
      </div>}
      </Transition>
      );
  };
  
  export default Opove; 