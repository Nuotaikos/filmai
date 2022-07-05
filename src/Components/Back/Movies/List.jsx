import { useContext } from 'react';
import Line from './Line';
import BackContext from '../BackContext';

function List() {

  const { movies } = useContext(BackContext); //kategorijos is BackContext. Kategorijas paimam is serverio ir atiduodam i konteksta

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