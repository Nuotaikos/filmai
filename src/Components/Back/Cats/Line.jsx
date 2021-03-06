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
          {/* <span>{['Documentary', 'Family', 'Animation', 'Drama', 'Horror']}</span> */}
        </div>
        <div className="buttons">
          <button type="button" className="btn btn-light ml-2" onClick={handleEdit}>Edit</button>
          <button type="button" className="btn btn-danger ml-2" onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </li>
  );
}

export default Line;