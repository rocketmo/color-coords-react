import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app";
import "./index.scss";
import "../node_modules/react-resizable/css/styles.css";

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);
