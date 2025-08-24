import Plant from './Plant.js';

export default class Dandelion extends Plant {
    constructor(growthStage = 0) {
        super('dandelion', growthStage);
        this.maxGrowthStage = 6;
        this.growthRates = {
            0: 0.1,  // Укоренение
            1: 0.2,  // Росток
            2: 0.3,  // Растение
            3: 0.4,  // Бутон
            4: 0.6,  // Цветение
            5: 0.7,  // Плодоношение
            6: 0.8   // Полностью созревшее растение
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
