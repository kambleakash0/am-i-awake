const clockEl = document.getElementById('clock');
const labelEl = document.getElementById('timezone-label');

// 1. Build Structure (Same as before)
const structure = [
    { id: 'h1', max: 2 }, { id: 'h2', max: 9 },
    { spacer: true },
    { id: 'm1', max: 5 }, { id: 'm2', max: 9 },
    { spacer: true },
    { id: 's1', max: 5 }, { id: 's2', max: 9 }
];

// ... (Keep the structure generation code exactly the same as before) ...
structure.forEach(col => {
    // ... insert existing element creation code here ...
    if (col.spacer) {
        const spacer = document.createElement('div');
        spacer.style.width = '10px';
        clockEl.appendChild(spacer);
    } else {
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
    }
});

// 2. READ CONFIG INSTEAD OF FETCHING
// We use the variable defined in config.js
const targetTimezone = CONFIG.timezone;
labelEl.innerText = `Current time in ${targetTimezone.replace('_', ' ')}`;

// 3. Update Function (Same as before)
function updateClock() {
    const now = new Date();
    const options = {
        timeZone: targetTimezone,
        hour12: false,
        hour: '2-digit', minute: '2-digit', second: '2-digit'
    };
    const timeString = new Intl.DateTimeFormat('en-US', options).format(now);
    const [h, m, s] = timeString.split(':');

    // ... (Keep the rest of the movement logic exactly the same) ...
    const digits = {
        h1: h[0], h2: h[1],
        m1: m[0], m2: m[1],
        s1: s[0], s2: s[1]
    };
    const numberHeight = 70;

    for (const [id, value] of Object.entries(digits)) {
        const el = document.getElementById(id);
        if (el) {
            const offset = 70;
            const y = offset - (parseInt(value) * numberHeight);
            el.style.transform = `translateY(${y}px)`;
        }
    }
}

setInterval(updateClock, 1000);
updateClock();