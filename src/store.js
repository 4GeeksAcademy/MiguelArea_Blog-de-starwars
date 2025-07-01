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
          console.log("🧠 People list:", data.results);

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

          console.log("✅ Detailed People:", detailed);
          setStore({ people: detailed });
        } catch (error) {
          console.error("❌ Error fetching people:", error);
        }
      },

      getPlanets: async () => {
        try {
          const res = await fetch("https://www.swapi.tech/api/planets");
          const data = await res.json();
          console.log("🪐 Planets list:", data.results);

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

          console.log("✅ Detailed Planets:", detailed);
          setStore({ planets: detailed });
        } catch (error) {
          console.error("❌ Error fetching planets:", error);
        }
      },

      getVehicles: async () => {
        try {
          const res = await fetch("https://www.swapi.tech/api/vehicles");
          const data = await res.json();
          console.log("🚀 Vehicles list:", data.results);

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

          console.log("✅ Detailed Vehicles:", detailed);
          setStore({ vehicles: detailed });
        } catch (error) {
          console.error("❌ Error fetching vehicles:", error);
        }
      },

      getSingleItem: async (type, uid) => {
        try {
          const res = await fetch(`https://www.swapi.tech/api/${type}/${uid}`);
          const data = await res.json();
          setStore({ singleItem: data.result });
        } catch (error) {
          console.error("❌ Error fetching single item:", error);
        }
      },

      addFavorite: (item) => {
        const store = getStore();
        const exists = store.favorites.some(
          (fav) => fav.uid === item.uid && fav.type === item.type
        );
        if (!exists) {
          setStore({ favorites: [...store.favorites, item] });
        }
      },

      removeFavorite: (uid, type) => {
        const store = getStore();
        setStore({
          favorites: store.favorites.filter(
            (fav) => fav.uid !== uid || fav.type !== type
          ),
        });
      },
    },
  };
};

export default getState;
