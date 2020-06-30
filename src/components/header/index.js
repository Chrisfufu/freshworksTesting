/**
 * Header component.
 */
import React from 'react';
import { useHistory } from "react-router-dom";

import './style.css'

// hearder url
const iconImgUrl = 'https://mail.google.com/mail/u/0?ui=2&ik=ffb53bf6a2&attid=0.0.1&permmsgid=msg-f:1670850385501206861&th=17300d92b49fb94d&view=fimg&sz=s0-l75-ft&attbid=ANGjdJ8eJeqqN4gOpkoVTr0M-_WmgH2XTBFjigce19piv6HpVuI3KLuHYp-04EK7iZIj5ULwP5gRUc8wwSnUqbudtUmTZ8NjiJC1bGVYqsX9evcBHEaaXEaxJQP2wic&disp=emb'

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
          width:'1.552in',
          height:'.5in'
        }}
        src={iconImgUrl}>
      </img>
    </div>
  )

}

export default AppHeader;
