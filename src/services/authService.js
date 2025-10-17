import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/config";

export const registerUser = async (email, password, name) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

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

export const logoutUser = async () => {
  try {
    await signOut(auth);
    console.log("✅ Logout successful");
    return { error: null };
  } catch (error) {
    console.error("❌ Logout error:", error);
    return { error: getErrorMessage(error.code) };
  }
};

export const getCurrentUser = () => {
  return auth.currentUser;
};

export const onAuthChange = (callback) => {
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
