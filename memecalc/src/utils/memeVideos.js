export const memeVideos = [
  'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Rick Roll
  'https://www.youtube.com/watch?v=QH2-TGUlwu4', // Nyan Cat
  'https://www.youtube.com/watch?v=o-YBDTqX_ZU', // Surprised Pikachu
  'https://www.youtube.com/watch?v=ZZ5LpwO-An4', // He-Man
  'https://www.youtube.com/watch?v=KMFOVSWn0mY', // Big Shaq
  'https://www.youtube.com/watch?v=ub82Xb1C8os', // Shooting Stars
  'https://www.youtube.com/watch?v=LDU_Txk06tM', // Coffin Dance
  'https://www.youtube.com/watch?v=j5a0jTc9S10', // Dramatic Chipmunk
  'https://www.youtube.com/watch?v=RfiQYRn7fBg', // YMCA (Trump)
  'https://www.youtube.com/watch?v=hY7m5jjJ9mM', // Trollface
];

export function getRandomMeme() {
  return memeVideos[Math.floor(Math.random() * memeVideos.length)];
}
