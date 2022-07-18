import { useContext } from 'react';
import Line from './Line';
import FrontContext from './FrontContext';

function List() {

  const { movies } = useContext(FrontContext); //kategorijos is FrontContext. Kategorijas paimam is serverio ir atiduodam i konteksta

  return (
    <div className="card mt-4">
      <div className="card-header">
        <h2>List of movies</h2>
      </div>
      <div className="card-body">
        <ul className="list-group">
          {
            movies ? movies.map(movie => <Line key={movie.id} line={movie}></Line>) : null
          }
        </ul>
      </div>
    </div>
  );
}

export default List;