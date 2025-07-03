import useGlobalReducer from "../hooks/useGlobalReducer";
import { CardCharacter } from "../components/CardCharacter";
import { CardPlanet } from "../components/CardPlanet";
import { CardNave } from "../components/CardNave";

export default function Home() {
  const { store } = useGlobalReducer();

  return (
    <div className="container">
      <h2>Personajes</h2>
      <div className="d-flex overflow-auto gap-3 mb-4">
        {store.people?.map((p) => (
          <CardCharacter key={p.uid} name={p.name} uid={p.uid} />
        ))}
      </div>

      <h2>Planetas</h2>
      <div className="d-flex overflow-auto gap-3 mb-4">
        {store.planets?.map((p) => (
          <CardPlanet key={p.uid} name={p.name} uid={p.uid} />
        ))}
      </div>

      <h2>Vehículos</h2>
      <div className="d-flex overflow-auto gap-3 mb-4">
        {store.vehicles?.map((v) => (
          <CardNave key={v.uid} name={v.name} uid={v.uid} />
        ))}
      </div>
    </div>
  );
}
