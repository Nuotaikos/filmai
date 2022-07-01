import CatsCrud from './Cats/Crud';
import MoviesCrud from './Movies/Crud';

function Back({ show }) {


  if (show === "admin") {
    return (
      <h1>BACK</h1>
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