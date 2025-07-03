import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Single = () => {
  const { store, actions } = useGlobalReducer();
  const { type, uid } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    actions.getSingleItem(type, uid);
  }, [type, uid]);

  const item = store.singleItem?.properties;

  if (!item) return <p className="text-center my-5">Loading...</p>;

  return (
    <div className="container my-5">
      {/* Contenedor principal de imagen + descripción */}
      <div className="row mb-4 align-items-center">
        {/* Cuadro gris 800x600 */}
        <div className="col-md-6 text-center">
          <div
            style={{
              width: "100%",
              maxWidth: "600px",
              height: "400px",
              backgroundColor: "#ddd",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              color: "#777",
              margin: "0 auto",
            }}
          >
            800 x 600
          </div>
        </div>

        {/* Nombre + descripción */}
        <div className="col-md-6">
          <h2 className="mb-4">{item.name}</h2>
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
            inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
          </p>
        </div>
      </div>

      <hr />

      {/* Tabla de propiedades (primeros 6 campos) */}
      <div className="row text-danger fw-bold mb-2 text-center">
        {Object.keys(item).slice(0, 6).map((key) => (
          <div className="col" key={key}>
            {key.replace(/_/g, " ")}
          </div>
        ))}
      </div>
      <div className="row text-muted text-center">
        {Object.values(item).slice(0, 6).map((value, index) => (
          <div className="col" key={index}>
            {value}
          </div>
        ))}
      </div>

      <div className="text-center mt-5">
        <button className="btn btn-outline-primary" onClick={() => navigate("/")}>
          Volver al inicio
        </button>
      </div>
    </div>
  );
};
