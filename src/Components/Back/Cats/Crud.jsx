import Nav from "../Nav";
import Create from "./Create";

function Crud() {
  return (
    <>
      <Nav />
      <div className="container">
        <div className="row">
          <div className="col-4">
            <Create />
          </div>
          <div className="col-8">
          </div>
        </div>
      </div>
    </>
  );
}

export default Crud;