let passagesCahe = null;

export async function loadPassages() {
  if (passagesCahe) return passagesCahe;

  const response = await fetch("../data.json");
  passagesCahe = await response.json();
  return passagesCahe;
}

export function getRandomPassage(passages, difficulty) {
  const list = passages[difficulty];
  const index = Math.floor(Math.random() * list.length);
  return list[index];
}
