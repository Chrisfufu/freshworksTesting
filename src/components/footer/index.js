/**
 * Footer component.
 */
import React from "react";
import { Layout } from "antd";
import "./style.less";
import { FacebookOutlined, TwitterOutlined } from '@ant-design/icons';
const { Footer } = Layout;

const copyrightString = "React & Redux";
// return a footer object, with a link "contact us"
// and a facebook icon.
const footer = (style1, style2, copyrightString) => {
  return (
    <Footer
      className="layout-footer"
      style={{
        display: 'flex',
        justifyContent:'center',
        alignItems:'center'
      }}
    >
      <div className="layout-footer-content" style={style2}>
        <div className="footerContact">
          <a
            href="./"
            style={{
              display: 'flex',
              justifyContent:'center',
              alignItems:'center'
            }}
          >
            Contact us
          </a>
          <div
            style={{
              display: 'flex',
              justifyContent:'center',
              alignItems:'center'
            }}
          >
            <TwitterOutlined style={{ fontSize: "1.8rem", color: "#000000", margin: "0.5rem" }}/>
            <FacebookOutlined style={{ fontSize: "1.8rem", color: "#000000", margin: "0.5rem" }}/>
            
          </div>
          <p style={{color: "#000000"}}>{copyrightString}</p>
        </div>
      </div>
    </Footer>
  );
};

// return a funciton called appfooter it has 2 objects,
// one is "contact us", the second one is "facebook"
function AppFooter() {
  return footer({ minHeight: "4rem" }, { height: "-2rem", margin:"auto" }, copyrightString);
}
export default AppFooter;
