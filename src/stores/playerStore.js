// stores/playerStore.js
import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';

export const usePlayerStore = defineStore('playerStore', () => {
    const players = reactive([]); // Список игроков
    const currentPlayerIndex = ref(0); // Индекс текущего игрока

    // Добавление игрока
    const addPlayer = (name) => {
        const newPlayer = {
            id: players.length + 1,
            name,
            color: `#${Math.floor(Math.random() * 16777215).toString(16)}`, // Случайный цвет
            plants: [], // Список растений игрока
        };
        players.push(newPlayer);
        return newPlayer;
    };

    // Добавление растения игроку
    const addPlantToPlayer = (playerId, plant) => {
        const player = players.find((p) => p.id === playerId);
        if (player) {
            player.plants.push(plant);
        }
    };

    // Переход к следующему игроку
    const nextTurn = () => {
        currentPlayerIndex.value = (currentPlayerIndex.value + 1) % players.length;
    };

    // Получение текущего игрока
    const getCurrentPlayer = () => {
        return players[currentPlayerIndex.value];
    };

    return {
        players,
        currentPlayerIndex,
        addPlayer,
        addPlantToPlayer,
        nextTurn,
        getCurrentPlayer,
    };
});