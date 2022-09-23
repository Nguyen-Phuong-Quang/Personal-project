import { Route, Routes, Link } from "react-router-dom";

import { useContext } from "react";
import { StoreContext, actions } from "./pages/store";

import "./App.css"
import Page1 from "./pages/info/Page1"
import Page2 from "./pages/point/Page2"
import Page3 from "./pages/contact/Page3";

function App() {
  const [state, dispatch] = useContext(StoreContext);

  const handleClearSearchResults = () => {
    dispatch(actions.searchInfo([]));
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Page1 />} />
        <Route path="/page_2" element={<Page2 />} />
        <Route path="/page_3" element={<Page3 />} />
      </Routes>

      <div className="paging">
        <nav>
          <ul>
            <li>
              <Link onClick={handleClearSearchResults} className="page_number" to="/">1</Link>
            </li>
            <li>
              <Link onClick={handleClearSearchResults} className="page_number" to="/page_2">2</Link>
            </li>
            <li>
              <Link onClick={handleClearSearchResults} className="page_number" to="/page_3">3</Link>
            </li>
          </ul>
        </nav>
      </div>
      
    </div>
  );
}

export default App;
