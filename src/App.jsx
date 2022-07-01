import './App.scss';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Front from './Components/Front/front';
import Back from './Components/Back/Back';



function App() {

  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Front />} />
        <Route path="/admin" element={<Back show="admin" />} />
        <Route path="/admin/cats" element={<Back show="cats" />} />
        <Route path="/admin/movies" element={<Back show="movies" />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App;
