import { useState } from 'react';
import { GoogleIcon } from './icon';


const GoogleButton = ({onClick, label }) => {

    const [buttonStyle, setButtonStyle] = useState(baseStyle);

    return (
        <div
          role="button"
          onClick={onClick}
          style={buttonStyle}
          onMouseOver={()=>setButtonStyle({...baseStyle, ...hoverStyle})}
          onMouseOut={()=>setButtonStyle(baseStyle)}
        >
          <GoogleIcon />
          <span>{label}</span>
        </div>
      )
}

export default GoogleButton;

const baseStyle = {
    height: '50px',
    width: '240px',
    border: 'none',
    textAlign: 'center',
    verticalAlign: 'center',
    boxShadow: '0 2px 4px 0 rgba(0,0,0,.25)',
    fontSize: '16px',
    lineHeight: '48px',
    display: 'block',
    borderRadius: '1px',
    transition: 'background-color .218s, border-color .218s, box-shadow .218s',
    fontFamily: 'Roboto,arial,sans-serif',
    cursor: 'pointer',
    userSelect: 'none',
    backgroundColor: '#4285f4',
    color: '#fff',
}

const hoverStyle = {
    boxShadow: '0 0 3px 3px rgba(66,133,244,.3)',
    transition: 'background-color .218s, border-color .218s, box-shadow .218s'
}
  
