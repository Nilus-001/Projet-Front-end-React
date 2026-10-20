import {createContext, useState} from "react";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
    const [favorite, setFavorite] = useState([])

    const addFavorite = (book) => {
        setFavorite((prevFavorite) => [...prevFavorite, book]);
    }

}