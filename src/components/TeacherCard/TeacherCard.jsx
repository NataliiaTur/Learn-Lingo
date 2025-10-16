import { useState } from "react";
import { useAuth } from "@context/AuthContext";
import { useFavoritesStore } from "../../stores/useFavoritesStore.js";
import TeacherInfo from "./TeacherInfo/TeacherInfo.jsx";
import AuthRequiredModal from "@components/AuthRequiredModal/AuthRequiredModal.jsx";
import css from "./TeacherCard.module.css";

function TeacherCard({ teacher, onFavoriteChange }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const { currentUser } = useAuth();

  const isFavorite = useFavoritesStore((state) => {
    if (!currentUser || !teacher.id) return false;
    const userFavorites = state.favorites[currentUser.uid] || [];
    return userFavorites.includes(teacher.id.toString());
  });

  const addToFavorites = useFavoritesStore((state) => state.addToFavorites);
  const removeFromFavorites = useFavoritesStore(
    (state) => state.removeFromFavorites
  );

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
      removeFromFavorites(currentUser.uid, teacherId);
    } else {
      addToFavorites(currentUser.uid, teacherId);
    }

    if (onFavoriteChange) {
      onFavoriteChange();
    }
  };

  const handleReadMore = () => {
    setIsExpanded(!isExpanded);
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

          {/* до розгортання */}
          {!isExpanded && teacher.levels && teacher.levels.length > 0 && (
            <div className={css.levels}>
              {teacher.levels.map((level, index) => (
                <span key={index} className={css.levelBadge}>
                  #{level}
                </span>
              ))}
            </div>
          )}

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

              <div className={css.wrapperButtonBookAndLess}>
                <button className={css.bookButton}>Book trial lesson</button>

                {/* Згортання */}
                <button onClick={handleReadMore} className={css.showLessButton}>
                  Show less
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <AuthRequiredModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </div>
  );
}

export default TeacherCard;
