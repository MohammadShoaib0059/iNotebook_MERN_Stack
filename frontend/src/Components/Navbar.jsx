import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";


function NavScrollExample() {
  let location = useLocation();
  let navigate =useNavigate();
  const handleLogout =()=>{
    localStorage.removeItem("token")
    navigate("/login")
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">iNotebook</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname === "/" ? "active" :""}`} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname === "/about" ? "active" :""}`}  to="/about">About</Link>
        </li>
        {/* <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">Action</a></li>
            <li><a className="dropdown-item" href="#">Another action</a></li>
            <li><hr className="dropdown-divider"/></li>
            <li><a className="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
        <li className="nav-item">
          <a className="nav-link disabled" aria-disabled="true">Disabled</a>
        </li> */}
      </ul>
      <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
     {
      localStorage.getItem("token") ? <button onClick={handleLogout} className="btn btn-primary mx-2">Logout</button> :  <ul className="navbar-nav">
      <li className="nav-item">
          <Link className={`nav-link ${location.pathname === "/login" ? "active" :""}`}  to="/login">Login</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname === "/signup" ? "active" :""}`}  to="/signup">Signup</Link>
        </li>
      </ul>
     }
    </div>
  </div>
</nav>
  );
}

export default NavScrollExample;