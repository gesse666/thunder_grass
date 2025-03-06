import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { useFieldStore } from './fieldStore';
import { usePlayerStore } from './playerStore';
import Plant from '../models/Plant';

export const useGameStore = defineStore('gameStore', () => {
    const fieldStore = useFieldStore();
    const playerStore = usePlayerStore();

    // Счётчик ходов в текущем раунде
    let turnsInRound = 0;

    // Инициализация игры
    const initializeGame = (rows, cols, playerNames) => {
        fieldStore.initializeFields(rows, cols);
        playerNames.forEach((name) => playerStore.addPlayer(name));
        turnsInRound = 0; // Сбрасываем счётчик ходов
    };

    // Посадка растения
    const plantSeed = (fieldId, plantType) => {
        const currentPlayer = playerStore.getCurrentPlayer();
        if (currentPlayer && !currentPlayer.planted) { // Проверяем флаг planted
            const field = fieldStore.fields.find((f) => f.id === fieldId);
            if (field && !field.plant) {
                field.plant = reactive(new Plant(plantType));
                field.playerId = currentPlayer.id;
                // field.color = '#8B4513';

                // Добавляем растение в список растений игрока
                playerStore.addPlantToPlayer(currentPlayer.id, field.plant);
                currentPlayer.planted = true; // Отмечаем, что игрок посадил растение
            }
        }
    };

    // Следующий шаг игры
    const nextStep = () => {
        const totalPlayers = playerStore.players.length; // Общее количество игроков
        turnsInRound += 1; // Увеличиваем счётчик ходов

        // Переход к следующему игроку
        playerStore.nextTurn();

        // Если все игроки походили (раунд завершён)
        if (turnsInRound >= totalPlayers) {
            fieldStore.growPlantsStep(); // Рост растений
            turnsInRound = 0; // Сбрасываем счётчик для нового раунда

            // Сбрасываем флаг planted для всех игроков
            playerStore.players.forEach((player) => {
                player.planted = false;
            });
        }
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