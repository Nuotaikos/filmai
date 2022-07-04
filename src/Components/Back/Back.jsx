import axios from 'axios';
import { useEffect, useState } from 'react';
import BackContext from './BackContext';
import CatsCrud from './Cats/Crud';
import MoviesCrud from './Movies/Crud';
import Nav from './Nav';
import { v4 as uuidv4 } from 'uuid';

function Back({ show }) {

  const [lastUpdate, setLastUpdate] = useState(Date.now());

  const [messages, setMessages] = useState([]); //masyvas tuscias, nes nezinome
  // const [messages, setMessages] = useState([ //taip parasyta, kad tureti vizuala. Veliau perkoduosim
  //   { id: 4444, text: 'valio', type: 'danger' },
  //   { id: 444, text: 'labas', type: 'info' },
  //   { id: 44, text: 'Visogero', type: 'success' },
  // ]);

  const [cats, setCats] = useState(null); //cats atiduodam provaideriui
  const [createCat, setCreateCat] = useState(null);
  const [deleteCat, setDeleteCat] = useState(null);
  const [editCat, setEditCat] = useState(null);
  const [modalCat, setModalCat] = useState(null);

  // Read
  useEffect(() => {
    axios.get('http://localhost:3003/admin/cats')
      .then(res => setCats(res.data));
  }, [lastUpdate]);


  // Create
  useEffect(() => {
    if (null === createCat) return;
    axios.post('http://localhost:3003/admin/cats', createCat) //metodas post. Supostinam, gaunam zinute, kurios kol kas nera 
      .then(res => {
        showMessage(res.data.msg);
        setLastUpdate(Date.now());
      })
      .catch(error => {
        showMessage({ text: error.message, type: 'danger' });
      })
  }, [createCat]);

  // Delete
  useEffect(() => {
    if (null === deleteCat) return;
    axios.delete('http://localhost:3003/admin/cats/' + deleteCat.id)
      .then(res => {
        showMessage(res.data.msg);
        setLastUpdate(Date.now());
      })
      .catch(error => {
        showMessage({ text: error.message, type: 'danger' });
      })
  }, [deleteCat]);

  const showMessage = (m) => {
    const id = uuidv4();
    m.id = id;
    setMessages(msg => [...msg, m]);
    setTimeout(() => {
      setMessages(mes => mes.filter(ms => ms.id !== id))
    }, 3000);
  }


  return (
    <BackContext.Provider value={{
      setCreateCat,
      cats,
      setDeleteCat,
      messages,
      setEditCat,
      setModalCat,
      modalCat
      // setCreateProduct
    }}>
      {
        show === 'admin' ?
          <>
            <Nav />
            <h1>BACK</h1>
          </>
          : show === 'cats' ? <CatsCrud /> :
            show === 'movies' ? <MoviesCrud /> : null
      }
    </BackContext.Provider>
  )
}

export default Back;