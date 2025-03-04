import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { Field } from '../models/Field'; // Предполагаю, что класс Field находится в models/Field.js
import Plant from '../models/Plant';

// Определяем возможные типы почвы и их характеристики
const soilTypes = [
    { type: 'sandy', fertilityBase: 30, moistureBase: 20 },
    { type: 'clay', fertilityBase: 50, moistureBase: 70 },
    { type: 'loamy', fertilityBase: 70, moistureBase: 50 },
    { type: 'peat', fertilityBase: 60, moistureBase: 80 },
    { type: 'silty', fertilityBase: 65, moistureBase: 60 }
];

// Функция для случайного выбора типа почвы с учётом вероятностей
const getRandomSoilType = () => {
    const rand = Math.random() * 100;
    if (rand < 30) return soilTypes[0]; // 30% шанс песчаной
    if (rand < 50) return soilTypes[1]; // 20% шанс глинистой
    if (rand < 75) return soilTypes[2]; // 25% шанс суглинистой
    if (rand < 90) return soilTypes[3]; // 15% шанс торфяной
    return soilTypes[4]; // 10% шанс илистой
};

export const useFieldStore = defineStore('fieldStore', () => {
    const fields = reactive([]);

    const initializeFields = (rows, cols) => {
        let id = 0;
        fields.splice(0, fields.length, ...Array.from({ length: rows * cols }, (_, index) => {
            const soil = getRandomSoilType();
            const baseFertility = soil.fertilityBase;
            const baseMoisture = soil.moistureBase;
            const position = [(index % cols) - cols / 2, -(Math.floor(index / cols)) + rows / 2, 0];

            return reactive(new Field(
                id++,
                baseFertility + (Math.random() * 20 - 10), // Плодородность с небольшим разбросом
                baseMoisture + (Math.random() * 20 - 10),  // Влажность с небольшим разбросом
                soil.type,
                position
            ));
        }));
    };

    const plantSeed = (fieldId, plantType, playerId) => {
        const field = fields.find((f) => f.id === fieldId);
        if (field && !field.plant) {
            field.plant = reactive(new Plant(plantType));
            field.playerId = playerId;
            field.color = field.calculateColor(); // Обновляем цвет после посадки
        }
    };

    const growPlantsStep = () => {
        fields.forEach((field) => {
            // Обновляем влажность поля
            field.updateMoisture();

            // Если на поле есть растение и оно ещё не полностью выросло
            if (field.plant && !field.plant.isFullyGrown()) {
                const growthModifier = field.getGrowthModifier();
                field.plant.grow(growthModifier); // Предполагаем, что grow принимает модификатор
            }
        });
    };

    return {
        fields,
        initializeFields,
        plantSeed,
        growPlantsStep,
    };
});