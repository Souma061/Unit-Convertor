import Header from "./components/common/Header.jsx";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import ConverterDetail from "./pages/ConverterDetail.jsx";

function App() {
  return (
    <>
      {/* <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/converter/:id" element={<ConverterDetail />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes> */}


      <div className="bg-amber-400">hi</div>
    </>
  );
}

export default App;
