import css from "./TeacherInfo.module.css";

function TeacherInfo({ lessonsDone, rating, pricePerHour }) {
  return (
    <div className={css.infoBar}>
      <div className={css.infoItem}>
        <svg width="16" height="16" className={css.iconBook}>
          <use href="/icons.svg#icon-book"></use>
        </svg>
        <span className={css.infoText}>Lessons online</span>
      </div>

      <div className={css.separator}></div>

      <div className={css.infoItem}>
        <span className={css.infoText}>Lessons done: {lessonsDone}</span>
      </div>

      <div className={css.separator}></div>

      <div className={css.infoItem}>
        <svg
          width="16"
          height="16"
          className={css.iconStar}
          viewBox="0 0 16 16"
        >
          <use href="/icons.svg#icon-star-filled"></use>
        </svg>
        <span className={css.infoText}>Rating: {rating}</span>
      </div>

      <div className={css.separator}></div>

      <div className={css.infoItem}>
        <span className={css.infoText}>
          Price / 1 hour: <span className={css.price}>{pricePerHour}$</span>
        </span>
      </div>
    </div>
  );
}

export default TeacherInfo;
