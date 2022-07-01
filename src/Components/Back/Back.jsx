import CatsCrud from './Cats/Crud';
import MoviesCrud from './Movies/Crud';
import Nav from './Nav';

function Back({ show }) {


  if (show === "admin") {
    return (
      <>
        <Nav />
        <h1>BACK</h1>
      </>
    )
  }
  if (show === "cats") {
    return (
      <CatsCrud />
    )
  }
  if (show === "movies") {
    return (
      <MoviesCrud />
    )
  }
}

export default Back;