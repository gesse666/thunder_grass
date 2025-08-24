import Plant from './Plant.js';

export default class Clover extends Plant {
    constructor(growthStage = 0) {
        super('clover', growthStage);
        this.maxGrowthStage = 5;
        this.growthRates = {
            0: 0,    // Семя
            1: 0.1,  // Ростки
            2: 0.2,  // Молодое растение
            3: 0.3,  // Взрослое растение
            4: 0.3,  // С ползучими побегами
            5: 0.65  // Цветок
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
