// stores/playerStore.js
import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';

export const usePlayerStore = defineStore('playerStore', () => {
    const players = reactive([]);
    const currentPlayerIndex = ref(0);

    const addPlayer = (name) => {
        const newPlayer = {
            id: players.length + 1,
            name,
            color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
            plants: [],
        };
        players.push(newPlayer);
        return newPlayer;
    };

    const addPlantToPlayer = (playerId, plant) => {
        const player = players.find((p) => p.id === playerId);
        if (player) {
            player.plants.push(plant);
        }
    };

    const nextTurn = () => {
        currentPlayerIndex.value = (currentPlayerIndex.value + 1) % players.length;
    };

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