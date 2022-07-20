import { useContext, useState } from 'react';
import FrontContext from './FrontContext';

function SortFilter() {

  const [sortBy, setSortBy] = useState('default');
  const { movies, setMovies, cats, doFilter, cat } = useContext(FrontContext);


  const doSort = e => {
    setSortBy(e.target.value);
    const p = [...movies]
    switch (e.target.value) {
      case 'ascTitle':
        p.sort((a, b) => {
          if (a.title > b.title) return 1;
          if (a.title < b.title) return -1;
          return 0;
        });
        break;
      case 'descTitle':
        p.sort((a, b) => {
          if (a.title > b.title) return -1;
          if (a.title < b.title) return 1;
          return 0;
        });
        break;
      case 'ascPrice':
        p.sort((a, b) => a.price - b.price);
        break;
      case 'descPrice':
        p.sort((a, b) => b.price - a.price);
        break;
      default:
        p.sort((a, b) => a.row - b.row);
    }
    setMovies(p);
  }

  return (
    <div className="card mt-4">
      <div className="card-header">
        <h2>Sort and Filter</h2>
      </div>
      <div className="card-body">
        <div className="container">
          <div className="row">
            <div className="col-4">
              <div className="form-group">
                <label>Sort By</label>
                <select className="form-control" value={sortBy} onChange={doSort}>
                  <option value="default">Default Sort</option>
                  <option value="ascTitle">Title A-Z</option>
                  <option value="descTitle">Title Z-A</option>
                  <option value="ascPrice">Price min-max</option>
                  <option value="descPrice">Price max-min</option>
                </select>
              </div>
            </div>
            <div className="col-4">
              <div className="form-group">
                <label>Filter by Categories</label>
                <select className="form-control" onChange={e => doFilter(e.target.value)} value={cat}>
                  <option value="0">All Categories</option>
                  {
                    cats ? cats.map(c => <option key={c.id} value={c.id}>{c.title}</option>) : null
                  }
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SortFilter;