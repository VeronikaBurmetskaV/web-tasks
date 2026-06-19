//створюємо масив
//0-порожня клітинка
const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];
//змінні
let gameState = [],  //масив
    steps = 0,  //кроки
    pivotTable = null;  //об'єкт
//запуск
function initGame() {
    steps = 0;
    document.getElementById("steps-count").innerText = steps; //кроки
    document.getElementById("win-message").classList.add("hidden");  //перемога
//копія масиву для перемішування
    let numbers = [...NUMBERS];
    
    let emptyCell = 15; //0
    for (let i = 0; i < 100; i++) {
        let validSteps = [];
        if (emptyCell % 4 > 0) validSteps.push(emptyCell - 1);// ліво
        if (emptyCell % 4 < 3) validSteps.push(emptyCell + 1);// право
        if (emptyCell > 3) validSteps.push(emptyCell - 4);    // вверх
        if (emptyCell < 12) validSteps.push(emptyCell + 4);   // вниз
      
        let randomStep = validSteps[Math.floor(Math.random() * validSteps.length)];
//зміна 0 та сусідньої клітинки
        [numbers[emptyCell], numbers[randomStep]] = [numbers[randomStep], numbers[emptyCell]];
        emptyCell = randomStep;
    }
//перетворення
    gameState = numbers.map((num, i) => ({
        "Рядок": `Рядок ${Math.floor(i / 4) + 1}`,
        "Стовпець": `Стовпець ${(i % 4) + 1}`,
        "Число": num,
        index: i 
    }));
//створення
    const config = {
        dataSource: 
        { data: gameState },
        slice: {
            rows: [
                { uniqueName: "Рядок", sort: "none" }],
            columns: [
                { uniqueName: "Стовпець", sort: "none" }],
            measures: [
                { uniqueName: "Число", aggregation: "none" }]
        },
        options: 
        { grid: 
            { showTotals: "none", showGrandTotals: "none", showEmptyValues: true } }
    };
//нова гра
    //нова
    if (pivotTable) {
        pivotTable.setReport(config);
    } 
    //перша
    else {
        pivotTable = new WebDataRocks({
            container: "#pivotContainer",
            toolbar: true,
            report: config
        });
        document.getElementById("pivotContainer").addEventListener("click", cellClick);
    }
}
//взаємодія з клітинками
function cellClick(event) {
    const cell = event.target.closest(".wdr-cell");
    if (!cell || cell.innerText.trim() === "") 
        return;

    const val = parseInt(cell.innerText.trim());
    const clicked = gameState.find(item => item["Число"] === val);
    const empty = gameState.find(item => item["Число"] === 0);

    const diff = Math.abs(clicked.index - empty.index);
    const isAdjacent = diff === 4 || (diff === 1 && Math.floor(clicked.index / 4) === Math.floor(empty.index / 4));
//суміжність
    if (isAdjacent) {
        [clicked["Число"], empty["Число"]] = [0, val];
        document.getElementById("steps-count").innerText = ++steps;
//оновлюємо
        pivotTable.setReport(pivotTable.getReport()); 
//перемога
        if (gameState.every((item, i) => item["Число"] === NUMBERS[i])) {
            document.getElementById("win-message").classList.remove("hidden");
        }
    }
}
//нова гра кнопка
document.getElementById("btn-new-game").addEventListener("click", initGame);
//завантаження гри
window.onload = initGame;