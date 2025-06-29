const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            people: [],
            planets: [],
            vehicles: [],
            favorites: [],
            singleItem: null, // Para los detalles individuales
        },

        actions: {
            // Cargar personas
            getPeople: async () => {
                try {
                    const res = await fetch("https://www.swapi.tech/api/people");
                    const data = await res.json();
                    setStore({ people: data.results });
                } catch (error) {
                    console.error("Error cargando personas:", error);
                }
            },

            // Cargar planetas
            getPlanets: async () => {
                try {
                    const res = await fetch("https://www.swapi.tech/api/planets");
                    const data = await res.json();
                    setStore({ planets: data.results });
                } catch (error) {
                    console.error("Error cargando planetas:", error);
                }
            },

            // Cargar vehículos
            getVehicles: async () => {
                try {
                    const res = await fetch("https://www.swapi.tech/api/vehicles");
                    const data = await res.json();
                    setStore({ vehicles: data.results });
                } catch (error) {
                    console.error("Error cargando vehículos:", error);
                }
            },

            // Obtener detalles individuales (persona, planeta o vehículo)
            getSingleItem: async (type, uid) => {
                try {
                    const res = await fetch(`https://www.swapi.tech/api/${type}/${uid}`);
                    const data = await res.json();
                    setStore({ singleItem: data.result });
                } catch (error) {
                    console.error("Error cargando detalle:", error);
                }
            },

            // Agregar a favoritos
            addFavorite: (item) => {
                const store = getStore();
                const exists = store.favorites.some(
                    fav => fav.uid === item.uid && fav.type === item.type
                );
                if (!exists) {
                    setStore({ favorites: [...store.favorites, item] });
                }
            },

            // Quitar de favoritos
            removeFavorite: (uid, type) => {
                const store = getStore();
                const newFavorites = store.favorites.filter(
                    fav => fav.uid !== uid || fav.type !== type
                );
                setStore({ favorites: newFavorites });
            }
        }
    };
};

export default getState;
