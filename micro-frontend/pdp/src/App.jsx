import React, { Suspense, useState } from "react";
import ReactDOM from "react-dom";

import "./index.scss";

const Header = React.lazy(() => import("home/Header"));
import Footer from "home/Footer";
import SafeComponent from "./SafeComponent";

const App = () => {
  const [header, setHeader] = useState(true);
  return (
    <div className="text-3xl mx-auto max-w-6xl">
      {header &&
        <SafeComponent>
          <Suspense fallback={<div>Loading...</div>}>
            <Header />
          </Suspense>
        </SafeComponent>
      }
      <button className="text-3xl p-5" onClick={() => setHeader(!header)}>Toggle Header</button>
      <div className="my-10"> Pdp page content </div>
      <Footer />
    </div>);
};
ReactDOM.render(<App />, document.getElementById("app"));
