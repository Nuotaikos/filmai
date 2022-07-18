import { Link, NavLink } from "react-router-dom";
function Nav() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarColor02">
            WElcom
          </div>
        </div>
      </nav>
      {/* ............ */}
      {/* <div className="container header">
        <div className="row">
          <div className="col-12">
            <nav className="nav">
              <NavLink to="/admin/" className="nav-link" style={
                ({ isActive }) =>
                  isActive ? {
                    color: 'crimson'
                  } : null
              }>Admin</NavLink>

              <Link to="/logout">Logout</Link>
            </nav>
          </div>
        </div>
      </div> */}
      {/* ....................... */}
      {/* <>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <nav className="nav">
                Willkommen. Ja ja das ist gut.
              </nav>
            </div>
          </div>
        </div>
      </> */}
      {/* ....................... */}
      {/* <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Navbar</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <a className="nav-link active" href="#">Home
                  <span className="visually-hidden">(current)</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Features</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Pricing</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">About</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Dropdown</a>
                <div className="dropdown-menu">
                  <a className="dropdown-item" href="#">Action</a>
                  <a className="dropdown-item" href="#">Another action</a>
                  <a className="dropdown-item" href="#">Something else here</a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="#">Separated link</a>
                </div>
              </li>
            </ul>
            <form className="d-flex" wtx-context="A1B68B78-B624-4E74-960B-C6B50697F508">
              <input className="form-control me-sm-2" type="text" placeholder="Search" wtx-context="FF7646AE-9E9A-4892-8237-8A76DE916326" />
              <button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav> */}
    </>
  );
}

export default Nav;