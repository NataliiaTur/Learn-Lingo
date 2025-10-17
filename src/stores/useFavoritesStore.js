import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useFavoritesStore = create(
  persist(
    (set, get) => ({
      favorites: {},

      getFavorites: (userId) => {
        if (!userId) return [];
        return get().favorites[userId] || [];
      },

      checkIfFavorite: (userId, teacherId) => {
        if (!userId || !teacherId) return false;
        const userFavorites = get().favorites[userId] || [];
        return userFavorites.includes(teacherId);
      },

      addToFavorites: (userId, teacherId) => {
        if (!userId || !teacherId) return false;

        set((state) => {
          const userFavorites = state.favorites[userId] || [];

          if (userFavorites.includes(teacherId)) {
            return state; // Вже є
          }

          return {
            favorites: {
              ...state.favorites,
              [userId]: [...userFavorites, teacherId],
            },
          };
        });

        return true;
      },

      removeFromFavorites: (userId, teacherId) => {
        if (!userId || !teacherId) return false;

        set((state) => {
          const userFavorites = state.favorites[userId] || [];

          return {
            favorites: {
              ...state.favorites,
              [userId]: userFavorites.filter((id) => id !== teacherId),
            },
          };
        });

        return true;
      },

      getFavoriteTeachers: (userId, allTeachers) => {
        const favoriteIds = get().getFavorites(userId);
        return allTeachers.filter((teacher) =>
          favoriteIds.includes(teacher.id?.toString())
        );
      },
    }),
    {
      name: "learnlingo-favorites",
    }
  )
);
