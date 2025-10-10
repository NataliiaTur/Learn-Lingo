import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/config";

// Реєстрація нового користувача
export const registerUser = async (email, password, name) => {
  try {
    // Створюємо користувача
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Оновлюємо профіль користувача (додаємо ім'я)
    await updateProfile(userCredential.user, {
      displayName: name,
    });

    return {
      user: {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: name,
      },
      error: null,
    };
  } catch (error) {
    return {
      user: null,
      error: getErrorMessage(error.code),
    };
  }
};

// Вхід існуючого користувача
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    return {
      user: {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
      },
      error: null,
    };
  } catch (error) {
    return {
      user: null,
      error: getErrorMessage(error.code),
    };
  }
};

// Вихід користувача
export const logoutUser = async () => {
  try {
    await logoutUser(auth);
    return { error: null };
  } catch (error) {
    return { error: getErrorMessage(error.code) };
  }
};

// Отримання поточного користувача
export const getCurrentUser = () => {
  return auth.currentUser;
};

// Підписка на зміни стану авторизації
export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      callback({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
      });
    } else {
      callback(null);
    }
  });
};

// Допоміжна функція для перетворення кодів помилок Firebase на зрозумілі повідомлення
const getErrorMessage = (errorCode) => {
  switch (errorCode) {
    case "auth/email-already-in-use":
      return "Ця електронна адреса вже використовується";
    case "auth/invalid-email":
      return "Некоректна електронна адреса";
    case "auth/operation-not-allowed":
      return "Операція не дозволена";
    case "auth/weak-password":
      return "Пароль занадто слабкий. Мінімум 6 символів";
    case "auth/user-disabled":
      return "Цей обліковий запис відключено";
    case "auth/user-not-found":
      return "Користувача не знайдено";
    case "auth/wrong-password":
      return "Невірний пароль";
    case "auth/invalid-credential":
      return "Невірний email або пароль";
    case "auth/too-many-requests":
      return "Занадто багато спроб. Спробуйте пізніше";
    default:
      return "Сталася помилка. Спробуйте ще раз";
  }
};
