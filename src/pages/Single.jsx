import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Single = () => {
  const { store, actions } = useGlobalReducer();
  const { type, uid } = useParams(); // 👈 capturamos ambos desde la URL

  useEffect(() => {
    actions.getSingleItem(type, uid);
  }, [type, uid]);

  const item = store.singleItem;

  // Construye URL para la imagen
  const getImageUrl = (type, uid) => {
    const imgType = type === "people" ? "characters" : type;
    return `https://starwars-visualguide.com/assets/img/${imgType}/${uid}.jpg`;
  };

  return (
    <div className="container mt-4">
      {!item ? (
        <p>Cargando detalles...</p>
      ) : (
        <div className="row">
          <div className="col-md-4">
            <img
              src={getImageUrl(type, uid)}
              alt={item.properties.name}
              className="img-fluid rounded"
              onError={(e) =>
                (e.target.src = "https://starwars-visualguide.com/assets/img/big-placeholder.jpg")
              }
            />
          </div>
          <div className="col-md-8">
            <h2>{item.properties.name}</h2>
            <ul className="list-group list-group-flush mt-3">
              {Object.entries(item.properties).map(([key, value], index) => (
                <li key={index} className="list-group-item">
                  <strong>{key.replace("_", " ")}:</strong> {value}
                </li>
              ))}
            </ul>
            <div className="mt-3">
              <Link to="/" className="btn btn-outline-primary">
                Volver al inicio
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
