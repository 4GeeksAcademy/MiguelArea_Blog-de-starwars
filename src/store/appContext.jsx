import { createContext, useState, useContext } from "react";

export const Context = createContext(null);

export const StoreProvider = ({ children }) => {
  const [store, setStore] = useState({
    people: [],
    planets: [],
    vehicles: [],
    favorites: [],
    singleItem: null,
  });

  const getPeople = async () => {
    try {
      const res = await fetch("https://www.swapi.tech/api/people");
      const data = await res.json();
      const detailed = await Promise.all(
        data.results.map(async (p) => {
          const resDetail = await fetch(p.url);
          const detailData = await resDetail.json();
          return {
            ...detailData.result.properties,
            uid: p.uid,
            name: p.name,
            type: "people", // NECESARIO PARA FAVORITOS
          };
        })
      );
      setStore((prev) => ({ ...prev, people: detailed }));
    } catch (err) {
      console.error("Error loading people:", err);
    }
  };

  const getPlanets = async () => {
    try {
      const res = await fetch("https://www.swapi.tech/api/planets");
      const data = await res.json();
      const detailed = await Promise.all(
        data.results.map(async (p) => {
          const resDetail = await fetch(p.url);
          const detailData = await resDetail.json();
          return {
            ...detailData.result.properties,
            uid: p.uid,
            name: p.name,
            type: "planets",
          };
        })
      );
      setStore((prev) => ({ ...prev, planets: detailed }));
    } catch (err) {
      console.error("Error loading planets:", err);
    }
  };

  const getVehicles = async () => {
    try {
      const res = await fetch("https://www.swapi.tech/api/vehicles");
      const data = await res.json();
      const detailed = await Promise.all(
        data.results.map(async (p) => {
          const resDetail = await fetch(p.url);
          const detailData = await resDetail.json();
          return {
            ...detailData.result.properties,
            uid: p.uid,
            name: p.name,
            type: "vehicles",
          };
        })
      );
      setStore((prev) => ({ ...prev, vehicles: detailed }));
    } catch (err) {
      console.error("Error loading vehicles:", err);
    }
  };

  const getSingleItem = async (type, uid) => {
    try {
      const res = await fetch(`https://www.swapi.tech/api/${type}/${uid}`);
      const data = await res.json();
      setStore((prev) => ({ ...prev, singleItem: data.result }));
    } catch (err) {
      console.error("Error loading single item:", err);
    }
  };

  const toggleFavorite = (item) => {
    setStore((prev) => {
      const exists = prev.favorites.some(
        (fav) => fav.uid === item.uid && fav.type === item.type
      );
      const updated = exists
        ? prev.favorites.filter(
            (fav) => fav.uid !== item.uid || fav.type !== item.type
          )
        : [...prev.favorites, item];

      return { ...prev, favorites: updated };
    });
  };

  const removeFavorite = (item) => {
    setStore((prev) => ({
      ...prev,
      favorites: prev.favorites.filter(
        (fav) => fav.uid !== item.uid || fav.type !== item.type
      ),
    }));
  };

  const state = {
    store,
    actions: {
      getPeople,
      getPlanets,
      getVehicles,
      getSingleItem,
      toggleFavorite,
      removeFavorite,
    },
  };

  return <Context.Provider value={state}>{children}</Context.Provider>;
};

export default function useGlobalReducer() {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useGlobalReducer must be used inside a StoreProvider.");
  }
  return context;
}
