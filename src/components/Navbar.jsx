import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const Navbar = () => {
  const { store, actions } = useGlobalReducer();

  const handleRemoveFavorite = (uid, type) => {
    actions.removeFavorite({ uid, type });
  };

  return (
    <nav className="navbar navbar-light bg-light mb-3">
      <div className="container d-flex justify-content-between">
        <Link to="/" className="navbar-brand">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Star_Wars_Logo.svg"
            alt="Star Wars"
            style={{ height: "40px" }}
          />
        </Link>

        <div className="dropdown">
          <button
            className="btn btn-primary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Favorites{" "}
            <span className="badge bg-secondary">{store.favorites.length}</span>
          </button>
          <ul className="dropdown-menu dropdown-menu-end">
            {store.favorites.length === 0 ? (
              <li className="dropdown-item text-muted">No favorites yet</li>
            ) : (
              store.favorites.map((fav, index) => (
                <li key={index} className="dropdown-item d-flex justify-content-between align-items-center">
                  <Link
                    to={`/single/${fav.type}/${fav.uid}`}
                    className="text-decoration-none me-2"
                  >
                    {fav.name}
                  </Link>
                  <button
                    className="btn btn-sm btn-outline-danger p-1"
                    onClick={() => handleRemoveFavorite(fav.uid, fav.type)}
                    title="Remove"
                  >
                    🗑️
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
