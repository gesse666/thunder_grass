// src/stores/fieldStore.js
import { defineStore } from 'pinia';
import Plant from '../models/Plant';

export const useFieldStore = defineStore('fieldStore', {
    state: () => ({
        fields: [],
    }),
    actions: {
        initializeFields(rows, cols) {
            let id = 0;
            this.fields = Array.from({ length: rows * cols }, (_, index) => ({
                id: id++,
                position: [(index % cols) - cols / 2, -(Math.floor(index / cols)) + rows / 2, 0],
                color: '#228B22',
                fertility: Math.random() * 100,
                moisture: Math.random() * 100,
                soilType: 'loamy',
                plant: null, // Ссылка на объект Plant
            }));
        },
        plantSeed(fieldId, plantType) {
            const field = this.fields.find((f) => f.id === fieldId);
            if (field && !field.plant) {
                field.plant = new Plant(plantType);
                field.color = '#8B4513'; // Меняем цвет участка при посадке
            }
        },
        growPlantsStep() {
            this.fields.forEach((field) => {
                if (field.plant && !field.plant.isFullyGrown()) {
                    field.plant.grow();
                }
            });
        },
    },
});
