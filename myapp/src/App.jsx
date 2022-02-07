import { Navbar, Welcome, Footer, Transactions } from "./components";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Weapons from "./components/Weapons";

const App = () => (
  <Router>
    <div className="min-h-screen">
      <div className="gradient-bg-services">
        <Navbar />
        <Welcome />
      </div>
      <div className="gradient-bg-welcome">
        <Routes>
        <Route path="/transactions" element={<Transactions/>}/>
        {/* <Route path="/store" element={<Store/>}/> */}
        <Route path="/weapons" element={<Weapons/>}/>
        </Routes>
        {/* <Transactions /> */}
        <Footer />
      </div>
    </div>
  </Router>
);

export default App;
