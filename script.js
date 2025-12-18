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

// --- RESPONSIVE LOGIC STARTS HERE ---

// Helper to get current height from CSS
function getNumberHeight() {
    // Grab the first number in the DOM to measure it
    const sample = document.querySelector('.num');
    // Default to 80 if not rendered yet
    return sample ? sample.clientHeight : 80;
}

let currentNumberHeight = getNumberHeight();

// Recalculate if window resizes (e.g. rotating phone)
window.addEventListener('resize', () => {
    currentNumberHeight = getNumberHeight();
    updateClock(); // Force an immediate update so it snaps to place
});

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
            // DYNAMIC MATH:
            // 1. Get container center (50% of viewport)
            // 2. We need to shift the active number UP by half its height
            // 3. Plus the padding we added in CSS (20px)

            const padding = 20;
            const centerOffset = currentNumberHeight / 2;

            // Formula: - (Digit * Height) - (Half Height) - Padding
            const y = - (parseInt(value) * currentNumberHeight) - centerOffset - padding;

            el.style.transform = `translateY(${y}px)`;
        }
    }
}

setInterval(updateClock, 1000);
updateClock();