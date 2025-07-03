import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const CardCharacter = ({ name, uid }) => {
  const { actions } = useGlobalReducer();

  const handleFavorite = () => {
    actions.toggleFavorite({ name, uid, type: "people" });
  };

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
          color: "#999"
        }}
      >
        400 x 200
      </div>
      <div className="card-body">
        <h5 className="card-title">Name: {name}</h5>
        <p className="card-text">UID: {uid}</p>
        <Link to={`/single/people/${uid}`} className="btn btn-primary btn-sm">
          Learn more!
        </Link>
        <button
          onClick={handleFavorite}
          className="btn btn-outline-warning btn-sm float-end ms-2"
          title="Add to favorites"
        >
          ❤️
        </button>
      </div>
    </div>
  );
};