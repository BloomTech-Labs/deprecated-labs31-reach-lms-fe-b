import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    html {
        font-size: 62.5%;
    }
    #root{
      margin: 20px;
    }

    body {
        font-family: 'Lato', sans-serif;
        font-size: 1.6rem;
        font-weight: 400;
    }

    h1, h2, h3, h4, h5, h6 {
        font-weight: 700;
    }

   .ant-card-meta-description {
     color: black;
     opacity: .5;

   }

    @media (max-width: 575px) {
      /* .ant-layout-header h1{
        display: flex;
        justify-content: flex-start;
      } */

      .ant-layout-sider-dark{
        position: absolute;
        z-index: 3;
        width: 100vw;
        right: 0;
        left: 0;
        height: 100%;
      }
    }
    /*
        Remove middle divider on cards for dashboard
        view between main card body and buttons
     */
    .ant-card-actions {
      border-top: none;
    }

    /*
        Remove dividers between buttons for cards
        on main dashboard view
     */
    .ant-card-actions > li:not(:last-child) {
      border-right: none;
    }

    .ant-layout-sider-zero-width-trigger {
      position: absolute;
      height: 30px;
      top: -25px;
      right: 0;
      left: 0;
      z-index: 3;
    }

    //Mobile devices
    @media(min-width: 320px) {

    } 

    //iPads, Tablets
    @media(min-width: 481px) {

    }

    //Small screens, laptops 
    @media(min-width: 769px) {

    }

    //Desktops, large screens
    @media(min-width: 1025px) {

    }

    //Extra large screens, TV
    @media(min-width: 1201px) {

    }
`;

export default GlobalStyle;
