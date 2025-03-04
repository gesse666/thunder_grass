export class Field {
    constructor(id, fertility, moisture, soilType, position, plant = null, playerId = null) {
        this.id = id;
        this.fertility = fertility; // Плодородие (0-100)
        this.moisture = moisture; // Уровень влажности (0-100)
        this.soilType = soilType; // Тип почвы (например, "sand", "clay", "loam")
        this.position = position; // Позиция клетки
        this.plant = plant; // Растение на клетке (по умолчанию null)
        this.playerId = playerId; // ID игрока, владеющего клеткой (по умолчанию null)
        this.color = this.calculateColor(); // Инициализация цвета
    }

    // Метод для расчёта цвета клетки на основе её свойств и типа почвы
    calculateColor() {
        // Базовые цвета для разных типов почвы
        const soilColors = {
            sandy: '#F4A460', // Песчаная - песочный цвет
            clay: '#A0522D',  // Глинистая - тёмно-коричневый
            loamy: '#228B22', // Суглинистая - зелёный
            peat: '#4A2F27',  // Торфяная - тёмный коричневый
            silty: '#8B7765'  // Илистая - серо-коричневый
        };

        // Если на клетке есть растение, возвращаем цвет посадки
        if (this.plant) {
            return '#8B4513'; // Цвет земли после посадки
        }

        // Если клетка принадлежит игроку, но растения нет, можно слегка затемнить цвет
        if (this.playerId) {
            return soilColors[this.soilType] || '#228B22'; // Базовый цвет по типу почвы
        }

        // Иначе цвет зависит от типа почвы с учётом плодородности и влажности
        let baseColor = soilColors[this.soilType] || '#228B22';
        if (this.fertility > 75 && this.moisture > 50) baseColor = this.adjustBrightness(baseColor, 1.2); // Светлее
        else if (this.fertility < 50 && this.moisture < 30) baseColor = this.adjustBrightness(baseColor, 0.8); // Темнее
        return baseColor;
    }

    // Вспомогательный метод для изменения яркости цвета (опционально)
    adjustBrightness(hexColor, factor) {
        let r = parseInt(hexColor.slice(1, 3), 16);
        let g = parseInt(hexColor.slice(3, 5), 16);
        let b = parseInt(hexColor.slice(5, 7), 16);

        r = Math.min(255, Math.max(0, Math.round(r * factor)));
        g = Math.min(255, Math.max(0, Math.round(g * factor)));
        b = Math.min(255, Math.max(0, Math.round(b * factor)));

        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    }

    // Метод для обновления свойств участка
    updateProperties(fertility, moisture, soilType) {
        this.fertility = Math.max(0, Math.min(100, fertility));
        this.moisture = Math.max(0, Math.min(100, moisture));
        this.soilType = soilType;
        this.color = this.calculateColor();
    }

    // Метод для естественного изменения влажности (например, испарение или удержание влаги)
    updateMoisture() {
        const moistureChange = {
            sandy: -5,  // Песчаная быстро теряет влагу
            clay: -1,   // Глинистая хорошо удерживает влагу
            loamy: -2,  // Суглинистая средне
            peat: 0,    // Торфяная почти не теряет влагу
            silty: -3   // Илистая средне теряет влагу
        };
        const change = moistureChange[this.soilType] || -2;
        this.moisture = Math.max(0, Math.min(100, this.moisture + change));
        this.color = this.calculateColor();
    }

    // Метод для расчёта модификатора роста растений на основе типа почвы
    getGrowthModifier() {
        const growthModifiers = {
            sandy: 0.7,  // Песчаная почва замедляет рост
            clay: 0.9,   // Глинистая чуть замедляет
            loamy: 1.2,  // Суглинистая ускоряет рост
            peat: 1.1,   // Торфяная немного ускоряет
            silty: 1.0   // Илистая стандартный рост
        };
        return growthModifiers[this.soilType] || 1.0;
    }
}