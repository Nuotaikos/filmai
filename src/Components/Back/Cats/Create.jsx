import { useContext, useState } from 'react';
import BackContext from '../BackContext';

function Create() {

  const { setCreateCat } = useContext(BackContext); //setCreateCat atiduodam  i provider Back.jsx

  const [title, setTitle] = useState('');

  const handleCreate = () => {
    const data = { title };
    setCreateCat(data); // paimam is const ir pasetinam
    setTitle(''); //nunulinam title
  }

  return (
    <div className="card mt-4">
      <div className="card-header">
        <h2>Create new Category</h2>
      </div>
      <div className="card-body">
        <div className="form-group">
          <label className="form-group mb-2">Movie category</label>
          {/* <input type="text" className="form-control" onChange={e => setTitle(e.target.value)} value={title} /> */}
          <select className="form-control" onChange={e => setTitle(e.target.value)} value={title}>
            <option value="0" >Please, select your Category</option>
            <option value="Documentary">Documentary</option>
            <option value="Family">Family</option>
            <option value="Animation">Animation</option>
            <option value="Drama">Drama</option>
            <option value="Horror">Horror</option>
          </select>
          {/* <small className="form-text text-muted">Select category here.</small> */}
        </div>
        <button type="button" className="btn btn-primary mt-3" onClick={handleCreate}>Create</button>
      </div>
    </div>
  );
}

export default Create;