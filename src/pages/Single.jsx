import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Single = () => {
  const { store, actions } = useGlobalReducer();
  const { type, uid } = useParams();

  useEffect(() => {
    actions.getSingleItem(type, uid);
  }, [type, uid]);

  const item = store.singleItem;

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
          <div className="col-md-6">
            <img
              src={getImageUrl(type, uid)}
              alt={item.properties.name}
              className="img-fluid rounded"
              onError={(e) =>
                (e.target.src = "https://via.placeholder.com/800x600?text=800+x+600")
              }
            />
          </div>
          <div className="col-md-6">
            <h2>{item.properties.name}</h2>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo.
            </p>
            <table className="table table-bordered text-center mt-4">
              <thead className="table-light">
                <tr>
                  {Object.keys(item.properties).slice(0, 5).map((key, index) => (
                    <th key={index} className="text-danger">
                      {key.replace("_", " ")}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {Object.values(item.properties).slice(0, 5).map((val, index) => (
                    <td key={index}>{val}</td>
                  ))}
                </tr>
              </tbody>
            </table>
            <Link to="/" className="btn btn-outline-primary mt-3">
              Volver al inicio
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
