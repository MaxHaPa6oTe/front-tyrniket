import './Button.css'

interface IButton {
    children?:string;
    clickGo?:()=>void;
}

const Button:React.FC<IButton> = ({children,clickGo}) => {
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