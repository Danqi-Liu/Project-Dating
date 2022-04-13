import { createGlobalStyle } from "styled-components";

export const breakpoints = { tablet: "600px" };

export default createGlobalStyle`
    :root {
      --primary-color: #cc5500;
      --secondry-color:#cc5500;
      --accent-bg-color: rgba(204, 85, 0, 0.1);
      --main-bg-color:pink;
      --secondry-bg-color:lightgray;
      --text-color:black;
      --text-color2:white;
      --hover-color:red;
      --page-horizontal-padding: 20px;
      --header-height: 50px;
      --max-content-width: 99vw;
      --heading-font-family: 'Teko', sans-serif;
      --user-img-width: 160px;
    }
    html
    { margin: 0;
        padding: 0;
        border: 0;
        font-size: 20px;
        vertical-align: baseline;
        box-sizing: border-box;
    }
 @media (max-width: 900px) {
  html { font-size: 15px; }
}
@media (max-width: 600px) {
  html { font-size: 12px; }
}
    

     button,body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed,
    figure, figcaption, footer, header, hgroup,
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 1 rem;
        vertical-align: baseline;
        box-sizing: border-box;
    }
    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure,
    footer, header, hgroup, menu, nav, section {
        display: block;
    }
    body {
        line-height: 1;
    }
    ol, ul {
        list-style: none;
    }
    blockquote, q {
        quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
        content: none;
    }
    h1, h2, h3 {
      color: var(--primary-color);
      font-family: var(--heading-font-family);
    }
    h2 {
      font-size: 1.5rem;
    }
    h1{
        font-size:1.8rem;
    }
`;
