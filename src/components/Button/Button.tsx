import './Button.css'

interface Props {
    children?:string;
    clickGo?:()=>void;
}

const Button = ({children,clickGo}: Props) => {
    return <div className=''>
    <button className="animated-button">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    {children}
  </button>
  </div>
}

export default Button