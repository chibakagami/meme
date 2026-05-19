# Scientific Calculator Pro

A mobile-first prank web app that looks like a full scientific calculator — until you press `=`.

## The Joke

The app evaluates expressions correctly and shows the result. After 800 ms it redirects to a random YouTube meme video. The victim sees a real result flash on screen, thinks the calculator works perfectly, then…

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:5173` in your browser (use DevTools → mobile emulation for the best experience).

## Build for Production

```bash
npm run build
npm run preview   # preview the production build locally
```

## Deploy to Vercel

```bash
npm install -g vercel
vercel --prod
```

## Deploy to GitHub Pages

1. Add `base: '/memecalc/'` to `vite.config.js`.
2. Build and push the `dist/` folder to the `gh-pages` branch:

```bash
npm run build
npx gh-pages -d dist
```

## Adding or Changing Meme Videos

Edit **`src/utils/memeVideos.js`** — just add or remove URLs from the `memeVideos` array:

```js
export const memeVideos = [
  'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Rick Roll
  'https://www.youtube.com/watch?v=QH2-TGUlwu4', // Nyan Cat
  // add your own here
];
```

`getRandomMeme()` picks one at random each time `=` is pressed.

## Project Structure

```
memecalc/
├── public/
│   ├── icon-192.png          PWA icon
│   └── icon-512.png          PWA icon (large)
├── src/
│   ├── App.jsx
│   ├── components/
│   │   ├── Calculator.jsx    State management + button logic
│   │   ├── Display.jsx       LCD display panel
│   │   ├── Button.jsx        Single button with press feedback
│   │   └── Keypad.jsx        Button grid layout
│   ├── utils/
│   │   ├── calculator.js     mathjs expression evaluation
│   │   └── memeVideos.js     ← edit this to change the prank targets
│   ├── styles/
│   │   └── index.css         Tailwind v4 + custom LCD / 3-D button styles
│   └── main.jsx
├── index.html
├── vite.config.js            PWA config lives here
└── package.json
```

## Stack

- **React 19** + **Vite 8**
- **Tailwind CSS v4** (`@tailwindcss/vite`)
- **mathjs** — safe expression evaluation
- **vite-plugin-pwa** — installable PWA with standalone display mode
