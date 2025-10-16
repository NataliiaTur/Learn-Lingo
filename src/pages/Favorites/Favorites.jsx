import { useState, useEffect } from "react";
import { useAuth } from "@context/AuthContext";
import { useFavoritesStore } from "../../stores/useFavoritesStore.js";
import { fetchAllTeachers } from "@services/teachersService.js";
import TeacherCard from "@components/TeacherCard/TeacherCard.jsx";
import { Container } from "@components/Container/Container.jsx";
import css from "./Favorites.module.css";

const ITEMS_PER_PAGE = 4;

function Favorites() {
  const { currentUser } = useAuth();
  const [favoriteTeachers, setFavoriteTeachers] = useState([]);
  const [displayedTeachers, setDisplayedTeachers] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getFavoriteTeachers = useFavoritesStore(
    (state) => state.getFavoriteTeachers
  );

  useEffect(() => {
    loadFavorites();
  }, [currentUser]);

  const loadFavorites = async () => {
    if (!currentUser) {
      setFavoriteTeachers([]);
      setDisplayedTeachers([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const allTeachers = await fetchAllTeachers();
      const favorites = getFavoriteTeachers(currentUser.uid, allTeachers);
      setFavoriteTeachers(favorites);

      // Показуємо перші 4 картки
      setDisplayedTeachers(favorites.slice(0, ITEMS_PER_PAGE));
      setPage(0);
    } catch (err) {
      setError("Failed to load favorites. Please try again.");
      console.error("Error loading favorites:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFavoriteChange = () => {
    loadFavorites();
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    const startIndex = 0;
    const endIndex = (nextPage + 1) * ITEMS_PER_PAGE;

    setDisplayedTeachers(favoriteTeachers.slice(startIndex, endIndex));
    setPage(nextPage);
  };

  const hasMore = displayedTeachers.length < favoriteTeachers.length;

  if (loading) {
    return (
      <section className={css.favoritesSection}>
        <Container>
          <p className={css.loading}>Loading your favorites...</p>
        </Container>
      </section>
    );
  }

  if (error) {
    return (
      <section className={css.favoritesSection}>
        <Container>
          <p className={css.error}>{error}</p>
        </Container>
      </section>
    );
  }

  return (
    <section className={css.favoritesSection}>
      <Container>
        <h2 className={css.title}>My Favorite Teachers</h2>

        {favoriteTeachers.length === 0 ? (
          <div className={css.emptyState}>
            <p className={css.emptyText}>
              You haven't added any teachers to your favorites yet.
            </p>
            <a href="/teachers" className={css.browseButton}>
              Browse Teachers
            </a>
          </div>
        ) : (
          <>
            <div className={css.teachersList}>
              {displayedTeachers.map((teacher, index) => (
                <TeacherCard
                  key={teacher.id || index}
                  teacher={teacher}
                  onFavoriteChange={handleFavoriteChange}
                />
              ))}
            </div>

            {hasMore && (
              <button onClick={handleLoadMore} className={css.loadMoreButton}>
                Load more
              </button>
            )}

            {!hasMore && favoriteTeachers.length > ITEMS_PER_PAGE && (
              <p className={css.endMessage}>No more teachers to load</p>
            )}
          </>
        )}
      </Container>
    </section>
  );
}

export default Favorites;
