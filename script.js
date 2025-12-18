const clockEl = document.getElementById('clock');
const labelEl = document.getElementById('timezone-label');

// CONFIG
const targetTimezone = (typeof CONFIG !== 'undefined' && CONFIG.timezone) ? CONFIG.timezone : 'UTC';
labelEl.innerText = `TIME IN ${targetTimezone.replace('_', ' ').toUpperCase()}`;

// Structure
const structure = [
    { id: 'h1', max: 2 },
    { id: 'h2', max: 9 },
    { id: 'm1', max: 5 },
    { id: 'm2', max: 9 },
    { id: 's1', max: 5 },
    { id: 's2', max: 9 }
];

// Generate HTML
structure.forEach(col => {
    const column = document.createElement('div');
    column.className = 'column';

    const numbers = document.createElement('div');
    numbers.className = 'numbers';
    numbers.id = col.id;

    for (let i = 0; i <= col.max; i++) {
        const num = document.createElement('div');
        num.className = 'num';
        num.innerText = i;
        numbers.appendChild(num);
    }
    column.appendChild(numbers);
    clockEl.appendChild(column);
});

// Update Function
const numberHeight = 80;

function updateClock() {
    const now = new Date();
    const timeInZone = new Date(now.toLocaleString('en-US', { timeZone: targetTimezone }));

    const h = timeInZone.getHours().toString().padStart(2, '0');
    const m = timeInZone.getMinutes().toString().padStart(2, '0');
    const s = timeInZone.getSeconds().toString().padStart(2, '0');

    const digits = {
        h1: h[0], h2: h[1],
        m1: m[0], m2: m[1],
        s1: s[0], s2: s[1]
    };

    for (const [id, value] of Object.entries(digits)) {
        const el = document.getElementById(id);
        if (el) {
            // MATH UPDATE for "top: 50%" CSS:
            // The strip starts anchored at the center of the screen.
            // "0" is the first item. Its center is 40px down.
            // We need to shift UP by 40px to center "0".
            // For "1", we shift UP by (80 + 40) = 120px.

            // Formula: - (Value * Height) - (Height / 2)
            // But wait, we added padding: 20px in CSS!
            // So "0" center is actually at 20px (padding) + 40px (half-height) = 60px.

            const padding = 20;
            const centerOffset = numberHeight / 2; // 40

            const y = - (parseInt(value) * numberHeight) - centerOffset - padding;

            el.style.transform = `translateY(${y}px)`;
        }
    }
}

setInterval(updateClock, 1000);
updateClock();