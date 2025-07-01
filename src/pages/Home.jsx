import { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { CardCharacter } from "../components/CardCharacter";
import { CardPlanet } from "../components/CardPlanet";
import { CardNave } from "../components/CardNave";

export const Home = () => {
  const { store, actions } = useGlobalReducer();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (store.people.length === 0) await actions.getPeople();
      if (store.planets.length === 0) await actions.getPlanets();
      if (store.vehicles.length === 0) await actions.getVehicles();
      setLoading(false);
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <h3 className="text-secondary">Cargando datos del universo...</h3>
      </div>
    );
  }

  return (
    <div className="container py-5">
      {/* Characters */}
      {store.people.length > 0 && (
        <>
          <h2 className="text-danger fw-bold mb-3">Characters</h2>
          <div className="scroll-row">
            {store.people.map((item) => (
              <CardCharacter key={item.uid} name={item.name} uid={item.uid} />
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
              <CardPlanet key={item.uid} name={item.name} uid={item.uid} />
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
