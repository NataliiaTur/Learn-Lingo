import { database } from "./firebase/config";
import { ref, get } from "firebase/database";

async function testFirebase() {
  try {
    const teachersRef = ref(database, "teachers");
    const snapshot = await get(teachersRef);

    if (snapshot.exists()) {
      console.log("✅ Firebase працює!");
      console.log("Кількість викладачів:", Object.keys(snapshot.val()).length);
    } else {
      console.log("❌ Дані не знайдено");
    }
  } catch (error) {
    console.error("❌ Помилка:", error);
  }
}

testFirebase();
