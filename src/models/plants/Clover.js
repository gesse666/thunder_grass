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

    getHeightOffset() {
        return this.growthRates[this.growthStage] || 0;
    }

    getPosition() {
        const heightOffset = this.getHeightOffset() * this.size;
        return [0, heightOffset, 0.1];
    }

    // Клевер готов выпускать столоны на стадии растения и выше
    isAbilityReady() {
        return this.growthStage >= 2;
    }

    // Название способности клевера
    getAbilityName() {
        return 'Выпустить столоны';
    }

    // Реализация способности клевера
    useAbility(fields, field, playerId) {
        if (!this.isAbilityReady()) {
            return { success: false, reason: 'Столоны доступны со стадии растения' };
        }

        let stolonsCreated = 0;
        // Логика создания столонов...

        return { success: true, stolonsCreated };
    }
}
