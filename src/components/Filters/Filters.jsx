import { useState } from "react";
import css from "./Filters.module.css";

const LANGUAGES = ["English", "French", "German", "Ukrainian", "Polish"];
const LEVELS = [
  "A1 Beginner",
  "A2 Elementary",
  "B1 Intermediate",
  "B2 Upper-Intermediate",
  "C1 Advanced",
  "C2 Proficient",
];
const PRICES = ["10", "20", "30", "40"];

function Filters({ onFilterChange }) {
  const [selectedLanguage, setSelectedLanguage] = useState("French");
  const [selectedLevel, setSelectedLevel] = useState("A1 Beginner");
  const [selectedPrice, setSelectedPrice] = useState("30");

  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isLevelOpen, setIsLevelOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(false);

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    setIsLanguageOpen(false);
    onFilterChange({ language, level: selectedLevel, price: selectedPrice });
  };

  const handleLevelSelect = (level) => {
    setSelectedLevel(level);
    setIsLevelOpen(false);
    onFilterChange({ language: selectedLanguage, level, price: selectedPrice });
  };

  const handlePriceSelect = (price) => {
    setSelectedPrice(price);
    setIsPriceOpen(false);
    onFilterChange({ language: selectedLanguage, level: selectedLevel, price });
  };

  return (
    <div className={css.filtersContainer}>
      {/* Language Filter */}
      <div className={css.filterBlock}>
        <label className={css.label}>Languages</label>
        <div className={css.dropdown}>
          <button
            className={css.dropdownButton}
            onClick={() => setIsLanguageOpen(!isLanguageOpen)}
          >
            <span>{selectedLanguage}</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              className={`${css.arrow} ${isLanguageOpen ? css.arrowOpen : ""}`}
            >
              <path
                d="M5 7.5L10 12.5L15 7.5"
                stroke="#121417"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {isLanguageOpen && (
            <ul className={css.dropdownMenu}>
              {LANGUAGES.map((language) => (
                <li
                  key={language}
                  className={`${css.dropdownItem} ${
                    language === selectedLanguage ? css.dropdownItemActive : ""
                  }`}
                  onClick={() => handleLanguageSelect(language)}
                >
                  {language}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Level Filter */}
      <div className={css.filterBlock}>
        <label className={css.label}>Level of knowledge</label>
        <div className={css.dropdown}>
          <button
            className={css.dropdownButton}
            onClick={() => setIsLevelOpen(!isLevelOpen)}
          >
            <span>{selectedLevel}</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              className={`${css.arrow} ${isLevelOpen ? css.arrowOpen : ""}`}
            >
              <path
                d="M5 7.5L10 12.5L15 7.5"
                stroke="#121417"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {isLevelOpen && (
            <ul className={css.dropdownMenu}>
              {LEVELS.map((level) => (
                <li
                  key={level}
                  className={`${css.dropdownItem} ${
                    level === selectedLevel ? css.dropdownItemActive : ""
                  }`}
                  onClick={() => handleLevelSelect(level)}
                >
                  {level}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Price Filter */}
      <div className={css.filterBlock}>
        <label className={css.label}>Price</label>
        <div className={css.dropdown}>
          <button
            className={css.dropdownButton}
            onClick={() => setIsPriceOpen(!isPriceOpen)}
          >
            <span>{selectedPrice} $</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              className={`${css.arrow} ${isPriceOpen ? css.arrowOpen : ""}`}
            >
              <path
                d="M5 7.5L10 12.5L15 7.5"
                stroke="#121417"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {isPriceOpen && (
            <ul className={css.dropdownMenu}>
              {PRICES.map((price) => (
                <li
                  key={price}
                  className={`${css.dropdownItem} ${
                    price === selectedPrice ? css.dropdownItemActive : ""
                  }`}
                  onClick={() => handlePriceSelect(price)}
                >
                  {price} $
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Filters;
