document.getElementById("search-btn").addEventListener("click", () => {
  const input = document
    .getElementById("pokemon-input")
    .value.trim()
    .toLowerCase();
  console.log(`User input: ${input}`);
  if (!input) {
    displayMessage("Please enter a Pokémon name or ID.", "warning");
    return;
  }

  fetchPokemon(input);
});

async function fetchPokemon(nameOrId) {
  const resultDiv = document.getElementById("result");

  try {
    console.log(`Searching for Pokémon: ${nameOrId}`);

    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${nameOrId}`);
    if (!res.ok) throw new Error("Pokémon not found");

    const data = await res.json();

    resultDiv.innerHTML = `
      <div class="card mx-auto shadow-sm" style="max-width: 300px;">
        <img src="${data.sprites.front_default}" class="card-img-top" alt="${
      data.name
    }">
        <div class="card-body">
          <h5 class="card-title text-capitalize">${data.name} (#${data.id})</h5>
          <p class="card-text">
            <strong>Height:</strong> ${data.height} <br>
            <strong>Weight:</strong> ${data.weight} <br>
            <strong>Type(s):</strong> ${data.types
              .map((t) => t.type.name)
              .join(", ")}
          </p>
        </div>
      </div>
    `;
  } catch (err) {
    displayMessage(`Error: ${err.message}`, "danger");
  }
}

function displayMessage(msg, type = "info") {
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = `<div class="alert alert-${type}">${msg}</div>`;
}
