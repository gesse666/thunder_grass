// stores/gameStore.js
import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { useFieldStore } from './fieldStore';
import { usePlayerStore } from './playerStore';
import Plant from '../models/Plant';

export const useGameStore = defineStore('gameStore', () => {
    const fieldStore = useFieldStore();
    const playerStore = usePlayerStore();

    // Инициализация игры
    const initializeGame = (rows, cols, playerNames) => {
        fieldStore.initializeFields(rows, cols);
        playerNames.forEach((name) => playerStore.addPlayer(name));
    };

    // Посадка растения
    const plantSeed = (fieldId, plantType) => {
        const currentPlayer = playerStore.getCurrentPlayer();
        if (currentPlayer && !currentPlayer.planted) { // Проверяем флаг planted
            const field = fieldStore.fields.find((f) => f.id === fieldId);
            if (field && !field.plant) {
                field.plant = reactive(new Plant(plantType));
                field.playerId = currentPlayer.id;
                field.color = '#8B4513';

                // Добавляем растение в список растений игрока
                playerStore.addPlantToPlayer(currentPlayer.id, field.plant);
            }
        }
    };

    // Следующий шаг игры
    const nextStep = () => {
        playerStore.nextTurn(); // Переход к следующему игроку
        fieldStore.growPlantsStep(); // Рост растений
    };

    // Получение текущего игрока
    const getCurrentPlayer = () => {
        return playerStore.getCurrentPlayer();
    };

    // Получение полей текущего игрока
    const getPlayerFields = () => {
        const currentPlayer = playerStore.getCurrentPlayer();
        if (currentPlayer) {
            return fieldStore.fields.filter((field) => field.playerId === currentPlayer.id);
        }
        return [];
    };

    return {
        initializeGame,
        plantSeed,
        nextStep,
        getCurrentPlayer,
        getPlayerFields,
    };
});