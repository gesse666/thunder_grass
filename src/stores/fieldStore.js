import { defineStore } from 'pinia';
import { reactive } from 'vue';
import Plant from '../models/Plant';

export const useFieldStore = defineStore('fieldStore', () => {
    const fields = reactive([]); // Реактивный массив участков

    const initializeFields = (rows, cols) => {
        let id = 0;
        fields.splice(0, fields.length, ...Array.from({ length: rows * cols }, (_, index) => ({
            id: id++,
            position: [(index % cols) - cols / 2, -(Math.floor(index / cols)) + rows / 2, 0],
            color: '#228B22',
            fertility: Math.random() * 100,
            moisture: Math.random() * 100,
            soilType: 'loamy',
            plant: null, // Ссылка на объект Plant
        })));
    };

    const plantSeed = (fieldId, plantType) => {
        const field = fields.find((f) => f.id === fieldId);
        if (field && !field.plant) {
            field.plant = reactive(new Plant(plantType)); // Убедитесь, что объект реактивен
            field.color = '#8B4513';
        }
    };

    const growPlantsStep = () => {
        fields.forEach((field) => {
            if (field.plant && !field.plant.isFullyGrown()) {
                field.plant.grow();
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
