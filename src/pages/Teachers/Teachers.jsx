import { useState, useEffect } from "react";
import { fetchAllTeachers, filterTeachers } from "@services/teachersService.js";
import TeacherCard from "@components/TeacherCard/TeacherCard.jsx";
import Filters from "@components/Filters/Filters.jsx";
import { Container } from "@components/Container/Container.jsx";
import css from "./Teachers.module.css";

const ITEMS_PER_PAGE = 4;

function Teachers() {
  const [allTeachers, setAllTeachers] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [displayedTeachers, setDisplayedTeachers] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    language: "French",
    level: "A1 Beginner",
    price: "30",
  });

  // Завантаження всіх викладачів при монтуванні
  useEffect(() => {
    loadAllTeachers();
  }, []);

  // Застосування фільтрів при зміні
  useEffect(() => {
    if (allTeachers.length > 0) {
      applyFilters();
    }
  }, [filters, allTeachers]);

  const loadAllTeachers = async () => {
    setLoading(true);
    setError(null);

    try {
      const teachers = await fetchAllTeachers();
      setAllTeachers(teachers);
    } catch (err) {
      setError("Failed to load teachers. Please try again.");
      console.error("Error loading teachers:", err);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    const filtered = filterTeachers(allTeachers, filters);
    setFilteredTeachers(filtered);
    // Показуємо перші 4 картки після фільтрації
    setDisplayedTeachers(filtered.slice(0, ITEMS_PER_PAGE));
    setPage(0);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    const endIndex = (nextPage + 1) * ITEMS_PER_PAGE;
    // Додаємо наступні 4 картки до вже відображених
    setDisplayedTeachers(filteredTeachers.slice(0, endIndex));
    setPage(nextPage);
  };

  const hasMore = displayedTeachers.length < filteredTeachers.length;

  return (
    <section className={css.teachersSection}>
      <Container>
        <Filters onFilterChange={handleFilterChange} />

        <div className={css.teachersList}>
          {displayedTeachers.map((teacher, index) => (
            <TeacherCard key={teacher.id || index} teacher={teacher} />
          ))}
        </div>

        {error && <p className={css.error}>{error}</p>}

        {loading && <p className={css.loading}>Loading...</p>}

        {hasMore && !loading && (
          <button onClick={handleLoadMore} className={css.loadMoreButton}>
            Load more
          </button>
        )}

        {!hasMore && displayedTeachers.length > 0 && (
          <p className={css.endMessage}>No more teachers to load</p>
        )}

        {displayedTeachers.length === 0 && !loading && (
          <p className={css.emptyMessage}>
            No teachers found matching your criteria
          </p>
        )}
      </Container>
    </section>
  );
}

export default Teachers;
