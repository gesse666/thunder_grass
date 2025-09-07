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
        this.humusMining = {
            0: 0,   // Семя
            1: 0.8, // Росток (меньше клевера)
            2: 1.8, // Растение
            3: 2.8, // Бутон
            4: 3.5, // Цветение
            5: 2.0  // Плодоношение
        };

        this.waterMining = {
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

    // Одуванчик готов рассеивать семена на стадии плодоношения
    isAbilityReady() {
        return this.growthStage === 5;
    }

    // Название способности одуванчика
    getAbilityName() {
        return 'Рассеять семена';
    }

    // Реализация способности одуванчика
    useAbility(fields, field, playerId) {
        if (!this.isAbilityReady()) {
            return { success: false, reason: 'Семена доступны только на стадии плодоношения' };
        }

        let seedsPlanted = 0;
        fields.forEach(other => {
            const dx = Math.abs(other.position[0] - field.position[0]);
            const dz = Math.abs(other.position[2] - field.position[2]);
            if ((dx + dz <= 1) && !other.plant) {
                other.plant = new Dandelion();
                other.playerId = playerId;
                other.color = other.calculateColor();
                other.plant.growthStage = 1;
                seedsPlanted += 1;
            }
        });

        return { success: true, seedsPlanted };
    }
}
