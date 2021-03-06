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

  const [addCom, setAddCom] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(Date.now());

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
      // .then(res =>  setMovies(res.data.map((p, i) => ({ ...p, row: i }))));
      .then(res => {
        const movies = new Map();
        res.data.forEach(m => {
          let comment;
          if (null === m.com) {
            comment = null;
          } else {
            comment = { id: m.com_id, com: m.com };
          }
          if (movies.has(m.id)) {
            const mo = movies.get(m.id);
            if (comment) {
              mo.com.push(comment);
            }
          } else {
            movies.set(m.id, { ...m });
            const mo = movies.get(m.id);
            mo.com = [];
            delete mo.com_id;
            if (comment) {
              mo.com.push(comment);
            }
          }
        });
        console.log([...movies].map(e => e[1]));
        setMovies([...movies].map(e => e[1]).map((m, i) => ({ ...m, row: i })));
      })

  }, [filter, search, lastUpdate]);

  useEffect(() => {
    axios.get('http://localhost:3003/cats', authConfig())
      .then(res => setCats(res.data));
  }, []);

  useEffect(() => {
    if (null === addCom) return;
    axios.post('http://localhost:3003/comments', addCom, authConfig())
      .then(res => {
        setLastUpdate(Date.now());
      })
  }, [addCom]);

  return (
    <FrontContext.Provider value={{
      movies,
      setMovies,
      cats,
      setFilter,
      cat,
      setCat,
      doFilter,
      setSearch,
      setAddCom
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