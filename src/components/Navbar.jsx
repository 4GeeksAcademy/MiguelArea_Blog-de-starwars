import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
  const { store, actions } = useGlobalReducer();

  return (
    <nav className="navbar navbar-dark bg-dark px-4">
      <div className="container-fluid d-flex justify-content-between">
        <Link to="/" className="navbar-brand">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Star_Wars_Logo.svg"
            alt="Star Wars"
            style={{ height: 40 }}
          />
        </Link>

        <div className="dropdown">
          <button
            className="btn btn-primary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
          >
            Favorites {store.favorites.length > 0 ? `(${store.favorites.length})` : ""}
          </button>
          <ul className="dropdown-menu dropdown-menu-end">
            {store.favorites.length === 0 ? (
              <li className="dropdown-item text-muted">Empty</li>
            ) : (
              store.favorites.map((fav, index) => (
                <li
                  key={index}
                  className="dropdown-item d-flex justify-content-between align-items-center"
                >
                  <Link to={`/single/${fav.type}/${fav.uid}`} className="text-decoration-none me-2">
                    {fav.name}
                  </Link>
                  <button
                    onClick={() => actions.removeFavorite(fav.uid, fav.type)}
                    className="btn btn-sm btn-danger"
                  >
                    <i className="fa fa-trash" />
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
