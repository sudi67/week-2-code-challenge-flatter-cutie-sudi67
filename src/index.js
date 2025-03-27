document.addEventListener("DOMContentLoaded", () => {
  const characterBar = document.getElementById("character-bar");
  const characterName = document.getElementById("name");
  const characterImage = document.getElementById("image");
  const characterVotes = document.getElementById("vote-count");
  const votesForm = document.getElementById("votes-form");
  const votesInput = document.getElementById("votes");
  const resetVotesButton = document.getElementById("reset-btn");
  const characterForm = document.getElementById("character-form");
  let currentCharacter = null;
  let lastCharacterId = 0;

  fetch("http://localhost:3000/characters")
      .then(response => response.json())
      .then(characters => {
          characters.forEach(character => {
              addCharacterToBar(character)
              if(character.id > lastCharacterId){
                  lastCharacterId = character.id;
              }
          });
      });

  function addCharacterToBar(character) {
      const span = document.createElement("span");
      span.textContent = character.name;
      span.classList.add("character-item");
      span.addEventListener("click", () => displayCharacter(character));
      characterBar.appendChild(span);
  }

  function displayCharacter(character) {
      currentCharacter = character;
      characterName.textContent = character.name;
      characterImage.src = character.image;
      characterVotes.textContent = character.votes;
  }

  votesForm.addEventListener("submit", (e) => {
      e.preventDefault();
document.addEventListener("DOMContentLoaded", () => {
  const characterBar = document.getElementById("character-bar");
  const characterName = document.getElementById("name");
  const characterImage = document.getElementById("image");
  const characterVotes = document.getElementById("vote-count");
  const votesForm = document.getElementById("votes-form");
  const votesInput = document.getElementById("votes");
  const resetVotesButton = document.getElementById("reset-btn");
  const characterForm = document.getElementById("character-form");
  let currentCharacter = null;
  let lastCharacterId = 0;

  fetch("http://localhost:3000/characters")
      .then(response => response.json())
      .then(characters => {
          characters.forEach(character => {
              addCharacterToBar(character)
              if(character.id > lastCharacterId){
                  lastCharacterId = character.id;
              }
          });
      });

  function addCharacterToBar(character) {
      const span = document.createElement("span");
      span.textContent = character.name;
      span.classList.add("character-item");
      span.addEventListener("click", () => displayCharacter(character));
      characterBar.appendChild(span);
  }

  function displayCharacter(character) {
      currentCharacter = character;
      characterName.textContent = character.name;
      characterImage.src = character.image;
      characterVotes.textContent = character.votes;
  }

      e.preventDefault();
      if (currentCharacter) {
          currentCharacter.votes += parseInt(votesInput.value, 10) || 0;
          characterVotes.textContent = currentCharacter.votes;
          votesInput.value = "";
      }
  });

  // Edit button functionality
  document.getElementById("edit-btn").addEventListener("click", (e) => {
      e.preventDefault();
      if (currentCharacter) {
          const updatedName = prompt("Enter new name:", currentCharacter.name);
          const updatedImage = prompt("Enter new image URL:", currentCharacter.image);
          if (updatedName && updatedImage) {
              currentCharacter.name = updatedName;
              currentCharacter.image = updatedImage;
              fetch(`http://localhost:3000/characters/${currentCharacter.id}`, {
                  method: 'PUT',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(currentCharacter)
              });
              displayCharacter(currentCharacter); // Update the displayed character info
          }
      }
  });

  // Delete button functionality
  document.getElementById("delete-btn").addEventListener("click", (e) => {
      e.preventDefault();
      if (currentCharacter) {
          fetch(`http://localhost:3000/characters/${currentCharacter.id}`, {
              method: 'DELETE'
          }).then(() => {
              characterName.textContent = "Character's Name";
              characterImage.src = "assets/dummy.gif"; // Reset to dummy image
              characterVotes.textContent = "Character's Votes";
              currentCharacter = null; // Clear current character
          });
      }
  });
      e.preventDefault();
      if (currentCharacter) {
          currentCharacter.votes += parseInt(votesInput.value, 10) || 0;
          characterVotes.textContent = currentCharacter.votes;
          votesInput.value = "";
      }
  });

  resetVotesButton.addEventListener("click", () => {
      if (currentCharacter) {
          currentCharacter.votes = 0;
          characterVotes.textContent = "0";
      }
  });


  characterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const newCharacterName = document.querySelector("#new-name");
      const newCharacterImage = document.querySelector("#image-url");
      const newCharacter = {
          id: ++lastCharacterId,
          name: newCharacterName.value,
          image: newCharacterImage.value,
          votes: 0,
      };
      fetch("http://localhost:5000/characters",{
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(newCharacter)
      })
  });
});
