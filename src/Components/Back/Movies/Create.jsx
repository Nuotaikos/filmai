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
        <h2>Create new Movie</h2>
      </div>
      <div className="card-body">
        <div className="form-group">
          <label>Title</label>
          <input type="text" className="form-control" onChange={e => setTitle(e.target.value)} value={title} />
          <small className="form-text text-muted">Enter your Cat name here.</small>
        </div>
        <div className="form-group">
          <label>Price</label>
          <input type="text" className="form-control" onChange={e => setPrice(e.target.value)} value={price} />
          <small className="form-text text-muted">Enter price.</small>
        </div>
        <div className="col-4">
          <div className="form-group">
            <label>Movie rating</label>
            <input category="text" className="form-control" onChange={e => setRating(e, 'rating')} value={rating} />
            <small className="form-text text-muted">Movie rating.</small>
          </div>
        </div>
        <div className="form-group">
          <label>Categories</label>
          <select className="form-control" onChange={e => setCat(e.target.value)} value={cat}>
            <option value="0">Please, select your Category</option>
            {
              cats ? cats.map(c => <option key={c.id} value={c.id}>{c.title}</option>) : null
            }
          </select>
          <small className="form-text text-muted">Select category here.</small>
        </div>
        <button type="button" className="btn btn-outline-primary" onClick={handleCreate}>Create</button>
      </div>
    </div>
  );
}

export default Create;