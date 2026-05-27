// ============================================================
// Завдання 3 — Перемикач тем
// ============================================================
// Вимоги:
//   1. Toggle: додати/прибрати data-theme="dark" на <body>.
//   2. Текст кнопки: "🌙 Темна тема" ↔ "☀️ Світла тема".
//   3. Зберігати тему в localStorage.
//   4. При завантаженні відновлювати з localStorage.
//   5. Якщо localStorage порожній — взяти системну тему через
//      window.matchMedia('(prefers-color-scheme: dark)').
//   6. CSS transition додати в style (на body).
// ============================================================

// TODO

const themeTogBtn = document.getElementById("theme-toggle");

function doTheme(){
    const currentTheme = localStorage.getItem("theme");

    if(currentTheme === "dark"){
        document.body.setAttribute("data-theme", "dark");
        themeTogBtn.textContent = "☀️ Світла тема";
    }
    else{
         document.body.removeAttribute("data-theme");
        themeTogBtn.textContent = "🌙 Темна тема";
    }
}

function firstTheme(){
    const savedTheme = localStorage.getItem("theme");

    if(savedTheme){
        doTheme();
    }
    else{
        const dark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        localStorage.setItem("theme", dark? "dark":"light");
        doTheme();
    }
}

themeTogBtn.addEventListener("click", () => {
    const isCurrentDarkTheme = document.body.hasAttribute("data-theme");

    if(isCurrentDarkTheme){
        localStorage.setItem("theme", "light");
    }
    else{
        localStorage.setItem("theme", "dark");
    }

    doTheme();
});

firstTheme();