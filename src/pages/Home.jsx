import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Link } from "react-router-dom";

export const Home = () => {
  const { store, actions } = useGlobalReducer();

  useEffect(() => {
    actions.getPeople();
    actions.getPlanets();
    actions.getVehicles();
  }, []);

  const getImageUrl = (type, uid) => {
    const imgType = type === "people" ? "characters" : type;
    return `https://starwars-visualguide.com/assets/img/${imgType}/${uid}.jpg`;
  };

  const Card = ({ item, type }) => (
    <div className="card h-100 bg-dark text-light border-light shadow-sm">
      <img
        src={getImageUrl(type, item.uid)}
        className="card-img-top"
        alt={item.name}
        onError={(e) =>
          (e.target.src = "https://starwars-visualguide.com/assets/img/big-placeholder.jpg")
        }
      />
      <div className="card-body d-flex flex-column justify-content-between">
        <div>
          <h5 className="card-title">{item.name}</h5>
          {type === "people" && (
            <p className="card-text small">
              Gender: {item.gender || "n/a"}<br />
              Eye Color: {item.eye_color || "n/a"}<br />
              Birth Year: {item.birth_year || "n/a"}
            </p>
          )}
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <Link to={`/single/${type}/${item.uid}`} className="btn btn-outline-light btn-sm">
            Learn more!
          </Link>
          <button
            className="btn btn-outline-warning btn-sm"
            onClick={() =>
              actions.addFavorite({ uid: item.uid, name: item.name, type })
            }
          >
            <i className="fa fa-heart" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container py-5">
      {/* Characters */}
      <h2 className="text-warning mb-3">Characters</h2>
      <div className="row g-4">
        {store.people.map((item) => (
          <div key={item.uid} className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex">
            <Card item={item} type="people" />
          </div>
        ))}
      </div>

      {/* Planets */}
      <h2 className="text-warning mt-5 mb-3">Planets</h2>
      <div className="row g-4">
        {store.planets.map((item) => (
          <div key={item.uid} className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex">
            <Card item={item} type="planets" />
          </div>
        ))}
      </div>

      {/* Vehicles */}
      <h2 className="text-warning mt-5 mb-3">Vehicles</h2>
      <div className="row g-4">
        {store.vehicles.map((item) => (
          <div key={item.uid} className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex">
            <Card item={item} type="vehicles" />
          </div>
        ))}
      </div>
    </div>
  );
};
