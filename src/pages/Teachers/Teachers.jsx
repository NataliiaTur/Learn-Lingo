import { useState, useEffect } from "react";
import { fetchTeachers } from "@services/teachersService.js";
import TeacherCard from "@components/TeacherCard/TeacherCard.jsx";
import { Container } from "@components/Container/Container.jsx";
import css from "./Teachers.module.css";

function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Завантаження перших 4 карток при монтуванні
  useEffect(() => {
    loadTeachers(0);
  }, []);

  const loadTeachers = async (pageNumber) => {
    setLoading(true);
    setError(null);

    try {
      const result = await fetchTeachers(pageNumber);

      if (pageNumber === 0) {
        // Перша завантажка - замінюємо масив
        setTeachers(result.teachers);
      } else {
        // Наступні завантажки - додаємо до існуючих
        setTeachers((prev) => [...prev, ...result.teachers]);
      }

      setHasMore(result.hasMore);
      setPage(pageNumber);
    } catch (err) {
      setError("Failed to load teachers. Please try again.");
      console.error("Error loading teachers:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    loadTeachers(page + 1);
  };

  return (
    <section className={css.teachersSection}>
      <Container>
        <div className={css.teachersList}>
          {teachers.map((teacher, index) => (
            <TeacherCard key={teacher.id || index} teacher={teacher} />
          ))}
        </div>

        {error && <p className={csss.error}>{error}</p>}

        {loading && <p className={css.loading}>Loading...</p>}

        {hasMore && !loading && (
          <button onClick={handleLoadMore} className={css.loadMoreButton}>
            Load more
          </button>
        )}

        {!hasMore && teachers.length > 0 && (
          <p className={css.endMessage}>No more teachers to load</p>
        )}
      </Container>
    </section>
  );
}

export default Teachers;
