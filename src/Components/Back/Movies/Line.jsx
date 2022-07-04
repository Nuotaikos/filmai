import { useContext } from 'react';
import BackContext from '../BackContext';

function Line({ line }) {

  const { setDeleteCat, setModalCat } = useContext(BackContext);

  const handleDelete = () => {
    setDeleteCat(line);
  }

  const handleEdit = () => {
    setModalCat(line);
  }

  return (
    <li className="list-group-item">
      <div className="item">
        <div className="content">
          <b>{line.title}</b>
          <b className="ml-4">
            {
              line.rate ? 'rate: ' + (line.rate / line.rates).toFixed(2) : '"No rates yet"'
            }
          </b>
          {/* <span>{['Documentary', 'Family', 'Animation', 'Drama', 'Horror']}</span> */}
        </div>
        <div className="buttons">
          <button type="button" className="btn btn-outline-success ml-2" onClick={handleEdit}>Edit</button>
          <button type="button" className="btn btn-outline-danger ml-2" onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </li>
  );
}

export default Line;