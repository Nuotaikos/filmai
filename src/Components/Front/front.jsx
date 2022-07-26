import axios from "axios";
import { useEffect, useState } from "react";
import { authConfig } from "../../Functions/auth";
import FrontContext from "./FrontContext";
import List from "./List";
import Nav from "./Nav";
import SortFilter from "./SortFilter";


function Front() {

  const [movies, setMovies] = useState(null);
  const [cats, setCats] = useState(null);
  const [filter, setFilter] = useState(0);

  const [cat, setCat] = useState(0);

  const [search, setSearch] = useState('');

  const doFilter = cid => {
    setCat(cid);
    setFilter(parseInt(cid));
  }

  // Read movies
  useEffect(() => {
    let query;
    if (filter === 0 && !search) {
      query = '';
    } else if (filter) {
      query = '?cat-id=' + filter
    } else if (search) {
      query = '?s=' + search
    }

    axios.get('http://localhost:3003/movies' + query, authConfig())
      .then(res => setMovies(res.data.map((p, i) => ({ ...p, row: i }))));
  }, [filter, search]);

  useEffect(() => {
    axios.get('http://localhost:3003/cats', authConfig())
      .then(res => setCats(res.data));
  }, []);

  return (
    <FrontContext.Provider value={{
      movies,
      setMovies,
      cats,
      setFilter,
      cat,
      setCat,
      doFilter,
      setSearch
    }}>
      <Nav />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <SortFilter />
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