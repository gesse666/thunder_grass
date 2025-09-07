// models/Plant.js
export default class Plant {
    constructor(type, growthStage = 0) {
        this.type = type;
        this.growthStage = growthStage;
        this.maxGrowthStage = 5;
        this.size = 0.9;

        // Базовые стадии с затратами ресурсов
        this.stages = [
            { name: 'Укоренение семени', humusCost: 1, waterCost: 5 },
            { name: 'Росток', humusCost: 4, waterCost: 10 },
            { name: 'Растение', humusCost: 6, waterCost: 15 },
            { name: 'Бутон', humusCost: 8, waterCost: 20 },
            { name: 'Цветение', humusCost: 10, waterCost: 25 },
            { name: 'Плодоношение', humusCost: 4, waterCost: 15 }
        ];

        // Базовая генерация ресурсов по стадиям
        this.humusMining = {
            0: 0,   // Семя не производит гумус
            1: 1,   // Росток
            2: 2,   // Растение
            3: 3,   // Бутон
            4: 4,   // Цветение
            5: 2    // Плодоношение (снижение)
        };

        this.waterMining = {
            0: 0,   // Семя не производит воду
            1: 2,   // Росток
            2: 3,   // Растение
            3: 4,   // Бутон
            4: 5,   // Цветение
            5: 3    // Плодоношение (снижение)
        };
    }

    // Проверяем, хватает ли ресурсов для следующего этапа
    canGrow(availableHumus, availableWater) {
        if (this.growthStage >= this.maxGrowthStage) {
            return false;
        }

        const nextStage = this.stages[this.growthStage];
        return availableHumus >= nextStage.humusCost && availableWater >= nextStage.waterCost;
    }

    // Получаем затраты ресурсов для следующего этапа
    getNextStageCosts() {
        if (this.growthStage >= this.maxGrowthStage) {
            return null;
        }

        const nextStage = this.stages[this.growthStage];
        return {
            humus: nextStage.humusCost,
            water: nextStage.waterCost,
            stageName: nextStage.name
        };
    }

    // Рост происходит только если есть достаточно ресурсов
    grow(availableHumus, availableWater) {
        if (!this.canGrow(availableHumus, availableWater)) {
            return {
                success: false,
                reason: 'Недостаточно ресурсов для роста',
                required: this.getNextStageCosts()
            };
        }

        const costs = this.getNextStageCosts();
        this.growthStage++;
        this.size += 0.2;

        return {
            success: true,
            costsUsed: costs,
            newStage: this.getCurrentStageName()
        };
    }

    getCurrentStageName() {
        if (this.growthStage === 0) return 'Семя';
        return this.stages[this.growthStage - 1].name;
    }

    isFullyGrown() {
        return this.growthStage >= this.maxGrowthStage;
    }

    // Методы для генерации ресурсов
    getHumusMining() {
        return this.humusMining[this.growthStage] || 0;
    }

    getWaterMining() {
        return this.waterMining[this.growthStage] || 0;
    }

    // Абстрактные методы
    getHeightOffset() {
        throw new Error('getHeightOffset() должен быть реализован в наследнике');
    }

    getPosition() {
        const heightOffset = this.getHeightOffset() * this.size;
        return [0, heightOffset, 0.1];
    }

    // Базовый метод - по умолчанию способности нет
    isAbilityReady() {
        return false;
    }

    // Базовое название способности
    getAbilityName() {
        return 'Способность';
    }

    useAbility(/* дополнительные параметры */) {
        // По умолчанию ничего не делает
        return { success: false, reason: 'У этого растения нет особой способности' };
    }
}
