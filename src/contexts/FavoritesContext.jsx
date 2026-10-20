import {createContext, useContext, useState} from "react";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
    const [favorite, setFavorite] = useState([])

    const addFavorite = (book) => {
        setFavorite((prevFavorite) => [...prevFavorite, book]);
    }

    const removeFavorite = (book) => {
        setFavorite((prevFavorite) => prevFavorite.filter((item) => item.id !== book.id));
    }

    return (
        <FavoritesContext.Provider value={{ favorite, addFavorite, removeFavorite }}>
            {children}
        </FavoritesContext.Provider>
    )
}

export function useFavoritesContext(){
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavoritesContext must be used within a FavoritesProvider');
    }
    return context;
}