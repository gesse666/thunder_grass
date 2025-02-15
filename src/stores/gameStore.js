// stores/gameStore.js
import { defineStore } from 'pinia';
import { useFieldStore } from './fieldStore';
import { usePlayerStore } from './playerStore';

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
        if (currentPlayer) {
            fieldStore.plantSeed(fieldId, plantType, currentPlayer.id);
        }
    };

    // Следующий шаг игры
    const nextStep = () => {
        fieldStore.growPlantsStep();
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