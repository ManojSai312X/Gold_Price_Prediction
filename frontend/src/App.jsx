import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../Pages/Home'; // Your home page component
import Calc from '../Pages/Calc'; // Your calculator/prediction component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calc" element={<Calc />} />
      </Routes>
    </Router>
  );
}

export default App;