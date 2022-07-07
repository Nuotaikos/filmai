import { useEffect, useState, useContext, useRef } from "react";
import BackContext from "../BackContext";
import getBase64 from '../../../Functions/getBase64';

function Edit() {

  const { modalMovie, setEditMovie, setModalMovie, cats } = useContext(BackContext);


  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [rate, setRate] = useState('10')
  const [cat, setCat] = useState('0');
  const fileInput = useRef();
  const [photoPrint, setPhotoPrint] = useState(null);

  const doPhoto = () => {
    getBase64(fileInput.current.files[0])
      .then(photo => setPhotoPrint(photo))
      .catch(_ => {
        // tylim
      })
  }

  useEffect(() => {
    if (null === modalMovie) {
      return;
    }
    setTitle(modalMovie.title);
    setPrice(modalMovie.price);
    setRate(modalMovie.rate);
    setCat(cats.filter(c => c.title === modalMovie.cat)[0].id);
    setPhotoPrint(modalMovie.photo);
  }, [modalMovie, cats]);

  const handleEdit = () => {
    const data = {
      title,
      id: modalMovie.id,
      // in_stock: inStock ? 1 : 0,
      price: parseFloat(price),
      cat: parseInt(cat),
      // lu: lu,
      photo: photoPrint
    };
    setEditMovie(data);
    setModalMovie(null);
  }


  if (null === modalMovie) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Movie Changer</h5>
            <button type="button" className="close" onClick={() => setModalMovie(null)}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label>Title</label>
              <input type="text" className="form-control" onChange={e => setTitle(e.target.value)} value={title} />
              <small className="form-text text-muted">Enter movie title here.</small>
            </div>
            <div className="form-group">
              <label>Price</label>
              <input type="text" className="form-control" onChange={e => setPrice(e.target.value)} value={price} />
              <small className="form-text text-muted">Enter price.</small>
            </div>
            <div className="form-group mt-3">
              <label className="mr-2">Rate it!</label>
              <select value={rate}>
                {/* onChange={rateIt} */}
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
            <div className="form-group">
              <label>Photo</label>
              <input ref={fileInput} type="file" className="form-control" onChange={doPhoto} />
              <small className="form-text text-muted">Upload Photo.</small>
            </div>
            <div>
              {
                photoPrint ? <div className="photo-bin"><img src={photoPrint} alt="nice" /></div> : null
              }
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-outline-secondary" onClick={() => setModalMovie(null)}>Close</button>
            <button type="button" className="btn btn-outline-primary" onClick={handleEdit}>Save changes</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Edit;