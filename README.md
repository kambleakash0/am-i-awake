# Am I Awake? 😴

**A passive-aggressive timezone visualizer for your remote colleagues.**

![Clock Preview](clock_preview.gif)

## What is this?

Do you work with people who think "Asynchronous Communication" means "I will ping you at 4 AM your time and expect a reply"?

**`am-i-awake`** is a visual status page that answers the age-old question: *"Is it a socially acceptable time to message [Your Name]?"*

It features:

* ✨ **Oddly Satisfying Animations:** Vertical sliding tape reels.
* 🔮 **Glassmorphism:** Tactile lens effects with dynamic lighting.
* 📱 **Responsive:** Looks good on your 4K monitor and your boss's iPhone.
* 🌍 **Zero Config Deployment:** Runs entirely on GitHub Pages. No servers, no bills.

### 🎨 Inspiration

The visual design is heavily inspired by the **`black_clock`** wallpaper from Steam's Wallpaper Engine Workshop.

* Check out the original concept here: [Steam Workshop: black_clock](https://steamcommunity.com/sharedfiles/filedetails/?id=2239404078)

I wanted this aesthetic to live on the web, accessible via a URL, without needing the Wallpaper Engine app.

### 🚀 How to Use (Make it yours)

1. **Fork** this repository.
2. Open `config.js` and update your timezone:

    ```javascript
    const CONFIG = {
        // Use IANA Timezone names (e.g., "America/New_York", "Asia/Tokyo")
        timezone: "Asia/Tokyo"
    };
    ```

3. Go to **Settings > Pages** in your GitHub repository.
4. Set the **Source** to the `main` branch and click **Save**.
5. Wait about 60 seconds, and GitHub will give you your live URL.
6. Send the link to that one coworker who always schedules meetings during your lunch break.

### 🛠 Tech Stack

* **HTML5**
* **CSS3** (Flexbox, CSS Transforms, Backdrop Filters)
* **Vanilla JS** (No React, no frameworks, just pure DOM manipulation)

### 📄 License

[MIT](LICENSE). Steal this code. Use it. Just don't wake me up.
