export default class Plant {
    constructor(type, growthStage = 0) {
        this.type = type; // Тип растения
        this.growthStage = growthStage; // Стадия роста
        this.maxGrowthStage = 5; // Максимальная стадия роста
        this.size = 0.9; // Начальный размер семени
    }

    grow() {
        if (this.growthStage < this.maxGrowthStage) {
            this.growthStage += 1;
            this.size += 0.2; // Увеличиваем размер растения
        }
    }

    isFullyGrown() {
        return this.growthStage === this.maxGrowthStage;
    }
}
