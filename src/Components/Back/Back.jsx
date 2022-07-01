import { useState } from 'react';
import BackContext from './BackContext';
import CatsCrud from './Cats/Crud';
import MoviesCrud from './Movies/Crud';
import Nav from './Nav';

function Back({ show }) {

  const [createCat, setCreateCat] = useState(null);

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
            show === 'products' ? <MoviesCrud /> : null
      }
    </BackContext.Provider>
  )
}

export default Back;