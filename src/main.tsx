import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {ContextProvider} from "./context/ContextProvider";
import {RouterProvider} from "react-router-dom";
import router from "./router";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ContextProvider>
      <div className="App" id="root">
      <RouterProvider router={router} />
      </div>
    </ContextProvider>
  </React.StrictMode>,
)
