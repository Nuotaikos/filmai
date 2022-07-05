import { useContext, useState } from 'react';
import BackContext from '../BackContext';

function Create() {

  const { cats, setCreateMovie, showMessage } = useContext(BackContext);

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [rate, setRate] = useState('10')
  const [cat, setCat] = useState('0');

  const handleCreate = () => {
    if (cat === '0') {
      showMessage({ text: 'Please select Category', type: 'danger' });
      return;
    }

    const data = { title, price: parseFloat(price), rate: parseFloat(rate), cat: parseInt(cat) };
    setCreateMovie(data); // paimam is const ir pasetinam
    setTitle(''); //nunulinam title
    setPrice('');
    setRate(false);
    setCat('0');
  }

  const rateIt = e => {
    setRate(e.target.value)
    // setRateNow({
    //   rate: parseInt(e.target.value),
    //   id: title.id
    // });
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
          <small className="form-text text-muted">Enter Movie name here.</small>
        </div>
        <div className="form-group">
          <label>Price</label>
          <input type="text" className="form-control" onChange={e => setPrice(e.target.value)} value={price} />
          <small className="form-text text-muted">Enter price.</small>
        </div>
        <div className="form-group mt-3">
          <label className="mr-2">Rate it!</label>
          <select value={rate} onChange={rateIt}>
            {
              [...Array(10)].map((_, i) => <option key={i} value={10 - i}>{10 - i}</option>)
            }
          </select>
        </div>
        <div className="form-group">
          <label>Categories</label>
          <select className="form-control" onChange={e => setCat(e.target.value)} value={cat}>
            <option value="0">Please, select your Category</option>
            {
              cats ? cats.map(c => <option key={c.id} value={c.id}>{c.title}</option>) : null
            }
          </select>
          {/* <small className="form-text text-muted">Select category here.</small> */}
        </div>
        <button type="button" className="btn btn-outline-primary" onClick={handleCreate}>Create</button>
      </div>
    </div>
  );
}

export default Create;