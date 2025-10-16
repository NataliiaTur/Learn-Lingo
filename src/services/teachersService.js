import {
  ref,
  get,
  query,
  orderByKey,
  limitToFirst,
  startAt,
} from "firebase/database";
import { database } from "../firebase/config.js";

// Кількість карток на одну сторінку
const ITEMS_PER_PAGE = 4;

/**
 * Отримати викладачів з пагінацією
 * @param {number} page - номер сторінки (починається з 0)
 * @returns {Promise<{teachers: Array, hasMore: boolean}>}
 */
export const fetchTeachers = async (page = 0) => {
  try {
    const teachersRef = ref(database, "teachers");

    // Отримуємо всіх викладачів
    const snapshot = await get(teachersRef);

    if (!snapshot.exists()) {
      return { teachers: [], hasMore: false };
    }

    const data = snapshot.val();

    // Перетворюємо об'єкт на масив
    const teachersArray = Array.isArray(data)
      ? data
      : Object.keys(data).map((key) => ({ id: key, ...data[key] }));

    // Пагінація
    const startIndex = page * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedTeachers = teachersArray.slice(startIndex, endIndex);
    const hasMore = endIndex < teachersArray.length;

    return {
      teachers: paginatedTeachers,
      hasMore,
      total: teachersArray.length,
    };
  } catch (error) {
    console.error("Error fetching teachers:", error);
    throw error;
  }
};

/**
 * Отримати викладача за ID
 * @param {string} teacherId - ID викладача
 * @returns {Promise<Object|null>}
 */
export const getTeacherById = async (teacherId) => {
  try {
    const teacherRef = ref(database, `teachers/${teacherId}`);
    const snapshot = await get(teacherRef);

    if (snapshot.exists()) {
      return { id: teacherId, ...snapshot.val() };
    }

    return null;
  } catch (error) {
    console.error("Error fetching teacher by ID:", error);
    throw error;
  }
};

/**
 * Отримати всіх викладачів (для фільтрації)
 * @returns {Promise<Array>}
 */
export const fetchAllTeachers = async () => {
  try {
    const teachersRef = ref(database, "teachers");
    const snapshot = await get(teachersRef);

    if (!snapshot.exists()) {
      return [];
    }

    const data = snapshot.val();
    const teachersArray = Array.isArray(data)
      ? data
      : Object.keys(data).map((key) => ({ id: key, ...data[key] }));

    return teachersArray;
  } catch (error) {
    console.error("Error fetching all teachers:", error);
    throw error;
  }
};
