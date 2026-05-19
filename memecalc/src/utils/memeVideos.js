export const memeVideos = [
  'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Rick Roll
];

export function getRandomMeme() {
  return memeVideos[Math.floor(Math.random() * memeVideos.length)];
}
