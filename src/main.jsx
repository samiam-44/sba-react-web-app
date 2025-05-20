import { BrowserRouter } from "react-router-dom"; //enable client side routing (reroute by clicking on links)
import React from 'react'; //core React library needed for JSX to work
import ReactDOM from 'react-dom/client'; //Render app to DOM
import App from "./App"; //main component


//Mount App to the root element in index.html
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
