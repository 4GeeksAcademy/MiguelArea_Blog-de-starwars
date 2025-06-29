import { useContext, createContext } from "react";
import getState from "../store"; // este es tu store.js con getStore, setStore, etc.
import { useState, useEffect } from "react";

export const Context = createContext(null);

export const StoreProvider = ({ children }) => {
    const [state, setState] = useState(
        getState({
            getStore: () => state.store,
            getActions: () => state.actions,
            setStore: updatedStore =>
                setState({
                    store: { ...state.store, ...updatedStore },
                    actions: { ...state.actions }
                })
        })
    );

    return <Context.Provider value={state}>{children}</Context.Provider>;
};

export default function useGlobalReducer() {
    return useContext(Context);
}
