import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <nav className="nav">
              <NavLink to="/admin/" className="nav-link" style={
                ({ isActive }) =>
                  isActive ? {
                    color: 'crimson'
                  } : null
              }>Admin</NavLink>
              <NavLink to="/admin/cats" className="nav-link" style={
                ({ isActive }) =>
                  isActive ? {
                    color: 'crimson'
                  } : null
              }>Categories</NavLink>
              <NavLink to="/admin/movies" className="nav-link" style={
                ({ isActive }) =>
                  isActive ? {
                    color: 'crimson'
                  } : null
              }>Movies</NavLink>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

export default Nav;