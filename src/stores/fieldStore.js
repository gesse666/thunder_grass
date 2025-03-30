// fieldStore.js
import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';
import { Field } from '../models/Field';
import Plant from '../models/Plant';
import { SoilTypes} from "../models/SoilTypes.js";

// Функция для случайного выбора типа почвы с учётом вероятностей
const getRandomSoilType = () => {
    const rand = Math.random() * 100;
    if (rand < 30) return 'sandy'; // 30% шанс песчаной
    if (rand < 50) return 'clay';  // 20% шанс глинистой
    if (rand < 75) return 'loamy'; // 25% шанс суглинистой
    if (rand < 90) return 'peat';  // 15% шанс торфяной
    return 'silty';                // 10% шанс илистой
};

export const useFieldStore = defineStore('fieldStore', () => {
    const fields = reactive([]);
    const hoveredField = ref(null);

    const initializeFields = (rows, cols) => {
        let id = 0;
        fields.splice(0, fields.length, ...Array.from({ length: rows * cols }, (_, index) => {
            const soilType = getRandomSoilType();
            const baseFertility = SoilTypes[soilType].fertilityBase;
            const baseMoisture = SoilTypes[soilType].moistureBase;
            const position = [(index % cols) - cols / 2, -(Math.floor(index / cols)) + rows / 2, 0];

            return reactive(new Field(
                id++,
                baseFertility + (Math.random() * 20 - 10), // Плодородность с разбросом
                baseMoisture + (Math.random() * 20 - 10),  // Влажность с разбросом
                soilType,
                position
            ));
        }));
        console.log('Fields initialized:', fields.length);
    };

    const plantSeed = (fieldId, plantType, playerId) => {
        const field = fields.find((f) => f.id === fieldId);
        if (field && !field.plant) {
            field.plant = reactive(new Plant(plantType));
            field.playerId = playerId;
            field.color = field.calculateColor();
        }
    };

    const growPlantsStep = () => {
        fields.forEach((field) => {
            field.updateMoisture();
            if (field.plant && !field.plant.isFullyGrown()) {
                const growthModifier = field.getGrowthModifier();
                field.plant.grow(growthModifier);
            }
        });
    };

    const setHoveredField = (field) => {
        hoveredField.value = field;
    };

    const clearHoveredField = () => {
        hoveredField.value = null;
    };

    return {
        fields,
        hoveredField, // Экспортируем состояние
        initializeFields,
        plantSeed,
        growPlantsStep,
        setHoveredField, // Экспортируем методы
        clearHoveredField,
    };
});