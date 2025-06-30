import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Link } from "react-router-dom";
import { CardNave } from "../components/CardNave";

export const Home = () => {
  const { store, actions } = useGlobalReducer();

  useEffect(() => {
    if (store.people.length === 0) actions.getPeople();
    if (store.planets.length === 0) actions.getPlanets();
    if (store.vehicles.length === 0) actions.getVehicles();
  }, []);

  const Card = ({ item, type }) => {
    const isFavorite = store.favorites.some(
      (fav) => fav.uid === item.uid && fav.type === type
    );

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
          <h5 className="card-title">{item.name}</h5>

          <div className="d-flex justify-content-between align-items-center mt-3">
            <Link
              to={`/single/${type}/${item.uid}`}
              className="btn btn-primary btn-sm"
            >
              Learn more!
            </Link>
            <button
              className={`btn btn-sm ${isFavorite ? "btn-danger" : "btn-warning"}`}
              onClick={() => {
                if (isFavorite) {
                  actions.removeFavorite(item.uid, type);
                } else {
                  actions.addFavorite({
                    uid: item.uid,
                    name: item.name,
                    type,
                  });
                }
              }}
            >
              <i className={`fa ${isFavorite ? "fa-trash" : "fa-heart"}`} />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container py-5">
      {/* Characters */}
      {store.people.length > 0 && (
        <>
          <h2 className="text-danger fw-bold mb-3">Characters</h2>
          <div className="scroll-row">
            {store.people.map((item) => (
              <Card key={item.uid} item={item} type="people" />
            ))}
          </div>
        </>
      )}

      {/* Planets */}
      {store.planets.length > 0 && (
        <>
          <h2 className="text-danger fw-bold mt-5 mb-3">Planets</h2>
          <div className="scroll-row">
            {store.planets.map((item) => (
              <Card key={item.uid} item={item} type="planets" />
            ))}
          </div>
        </>
      )}

      {/* Vehicles */}
      {store.vehicles.length > 0 && (
        <>
          <h2 className="text-danger fw-bold mt-5 mb-3">Vehicles</h2>
          <div className="scroll-row">
            {store.vehicles.map((item) => (
              <CardNave key={item.uid} name={item.name} uid={item.uid} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
