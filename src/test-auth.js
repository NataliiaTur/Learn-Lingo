import {
  getCurrentUser,
  loginUser,
  registerUser,
} from "./services/authService.js";

// Тест реєстрації
async function testRegister() {
  console.log("🧪 Тест реєстрації...");
  const result = await registerUser(
    "test@example.com",
    "password123",
    "Test User"
  );
  if (result.error) {
    console.error("❌ Помилка реєстрації:", result.error);
  } else {
    console.log("✅ Реєстрація успішна:", result.user);
  }
}

// Тест входу
async function testLogin() {
  console.log("🧪 Тест входу...");
  const result = await loginUser("test@example.com", "password123");

  if (result.error) {
    console.error("❌ Помилка входу:", result.error);
  } else {
    console.log("✅ Вхід успішний:", result.user);
  }
}

// Тест отримання поточного користувача
function testGetCurrentUser() {
  console.log("🧪 Тест getCurrentUser...");
  const user = getCurrentUser();

  if (user) {
    console.log("Поточний користувач ", {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
    });
  } else {
    console.log("Користувач не авторизований");
  }
}

// Запуск тестів послідовно
async function runTests() {
  await testRegister();

  setTimeout(async () => {
    testGetCurrentUser();

    setTimeout(async () => {
      await testLogin();

      setTimeout(() => {
        testGetCurrentUser();
      }, 1000);
    }, 1000);
  }, 1000);
}

runTests();
