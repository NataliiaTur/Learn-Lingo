import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useFavoritesStore = create(
  persist(
    (set, get) => ({
      // Стан: об'єкт з favorites для кожного користувача
      favorites: {},

      // Отримати favorites для користувача
      getFavorites: (userId) => {
        if (!userId) return [];
        return get().favorites[userId] || [];
      },

      // Перевірити чи є в favorites
      checkIfFavorite: (userId, teacherId) => {
        if (!userId || !teacherId) return false;
        const userFavorites = get().favorites[userId] || [];
        return userFavorites.includes(teacherId);
      },

      // Додати до favorites
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

      // Видалити з favorites
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

      // Отримати повні дані викладачів
      getFavoriteTeachers: (userId, allTeachers) => {
        const favoriteIds = get().getFavorites(userId);
        return allTeachers.filter((teacher) =>
          favoriteIds.includes(teacher.id?.toString())
        );
      },
    }),
    {
      name: "learnlingo-favorites", // ключ в localStorage
    }
  )
);
