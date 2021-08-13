import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        {/* logo */}
        <Link className="navbar-item" to="/destinos">
          <img
            src="https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo1.png"
            width="132"
            height="48"
            alt="logo"
          />
        </Link>
        {/* burger */}
        <button
          className={`navbar-burger has-background-light mt-2 mr-2 mb-2 ${
            isMenuOpen ? "is-active" : ""
          }`}
          style={{ borderRadius: "999px" }}
          aria-label="menu"
          aria-expanded={isMenuOpen}
          data-target="navbar"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </button>
      </div>
      {/* menu */}
      <div
        id="navbar"
        className={`navbar-menu ${isMenuOpen ? "is-active" : ""}`}
      >
        {/* logout button */}
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <button
                className="button is-info is-inverted is-rounded"
                onClick={logout}
              >
                <strong>{user.name} (Sair)</strong>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
