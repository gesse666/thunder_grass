// models/Dandelion.js
import Plant from './Plant.js';

export default class Dandelion extends Plant {
    constructor(growthStage = 0) {
        super('dandelion', growthStage);
        this.maxGrowthStage = 6;

        // Переопределяем стадии для одуванчика
        this.stages = [
            { name: 'Укоренение семени', humusCost: 1, waterCost: 5 },
            { name: 'Росток', humusCost: 3, waterCost: 12 },
            { name: 'Растение', humusCost: 6, waterCost: 15 },
            { name: 'Бутон', humusCost: 7, waterCost: 18 },
            { name: 'Цветение', humusCost: 7, waterCost: 18 },
            { name: 'Плодоношение', humusCost: 5, waterCost: 10 }
        ];

        // Одуванчик производит меньше гумуса, но быстрее размножается
        this.humusGeneration = {
            0: 0,   // Семя
            1: 0.8, // Росток (меньше клевера)
            2: 1.8, // Растение
            3: 2.8, // Бутон
            4: 3.5, // Цветение
            5: 2.0  // Плодоношение
        };

        this.waterGeneration = {
            0: 0,   // Семя
            1: 2.5, // Росток (лучше сохраняет влагу)
            2: 3.5, // Растение
            3: 4.5, // Бутон
            4: 5.5, // Цветение
            5: 3.5  // Плодоношение
        };

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

    getHeightOffset() {
        return this.growthRates[this.growthStage] || 0;
    }

    getPosition() {
        const heightOffset = this.getHeightOffset() * this.size;
        return [0, heightOffset, 0.1];
    }
}
