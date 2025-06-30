import { Link } from "react-router-dom";
import rigoImageUrl from "../assets/img/rigo-baby.jpg"; // asegúrate de que la ruta es correcta

export const CardNave = (props) => {
  return (
    <div className="card" style={{ width: "18rem" }}>
      <img src={rigoImageUrl} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">Nave: {props.name}</h5>
        <p className="card-text">Info nave.</p>
        <Link to={`/single/vehicles/${props.uid}`} className="btn btn-primary">
          Ver {props.uid}
        </Link>
      </div>
    </div>
  );
};