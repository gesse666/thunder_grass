import { defineStore } from 'pinia';

export const usePlaneStore = defineStore('planeStore', {
    state: () => ({
        planes: [
            { id: 1, color: 'blue', position: [0, 0, 0] },
            { id: 2, color: 'green', position: [2, 0, 0] },
            { id: 3, color: 'yellow', position: [-2, 0, 0] },
        ],
    }),
    actions: {
        updatePlaneColor(id, newColor) {
            const plane = this.planes.find((plane) => plane.id === id);
            if (plane) {
                plane.color = newColor;
            }
        },
        incrementClick() {
            this.clickCount++;
        },
        setColor(color) {
            this.lastColor = color;
        },
    },
});
