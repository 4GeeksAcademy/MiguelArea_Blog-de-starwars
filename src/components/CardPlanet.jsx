import { Link } from "react-router-dom";

export const CardPlanet = ({ name, uid }) => {
  return (
    <div className="card" style={{ width: "18rem" }}>
      <div
        style={{
          width: "100%",
          height: "200px",
          backgroundColor: "#e0e0e0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "1.5rem",
          color: "#999",
          fontFamily: "Arial, sans-serif"
        }}
      >
        400 x 200
      </div>
      <div className="card-body">
        <h5 className="card-title">Name: {name}</h5>
        <p className="card-text">UID: {uid}</p>
        <Link to={`/single/planets/${uid}`} className="btn btn-primary btn-sm">
          Learn more!
        </Link>
      </div>
    </div>
  );
};
