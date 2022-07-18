import axios from "axios";
import { useEffect, useState } from "react";
import { authConfig } from "../../Functions/auth";
import FrontContext from "./FrontContext";
import List from "./List";
import Nav from "./Nav";


function Front() {

  const [movies, setMovies] = useState(null);

  // Read movies
  useEffect(() => {
    axios.get('http://localhost:3003/movies', authConfig())
      .then(res => setMovies(res.data));
  }, []);

  return (
    <FrontContext.Provider value={{
      movies
    }}>
      <Nav />
      <div className="container">
        <div className="row">
          <div className="col-12">
          </div>
          <div className="col-12">
            <List />
          </div>
        </div>
      </div>
    </FrontContext.Provider>
  );
}

export default Front;