// models/Plant.js
export default class Plant {
    constructor(type, growthStage = 0) {
        this.type = type; // Тип растения
        this.growthStage = growthStage; // Стадия роста
        this.maxGrowthStage = 5; // Максимальная стадия роста
        this.size = 0.9; // Начальный размер семени
    }

    grow(modifier = 1.0) { // Добавлен параметр modifier с дефолтным значением
        if (this.growthStage < this.maxGrowthStage) {
            this.growthStage = Math.min(this.maxGrowthStage, this.growthStage + modifier);
            this.size += 0.2; // Увеличиваем размер растения
        }
    }

    isFullyGrown() {
        return this.growthStage === this.maxGrowthStage;
    }
}