import { createGlobalStyle } from "styled-components";
import { BACKGROUND, SECONDARY, PRIMARY } from "./constants";

export const GlobalStyles = createGlobalStyle`
    *{
        font-family: sans-serif;
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        color: ${SECONDARY};
    }

    h1 span{
        color: ${PRIMARY};
    }

    ul {
        list-style-type: none;

        li{
            margin-left: 10px;
        }
    }       

    a{
        text-decoration: none;
        color: black;
    }

    html{
        background: ${BACKGROUND};
    }

`;
