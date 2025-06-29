import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Demo = () => {
  const { store, dispatch } = useGlobalReducer();

  return (
    <div className="container mt-4">
      <h2>Tus favoritos guardados</h2>
      <ul className="list-group">
        {store.favorites.length === 0 ? (
          <li className="list-group-item">No hay favoritos aún.</li>
        ) : (
          store.favorites.map((item, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
              <Link to={`/single/${item.type}/${item.uid}`}>
                {item.name} ({item.type})
              </Link>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => dispatch({ type: "remove_favorite", payload: { uid: item.uid, type: item.type } })}
              >
                Eliminar
              </button>
            </li>
          ))
        )}
      </ul>

      <div className="mt-4">
        <Link to="/">
          <button className="btn btn-primary">Volver al inicio</button>
        </Link>
      </div>
    </div>
  );
};
