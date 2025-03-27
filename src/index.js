document.addEventListener('DOMContentLoaded', () => {
  const characterBar = document.getElementById('character-bar');
  const detailedInfo = document.getElementById('detailed-info');
  const votesForm = document.getElementById('votes-form');
  const resetBtn = document.getElementById('reset-btn');
  const characterForm = document.getElementById('character-form');

  let characters = [
    { name: 'Bear', votes: 0, image: 'https://media4.giphy.com/media/FArgGzk7KO14k/200.webp' },
    { name: 'Cheetah', votes: 0, image: 'https://media1.giphy.com/media/xT0xeompFlF9acs3vi/giphy.webp' },
    { name: 'Rabbits', votes: 0, image: 'https://media2.giphy.com/media/bXdjYegbUX3b2/giphy.webp' },
  ];

  let currentCharacterIndex = 0;

  /**
   * Update the character bar with the list of characters.
   */
  function updateCharacterBar() {
    characterBar.innerHTML = '';
    characters.forEach((character, index) => {
      const charDiv = document.createElement('div');
      charDiv.textContent = character.name;
      charDiv.setAttribute('role', 'button');
      charDiv.setAttribute('tabindex', '0');
      charDiv.addEventListener('click', () => showCharacterInfo(index));
      charDiv.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          showCharacterInfo(index);
        }
      });
      characterBar.appendChild(charDiv);
    });
  }

  /**
   * Show the detailed information of the selected character.
   * @param {number} index - The index of the character to display.
   */
  function showCharacterInfo(index) {
    currentCharacterIndex = index;
    const character = characters[index];
    document.getElementById('name').textContent = character.name;
    document.getElementById('image').src = character.image;
    document.getElementById('image').alt = character.name;
    document.getElementById('vote-count').textContent = character.votes;
  }

  /**
   * Handle the form submission to add votes.
   * @param {Event} event - The form submission event.
   */
  function handleVotesFormSubmit(event) {
    event.preventDefault();
    const votesInput = document.getElementById('votes');
    const votes = parseInt(votesInput.value, 10);
    if (isNaN(votes) || votes <= 0) {
      alert('Please enter a valid number of votes.');
      return;
    }
    characters[currentCharacterIndex].votes += votes;
    document.getElementById('vote-count').textContent = characters[currentCharacterIndex].votes;
    votesInput.value = '';
  }

  /**
   * Reset the votes for the current character.
   */
  function resetVotes() {
    characters[currentCharacterIndex].votes = 0;
    document.getElementById('vote-count').textContent = 0;
  }

  /**
   * Handle the form submission to add a new character.
   * @param {Event} event - The form submission event.
   */
  function handleCharacterFormSubmit(event) {
    event.preventDefault();
    const nameInput = document.getElementById('new-name');
    const imageUrlInput = document.getElementById('image-url');
    const newCharacter = {
      name: nameInput.value.trim(),
      votes: 0,
      image: imageUrlInput.value.trim(),
    };
    if (!newCharacter.name || !newCharacter.image) {
      alert('Please enter both name and image URL.');
      return;
    }
    characters.push(newCharacter);
    updateCharacterBar();
    nameInput.value = '';
    imageUrlInput.value = '';
  }

  // Event listeners
  votesForm.addEventListener('submit', handleVotesFormSubmit);
  resetBtn.addEventListener('click', resetVotes);
  if (characterForm) {
    characterForm.addEventListener('submit', handleCharacterFormSubmit);
  }

  // Initial setup
  updateCharacterBar();
  showCharacterInfo(currentCharacterIndex);
});
