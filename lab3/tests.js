// ============================================================
// Тестові кейси
// ============================================================
 console.log(validatePassword("Abc1!def"));
// // { valid: true, errors: [] }
//
 console.log(validatePassword("abc"));
// // { valid: false, errors: ["Довжина < 8", "Немає великих літер", "Немає цифр", "Немає спецсимволів"] }
//
 console.log(validatePassword("PASSWORD123!"));
// // { valid: false, errors: ["Немає малих літер", "Це слабкий пароль"] }
//
 console.log(validatePassword("MyPass 1!"));
// // { valid: false, errors: ["Не повинен містити пробіли"] }
//
 console.log(validatePassword(""));
// // { valid: false, errors: ["Довжина < 8", "Немає великих літер", ...] }