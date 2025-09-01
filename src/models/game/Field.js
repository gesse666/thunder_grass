// models/Field.js
import {SoilTypes} from "./SoilTypes.js";

export class Field {
    constructor(id, fertility, moisture, soilType, humusLevel, position, plant = null, playerId = null) {
        this.id = id;
        this.fertility = fertility; // Принимаем плодородие напрямую
        this.moisture = moisture;
        this.soilType = soilType;
        this.position = position;
        this.plant = plant;
        this.playerId = playerId;

        this.color = this.calculateColor();
        this.borderColor = this.calculateBorderColor();
        this.hasBorder = !!this.playerId;
    }

    calculateColor() {
        return SoilTypes[this.soilType].color; // Цвет из SoilTypes
    }

    calculateBorderColor() {
        if (!this.playerId) return null;
        const playerColors = {
            1: '#FF0000', // Игрок 1
            2: '#00FF00', // Игрок 2
        };
        return playerColors[this.playerId] || '#FFFFFF';
    }

    updateMoisture() {
        // Предполагаемая логика обновления влажности
        this.moisture = Math.max(0, Math.min(100, this.moisture + (Math.random() * 10 - 5)));
    }

    getGrowthModifier() {
        // Пример модификатора роста на основе плодородия и влажности
        return (this.fertility / 100) * (this.moisture / 100);
    }
}