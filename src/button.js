
import React from 'react';


const Button=()=>{
    
const [first, setfirst] = React.useState(localStorage.getItem("click"))
const [state, setstate] = React.useState(localStorage.getItem("click-second"));
const [on, setOn]=React.useState("")
const [off, setOff]=React.useState("")

const handleOnClick = () => {
  setfirst("true");
  setstate("false");
  // localStorage.setItem("click", first)
  // localStorage.setItem("click-second", state)


}


const handleSecondClick = () => {
  setstate("true");
  setfirst('false');
  // localStorage.setItem("click", first)
  // localStorage.setItem("click-second", state)

}
    return(<>
     <div className="App">
      {console.log(first,state)}
      {localStorage.getItem("click")=="true"? <button onClick={handleSecondClick}  className={ "active"}>
        OFF
      </button>:<button onClick={handleSecondClick}  className={ "off__btn"}>
        OFF
      </button>}
      {localStorage.getItem("click-second")=="true"? <button onClick={handleOnClick}  className={ "active" }>
        ON
      </button>:
      <button className={"on__btn"} onClick={handleOnClick}>
        ON
      </button>}
    </div></>)
}
export default Button