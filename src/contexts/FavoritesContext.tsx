// Naast uw parking een knopke hebt met een favorites icoontje

import { createContext, PropsWithChildren, useState } from "react";

interface FavoritesContextType {
  favorites: Parking[];
  toggleFavorite: (parking: Parking) => void;
  isInFavorites: (id: string) => boolean;
}

export const FavoritesContext = createContext<FavoritesContextType | null>(
  null,
);

const FavoritesProvider = (props: PropsWithChildren) => {
  const [favorites, setFavorites] = useState<Parking[]>([]);

  const toggleFavorite = (parking: Parking) => {
    if (favorites.some((f) => f.id === parking.id)) {
      setFavorites(favorites.filter((f) => f.id !== parking.id));
    } else {
      setFavorites([...favorites, parking]);
    }
  };

  const isInFavorites = (id: string) => {
    return favorites.some((f) => f.id === id);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isInFavorites,
      }}>
      {props.children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesProvider;
