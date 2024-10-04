import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./pages/Main";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="main">
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
