import { useState } from "react";
import { useAuth } from "@context/AuthContext";
import { useFavoritesStore } from "../../stores/useFavoritesStore.js";
import TeacherInfo from "./TeacherInfo/TeacherInfo.jsx";
import css from "./TeacherCard.module.css";

function TeacherCard({ teacher, onFavoriteChange }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const { currentUser } = useAuth();

  const favorites = useFavoritesStore((state) => state.favorites);
  const addToFavorites = useFavoritesStore((state) => state.addToFavorites);
  const removeFromFavorites = useFavoritesStore(
    (state) => state.removeFromFavorites
  );

  const isFavorite =
    currentUser && teacher.id
      ? (favorites[currentUser.uid] || []).includes(teacher.id.toString())
      : false;

  const handleFavoriteClick = () => {
    if (!currentUser) {
      setShowAuthModal(true);
      return;
    }

    if (!teacher.id) {
      console.error("Teacher ID is missing", teacher);
      return;
    }

    const teacherId = teacher.id.toString();

    if (isFavorite) {
      console.log("Removing from favorites");
      removeFromFavorites(currentUser.uid, teacherId);
    } else {
      console.log("Adding to favorites");
      addToFavorites(currentUser.uid, teacherId);
    }

    // ⭐ Логування після зміни
    setTimeout(() => {
      const updatedFavorites = useFavoritesStore.getState().favorites;
      console.log("Updated favorites:", updatedFavorites);
    }, 100);

    if (onFavoriteChange) {
      onFavoriteChange();
    }
  };

  const handleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const closeAuthModal = () => {
    setShowAuthModal(false);
  };

  return (
    <div className={css.card}>
      <div className={css.cardHeader}>
        <div className={css.avatarWrapper}>
          <img
            src={teacher.avatar_url}
            alt={`${teacher.name} ${teacher.surname}`}
            className={css.avatar}
          />
        </div>

        <div className={css.cardContent}>
          <div className={css.topRow}>
            <p className={css.label}>Languages</p>
            <TeacherInfo
              lessonsDone={teacher.lessons_done}
              rating={teacher.rating}
              pricePerHour={teacher.price_per_hour}
            />

            <button
              onClick={handleFavoriteClick}
              className={css.favoriteButton}
              aria-label={
                isFavorite ? "Remove from favorites" : "Add to favorites"
              }
            >
              <svg
                width="26"
                height="26"
                className={css.heartIcon}
                style={{
                  fill: isFavorite ? "#f4c550" : "none",
                  stroke: isFavorite ? "#f4c550" : "#121417",
                }}
              >
                <use href="/icons.svg#icon-heart"></use>
              </svg>
            </button>
          </div>

          <h3 className={css.name}>
            {teacher.name} {teacher.surname}
          </h3>

          <ul className={css.infoList}>
            <li className={css.infoItem}>
              <span className={css.infoLabel}>Speaks:</span>
              <span className={css.infoValueSpeaks}>
                {teacher.languages.join(", ")}
              </span>
            </li>

            <li className={css.infoItem}>
              <span className={css.infoLabel}>Lesson Info:</span>
              <span className={css.infoValue}>{teacher.lesson_info}</span>
            </li>

            <li className={css.infoItem}>
              <span className={css.infoLabel}>Conditions:</span>
              <span className={css.infoValue}>
                {teacher.conditions?.join(" ") || "No conditions specified"}
              </span>
            </li>
          </ul>

          {!isExpanded && (
            <button onClick={handleReadMore} className={css.readMoreButton}>
              Read more
            </button>
          )}

          {isExpanded && (
            <div className={css.expandedContent}>
              <p className={css.experience}>{teacher.experience}</p>

              {teacher.reviews && teacher.reviews.length > 0 && (
                <div className={css.reviews}>
                  {teacher.reviews.map((review, index) => (
                    <div key={index} className={css.review}>
                      <div className={css.reviewHeader}>
                        <div className={css.reviewerAvatar}>
                          {review.reviewer_name[0]}
                        </div>
                        <div>
                          <p className={css.reviewerName}>
                            {review.reviewer_name}
                          </p>
                          <div className={css.reviewRating}>
                            <svg
                              width="16"
                              height="16"
                              className={css.starIcon}
                            >
                              <use href="/icons.svg#icon-star-filled"></use>
                            </svg>
                            {review.reviewer_rating}.0
                          </div>
                        </div>
                      </div>
                      <p className={css.reviewComment}>{review.comment}</p>
                    </div>
                  ))}
                </div>
              )}

              {teacher.levels && teacher.levels.length > 0 && (
                <div className={css.levels}>
                  {teacher.levels.map((level, index) => (
                    <span key={index} className={css.levelBadge}>
                      #{level}
                    </span>
                  ))}
                </div>
              )}

              <button className={css.bookButton}>Book trial lesson</button>
            </div>
          )}
        </div>
      </div>

      {showAuthModal && (
        <div className={css.authModalBackdrop} onClick={closeAuthModal}>
          <div className={css.authModal} onClick={(e) => e.stopPropagation()}>
            <button className={css.authModalClose} onClick={closeAuthModal}>
              ×
            </button>
            <h3 className={css.authModalTitle}>Authentication required</h3>
            <p className={css.authModalText}>
              Please log in or register to add teachers to your favorites.
            </p>
            <button className={css.authModalButton} onClick={closeAuthModal}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TeacherCard;
