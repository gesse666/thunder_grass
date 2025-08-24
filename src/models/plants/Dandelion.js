import Plant from './Plant.js';

export default class Dandelion extends Plant {
    constructor(growthStage = 0) {
        super('dandelion', growthStage);
        this.maxGrowthStage = 5;
        this.growthRates = {
            0: 0.1,  // Семя
            1: 0.2,  // Ростки
            2: 0.3,  // Молодое растение
            3: 0.5,  // Бутон
            4: 0.7,  // Цветок
            5: 0.7   // Плод
        };
    }

    grow(modifier = 1.0) {
        if (this.growthStage < this.maxGrowthStage) {
            this.growthStage = Math.min(this.maxGrowthStage, this.growthStage + modifier);
            this.size += 0.2;
        }
    }

    getHeightOffset() {
        return this.growthRates[this.growthStage] || 0;
    }

    getPosition() {
        const heightOffset = this.getHeightOffset() * this.size;
        return [0, heightOffset, 0.1];
    }
}
