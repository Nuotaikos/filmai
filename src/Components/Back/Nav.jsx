import { NavLink } from "react-router-dom";
import Messages from "./Messages";

function Nav() {
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <div class="collapse navbar-collapse" id="navbarColor02">
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
          </div>
        </div>
      </nav>
      <Messages />
    </>
  );
}

export default Nav;