import css from "./Home.module.css";
import React from "react";
import { Link } from "react-router-dom";
import blockImage from "@assets/images/block.webp";
import { Container } from "@components/Container/Container.jsx";

function Home() {
  return (
    <section className={css.homeSection}>
      <Container className={css.homeContainer}>
        <div className={css.homeDescWithImg}>
          <div className={css.homeBlockDesc}>
            <h1 className={css.homeTitle}>
              Unlock your potential with the best{" "}
              <span className={css.homeTitleWord}>language</span> tutors
            </h1>
            <p className={css.homeText}>
              Embark on an Exciting Language Journey with Expert Language
              Tutors: Elevate your language proficiency to new heights by
              connecting with highly qualified and experienced tutors.
            </p>
            <Link to="/teachers" className={css.homeButton}>
              Get started
            </Link>
          </div>
          <div className={css.homeBlockImg}>
            <img src={blockImage} alt="Woman with laptop" />
          </div>
        </div>

        <div className={css.homeListBorder}>
          <ul className={css.homeListBenefits}>
            <li className={css.homeElementOfListBenefits}>
              <p className={css.homeBenefitsNumber}>
                <span>32,000</span>
                <span>+</span>
              </p>
              <p className={css.homeBenefitsText}>Experienced tutors</p>
            </li>
            <li className={css.homeElementOfListBenefits}>
              <p className={css.homeBenefitsNumber}>
                <span>300,000</span>
                <span>+</span>
              </p>
              <p className={css.homeBenefitsText}>5-star tutor reviews</p>
            </li>
            <li className={css.homeElementOfListBenefits}>
              <p className={css.homeBenefitsNumber}>
                <span>120</span>
                <span>+</span>
              </p>
              <p className={css.homeBenefitsText}>Subjects taught</p>
            </li>
            <li className={css.homeElementOfListBenefits}>
              <p className={css.homeBenefitsNumber}>
                <span>200</span>
                <span>+</span>
              </p>
              <p className={css.homeBenefitsText}>Tutor nationalities</p>
            </li>
          </ul>
        </div>
      </Container>
    </section>
  );
}

export default Home;
