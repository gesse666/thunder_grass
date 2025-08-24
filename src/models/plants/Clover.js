import Plant from './Plant.js';

export default class Clover extends Plant {
    constructor(growthStage = 0) {
        super('clover', growthStage);
        this.maxGrowthStage = 6;
        this.growthRates = {
            0: 0,    // Укоренение
            1: 0.1,  // Росток
            2: 0.2,  // Растение
            3: 0.3,  // Бутон
            4: 0.4,  // Цветение
            5: 0.5,  // Плодоношение
            6: 0.65  // Полностью созревшее растение
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
