/**
 * Header component.
 */
import React from 'react';
import { useHistory } from "react-router-dom";

import './style.css'

// hearder url
const iconImgUrl = process.env.PUBLIC_URL + '/ducks.jpg'

function AppHeader() {
  let history = useHistory();

  // if header clicked, return to home page
  let handleIconOnClick = () => {
    if (window.location.pathname !== '/info') {
      history.push('/info')
    }
  }
  // the following is the header logo
  return (
    <div className='layout-header'>
      <img
        onClick={handleIconOnClick}
        className='layout-header-logo'
        alt="icon"
        style={{
          width: "300px",
          height: "100px"
        }}
        src={iconImgUrl}>
      </img>
    </div>
  )

}

export default AppHeader;
