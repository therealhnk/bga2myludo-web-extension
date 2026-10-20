import React from "react";
import ReactDOM from "react-dom/client";
import { isMobile } from "react-device-detect";
import PopupIndex from "./App";

// On Firefox Android the popup opens as a full tab: let the layout use the whole screen
if (isMobile) {
    document.documentElement.classList.add("mobile");
}

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <PopupIndex />
    </React.StrictMode>
);
