const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      people: [],
      planets: [],
      vehicles: [],
      favorites: [],
      singleItem: null,
    },
    actions: {
      getPeople: async () => {
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
              };
            })
          );
          setStore({ people: detailed });
        } catch (error) {
          console.error("Error loading people:", error);
        }
      },

      getPlanets: async () => {
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
              };
            })
          );
          setStore({ planets: detailed });
        } catch (error) {
          console.error("Error loading planets:", error);
        }
      },

      getVehicles: async () => {
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
              };
            })
          );
          setStore({ vehicles: detailed });
        } catch (error) {
          console.error("Error loading vehicles:", error);
        }
      },

      getSingleItem: async (type, uid) => {
        try {
          const res = await fetch(`https://www.swapi.tech/api/${type}/${uid}`);
          const data = await res.json();
          setStore({ singleItem: data.result });
        } catch (error) {
          console.error("Error loading single item:", error);
        }
      },

      toggleFavorite: (item) => {
        const store = getStore();
        const exists = store.favorites.some(
          (fav) => fav.uid === item.uid && fav.type === item.type
        );

        const updatedFavorites = exists
          ? store.favorites.filter(
              (fav) => fav.uid !== item.uid || fav.type !== item.type
            )
          : [...store.favorites, item];

        setStore({ favorites: updatedFavorites });
      },
    },
  };
};

export default getState;