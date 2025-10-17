import css from "./Loading.module.css";

function Loading() {
  return (
    <div className={css.loadingContainer}>
      <div className={css.spinner}></div>
      <p className={css.loadingText}>Loading...</p>
    </div>
  );
}

export default Loading;
