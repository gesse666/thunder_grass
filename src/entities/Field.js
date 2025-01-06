export class Field {
    constructor(id, fertility, moisture, soilType, position) {
        this.id = id;
        this.fertility = fertility; // Плодородие (0-100)
        this.moisture = moisture; // Уровень влажности (0-100)
        this.soilType = soilType; // Тип почвы (например, "sand", "clay", "loam")
        this.position = position; // Позиция клетки
        this.color = this.calculateColor(); // Инициализация цвета
    }

    // Метод для расчёта цвета клетки на основе её свойств
    calculateColor() {
        if (this.fertility > 75 && this.moisture > 50) return 'green';
        if (this.fertility < 50 && this.moisture < 30) return 'brown';
        return 'yellow';
    }

    // Метод обновления свойств участка
    updateProperties(fertility, moisture, soilType) {
        this.fertility = fertility;
        this.moisture = moisture;
        this.soilType = soilType;
        this.color = this.calculateColor();
    }
}
