// ============================================================
// Завдання 4 — Валідатор паролів
// ============================================================

/**
 * Перевіряє пароль за 7 правилами:
 *
 * 1. Довжина >= 8 символів
 * 2. Хоча б одна велика літера (A-Z)
 * 3. Хоча б одна мала літера (a-z)
 * 4. Хоча б одна цифра (0-9)
 * 5. Хоча б один спецсимвол !@#$%^&*
 * 6. Без пробілів
 * 7. Не зі списку WEAK_PASSWORDS (case-insensitive)
 *
 * Повертає об'єкт:
 *   { valid: boolean, errors: string[] }
 *
 * Якщо порушено кілька правил — у errors мають бути ВСІ повідомлення.
 */

const WEAK_PASSWORDS = ["password", "12345678", "qwerty", "admin"];

function validatePassword(password) {
    const errors=[];
    if(password.length<8)
        errors.push("Довжина < 8");
    if(!/[A-Z]/.test(password))
        errors.push("Немає великих літер");
    if(!/[a-z]/.test(password))
        errors.push("Немає малих літер");
    if(!/[0-9]/.test(password))
        errors.push("Немає цифр");
    if(!/[!@#$%^&*]/.test(password))
        errors.push("Немає спецсимволів");
    if(/\s/.test(password))
        errors.push("Не повинен містити пробіли");

    const lowerPassword = password.toLowerCase();
    const weak = WEAK_PASSWORDS.includes(lowerPassword);
    if(weak)
        errors.push("Це слабкий пароль");

    return {
        valid: errors.length===0,errors
    };
}    