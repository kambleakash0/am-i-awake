// 1. SELECT DOM ELEMENTS
const clockEl = document.getElementById('clock');
const labelEl = document.getElementById('timezone-label');

// 2. READ CONFIGURATION (From config.js)
// If config is missing, default to UTC to prevent crash
const targetTimezone = (typeof CONFIG !== 'undefined' && CONFIG.timezone) ? CONFIG.timezone : 'UTC';

// Update the text label
labelEl.innerText = `Current time in ${targetTimezone.replace('_', ' ')}`;

// 3. DEFINE CLOCK STRUCTURE
// We need 6 columns for digits and spacers in between
const structure = [
    { id: 'h1', max: 2 }, // 10s of Hours (0-2)
    { id: 'h2', max: 9 }, // 1s of Hours (0-9)
    { spacer: true },
    { id: 'm1', max: 5 }, // 10s of Minutes (0-5)
    { id: 'm2', max: 9 }, // 1s of Minutes (0-9)
    { spacer: true },
    { id: 's1', max: 5 }, // 10s of Seconds (0-5)
    { id: 's2', max: 9 }  // 1s of Seconds (0-9)
];

// 4. GENERATE HTML DYNAMICALLY
// This creates the vertical strips of numbers
structure.forEach(col => {
    if (col.spacer) {
        // Create a small gap between groups
        const spacer = document.createElement('div');
        spacer.style.width = '15px'; // Adjust spacing width here
        clockEl.appendChild(spacer);
    } else {
        // Create the window (column)
        const column = document.createElement('div');
        column.className = 'column';

        // Create the moving strip (numbers)
        const numbers = document.createElement('div');
        numbers.className = 'numbers';
        numbers.id = col.id;

        // Populate numbers 0 to max
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

// 5. UPDATE FUNCTION
const numberHeight = 70; // This must match .num height in CSS

function updateClock() {
    const now = new Date();

    // Convert current time to the Target Timezone
    const options = {
        timeZone: targetTimezone,
        hour12: false, // 24-hour format
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };

    // Returns string like "23:59:48"
    // We use 'en-US' to ensure colons are used as separators
    const timeString = new Intl.DateTimeFormat('en-US', options).format(now);

    // Remove colons to get a clean string of digits: "235948"
    const [h, m, s] = timeString.split(':');

    // Map digits to IDs
    const digits = {
        h1: h[0], h2: h[1],
        m1: m[0], m2: m[1],
        s1: s[0], s2: s[1]
    };

    // Apply Animations
    for (const [id, value] of Object.entries(digits)) {
        const el = document.getElementById(id);
        if (el) {
            // MATH EXPLANATION:
            // We want the active number to be in the middle of the view.
            // Our view shows 3 numbers. The middle slot is index 1.
            // 70px is the height of one number.
            // To put '0' in the middle, we shift DOWN by 70px (1 * height).
            // To put '1' in the middle, we are at 0px.
            // To put '2' in the middle, we shift UP by -70px.
            // Formula: InitialOffset - (Digit * Height)

            const offset = 70;
            const y = offset - (parseInt(value) * numberHeight);

            el.style.transform = `translateY(${y}px)`;
        }
    }
}

// 6. START THE LOOP
setInterval(updateClock, 1000);
updateClock(); // Run immediately so there is no 1-second delay on load