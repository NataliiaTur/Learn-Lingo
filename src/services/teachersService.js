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

export const fetchTeachers = async (page = 0) => {
  try {
    const teachersRef = ref(database, "teachers");

    // Отримуємо всіх викладачів
    const snapshot = await get(teachersRef);

    if (!snapshot.exists()) {
      return { teachers: [], hasMore: false };
    }

    const data = snapshot.val();

    let teachersArray;

    if (Array.isArray(data)) {
      // Якщо це масив, додаємо індекс як id
      teachersArray = data.map((teacher, index) => ({
        ...teacher,
        id: index.toString(),
      }));
    } else {
      // Якщо це об'єкт, використовуємо ключі як id
      teachersArray = Object.keys(data).map((key) => ({
        ...data[key],
        id: key,
      }));
    }

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

export const fetchAllTeachers = async () => {
  try {
    const teachersRef = ref(database, "teachers");
    const snapshot = await get(teachersRef);

    if (!snapshot.exists()) {
      return [];
    }

    const data = snapshot.val();

    let teachersArray;

    if (Array.isArray(data)) {
      // Якщо це масив, додаємо індекс як id
      teachersArray = data.map((teacher, index) => ({
        ...teacher,
        id: index.toString(),
      }));
    } else {
      // Якщо це об'єкт, використовуємо ключі як id
      teachersArray = Object.keys(data).map((key) => ({
        ...data[key],
        id: key,
      }));
    }

    return teachersArray;
  } catch (error) {
    console.error("Error fetching all teachers:", error);
    throw error;
  }
};
