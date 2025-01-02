import { defineStore } from 'pinia';
import {Field} from "../entities/Field.js";

export const useFieldStore = defineStore('fieldStore', {
    state: () => ({
        fields: [], // Массив участков
    }),
    actions: {
        initializeFields(rows, cols) {
            this.fields = [];
            let id = 1;
            // for (let x = 0; x < rows; x++) {
            //     for (let z = 0; z < cols; z++) {
            //         this.fields.push(new Field(id++, 50, 50, 'loam', [x, 0, z]));
            //     }
            // }
            for (let x = 0; x < rows; x++) {
                for (let y = 0; y < cols; y++) {
                    this.fields.push(new Field(id++, 50, 50, 'loam', [x, y, 0]));
                }
            }
        },
        updateField(id, fertility, moisture, soilType) {
            const field = this.fields.find((field) => field.id === id);
            if (field) {
                field.updateProperties(fertility, moisture, soilType);
            }
        },
    },
});
