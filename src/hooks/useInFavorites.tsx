import { useAppSelector } from "../hooks/reduxHooks";

export const useIsInFavorites = (parkingId: string) => {
  const favorites = useAppSelector((state) => state.favorites);
  return favorites.some((f) => f.id === parkingId);
};
