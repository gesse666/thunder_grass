// fieldStore.js
import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';
import { Field, SoilTypes } from '../models/game';
import { Dandelion, Clover } from '../models/plants';

// Функция для случайного выбора типа почвы с учётом вероятностей
const getRandomSoilType = () => {
    const rand = Math.random() * 100;

    if (rand < 25) return 'sandy';    // 25% песчаная
    if (rand < 45) return 'clay';     // 20% глинистая
    if (rand < 70) return 'loamy';    // 25% суглинистая
    if (rand < 85) return 'peat';     // 15% торфяная
    if (rand < 95) return 'silty';    // 10% илистая
    return 'black';               // 5% чернозём
};

// Создание растения по типу
const createPlant = (plantType) => {
    switch (plantType) {
        case 'dandelion':
            return new Dandelion();
        case 'clover':
            return new Clover();
        default:
            throw new Error(`Неизвестный тип растения: ${plantType}`);
    }
};

export const useFieldStore = defineStore('fieldStore', () => {
    const fields = reactive([]);
    const hoveredField = ref(null);

    // Ресурсы игроков
    const playerResources = reactive({});

    const initializeFields = (rows, cols) => {
        let id = 0;
        fields.splice(0, fields.length, ...Array.from({ length: rows * cols }, (_, index) => {
            const soilType = getRandomSoilType();
            console.log('getRandomSoilType - ', soilType);
            const moistureLevel = SoilTypes[soilType].moistureLevel;
            const humusLevel = SoilTypes[soilType].humusLevel;
            const row = Math.floor(index / cols);
            const col = index % cols;
            const position = [
                (col - (cols - 1) / 2),
                0,
                (row - (rows - 1) / 2),
            ];

            // Базовая влажность на основе moistureLevel с небольшим разбросом
            const baseMoisture = (moistureLevel * 100) + (Math.random() * 10 - 5);
            // Базовая плодородность теперь зависит только от гумуса
            const baseFertility = (humusLevel * 100) + (Math.random() * 10 - 5);

            return reactive(new Field(
                id++,
                Math.max(0, Math.min(100, baseFertility)), // Плодородность 0-100
                Math.max(0, Math.min(100, baseMoisture)),  // Влажность 0-100
                soilType,
                humusLevel,
                position
            ));
        }));
    };

    const initializePlayer = (playerId) => {
        if (!playerResources[playerId]) {
            playerResources[playerId] = reactive({
                humus: 10,  // Начальный гумус
                water: 20   // Начальная вода
            });
        }
    };

    const plantSeed = (fieldId, plantType, playerId) => {
        initializePlayer(playerId);

        const field = fields.find((f) => f.id === fieldId);
        if (field && !field.plant) {
            const newPlant = createPlant(plantType);
            const costs = newPlant.getNextStageCosts();

            // Проверяем, хватает ли ресурсов для посадки семени
            const playerRes = playerResources[playerId];
            if (playerRes.humus >= costs.humus && playerRes.water >= costs.water) {
                // Списываем ресурсы
                playerRes.humus -= costs.humus;
                playerRes.water -= costs.water;

                // Сажаем растение
                field.plant = reactive(newPlant);
                field.playerId = playerId;
                field.color = field.calculateColor();

                // Выращиваем до первой стадии (укоренение)
                field.plant.growthStage = 1;

                return { success: true, costsUsed: costs };
            } else {
                return { success: false, reason: 'Недостаточно ресурсов', required: costs };
            }
        }
        return { success: false, reason: 'Поле недоступно для посадки' };
    };

    const tryGrowPlant = (fieldId, playerId) => {
        const field = fields.find((f) => f.id === fieldId);
        if (!field || !field.plant || field.playerId !== playerId) {
            return { success: false, reason: 'Растение не найдено или не принадлежит игроку' };
        }

        const playerRes = playerResources[playerId];
        const growthResult = field.plant.grow(playerRes.humus, playerRes.water);

        if (growthResult.success) {
            // Списываем ресурсы
            playerRes.humus -= growthResult.costsUsed.humus;
            playerRes.water -= growthResult.costsUsed.water;
        }

        return growthResult;
    };

    const growPlantsStep = () => {
        fields.forEach((field) => {
            field.updateMoisture();

            if (field.plant && field.playerId) {
                const playerId = field.playerId;
                initializePlayer(playerId);

                // Генерируем ресурсы от растения с учетом почвы
                const humusGeneration = calculateHumusGeneration(field);
                const waterGeneration = calculateWaterGeneration(field);

                playerResources[playerId].humus += humusGeneration;
                playerResources[playerId].water += waterGeneration;

                // Попытка автоматического роста (можно отключить для ручного управления)
                if (!field.plant.isFullyGrown()) {
                    const playerRes = playerResources[playerId];
                    const growthResult = field.plant.grow(playerRes.humus, playerRes.water);

                    if (growthResult.success) {
                        playerRes.humus -= growthResult.costsUsed.humus;
                        playerRes.water -= growthResult.costsUsed.water;
                    }
                }
            }
        });
    };

    const calculateHumusGeneration = (field) => {
        const soilMultiplier = SoilTypes[field.soilType].humusLevel;
        const baseGeneration = field.plant.getHumusGeneration();
        return Math.round(baseGeneration * soilMultiplier);
    };

    const calculateWaterGeneration = (field) => {
        // Теперь учитываем как текущую влажность, так и базовую влагоёмкость почвы
        const soilMoistureCapacity = SoilTypes[field.soilType].moistureLevel;
        const currentMoisture = field.moisture / 100;
        // Коэффициент эффективности: чем ближе текущая влажность к потенциалу почвы, тем лучше
        const efficiencyMultiplier = Math.min(currentMoisture / soilMoistureCapacity, 1.2);

        const baseGeneration = field.plant.getWaterGeneration();
        return Math.round(baseGeneration * efficiencyMultiplier);
    };

    const getPlayerResources = (playerId) => {
        initializePlayer(playerId);
        return playerResources[playerId];
    };

    const setHoveredField = (field) => {
        hoveredField.value = field;
    };

    const clearHoveredField = () => {
        hoveredField.value = null;
    };

    // Методы для отладки
    const addResources = (playerId, humus, water) => {
        initializePlayer(playerId);
        playerResources[playerId].humus += humus;
        playerResources[playerId].water += water;
    };

    const getFieldInfo = (fieldId) => {
        const field = fields.find((f) => f.id === fieldId);
        if (!field) return null;

        return {
            id: field.id,
            soilType: field.soilType,
            humusLevel: SoilTypes[field.soilType].humusLevel,
            moistureLevel: SoilTypes[field.soilType].moistureLevel,
            currentMoisture: field.moisture,
            fertility: field.fertility,
            plant: field.plant ? {
                type: field.plant.type,
                stage: field.plant.growthStage,
                stageName: field.plant.getCurrentStageName(),
                isFullyGrown: field.plant.isFullyGrown(),
                nextCosts: field.plant.getNextStageCosts(),
                humusGeneration: field.plant.getHumusGeneration(),
                waterGeneration: field.plant.getWaterGeneration()
            } : null
        };
    };

    return {
        fields,
        hoveredField,
        playerResources,
        initializeFields,
        initializePlayer,
        plantSeed,
        tryGrowPlant,
        growPlantsStep,
        getPlayerResources,
        setHoveredField,
        clearHoveredField,
        addResources,
        getFieldInfo
    };
});
