import axios from 'axios';
import { useEffect, useState } from 'react';
import BackContext from './BackContext';
import CatsCrud from './Cats/Crud';
import MoviesCrud from './Movies/Crud';
import Nav from './Nav';

function Back({ show }) {

  const [lastUpdate, setLastUpdate] = useState(Date.now());

  const [createCat, setCreateCat] = useState(null);




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

  const showMessage = () => {

  }

  return (
    <BackContext.Provider value={{
      setCreateCat
      // cats,
      // setDeleteCat,
      // messages,
      // setEditCat,
      // setModalCat,
      // modalCat,
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