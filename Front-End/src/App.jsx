import React from "react";
import Header from "./components/Header";
import AllRoutes from "./Router/AllRoutes";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>

      <Header />
      <div> {/* Adjust margin based on your header height */}
        <AllRoutes />
      </div>
      <Footer />

    </>
  );
};
export default App;
