document.addEventListener('DOMContentLoaded', () => {
  const characterBar = document.getElementById('character-bar');
  const detailedInfo = document.getElementById('detailed-info');
  const votesForm = document.getElementById('votes-form');
  const resetBtn = document.getElementById('reset-btn');
  const characterForm = document.getElementById('character-form'); // For bonus

  let characters = [
    { name: 'Cat', votes: 0, image: '/home/sudeis/cute/cat.jpeg' },
    { name: 'Penguin', votes: 0, image: '/home/sudeis/cute/penguine.jpg' },
     { name: 'bear', votes: 0, image: 'https://media4.giphy.com/media/FArgGzk7KO14k/200.webp' },
    { name: 'cheetah', votes: 0, image: 'https://media1.giphy.com/media/xT0xeompFlF9acs3vi/giphy.webp' },
    { name: 'rabits', votes: 0, image: 'https://media2.giphy.com/media/bXdjYegbUX3b2/giphy.webp' },
    // Add more characters as needed
  ];

  function updateCharacterBar() {
    characterBar.innerHTML = '';
    characters.forEach((character, index) => {
      const charDiv = document.createElement('div');
      charDiv.textContent = character.name;
      charDiv.addEventListener('click', () => showCharacterInfo(index));
      characterBar.appendChild(charDiv);
    });
  }

  function showCharacterInfo(index) {
    const character = characters[index];
    document.getElementById('name').textContent = character.name;
    document.getElementById('image').src = character.image;
    document.getElementById('image').alt = character.name;
    document.getElementById('vote-count').textContent = character.votes;
  }

  votesForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const votesInput = document.getElementById('votes');
    const votes = parseInt(votesInput.value, 10);
    if (!isNaN(votes)) {
      characters[currentCharacterIndex].votes += votes;
      document.getElementById('vote-count').textContent = characters[currentCharacterIndex].votes;
      votesInput.value = '';
    }
  });

  resetBtn.addEventListener('click', () => {
    characters[currentCharacterIndex].votes = 0;
    document.getElementById('vote-count').textContent = 0;
  });

  // Bonus: Add new character
  if (characterForm) {
    characterForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const nameInput = document.getElementById('name');
      const imageUrlInput = document.getElementById('image-url');
      const newCharacter = {
        name: nameInput.value,
        votes: 0,
        image: imageUrlInput.value,
      };
      characters.push(newCharacter);
      updateCharacterBar();
      nameInput.value = '';
      imageUrlInput.value = '';
    });
  }

  let currentCharacterIndex = 0;
  updateCharacterBar();
  showCharacterInfo(currentCharacterIndex);
});
