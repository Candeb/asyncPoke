const inputNumber = document.getElementById('input-number');
const btnBuscar = document.getElementById('btn-number');
const cardContainer = document.getElementById('card-container');

const reset = (input) => {
  input.value = '';
};

const isEmpty = () => {
  const pokemon = +inputNumber.value.trim();

  if (!pokemon) {
    showError(pokemon, 'Es necesario ingresar un número');
    cardContainer.innerHTML = '';
    reset(inputNumber);
  } else {
    showSuccess(inputNumber);
    renderSearchedPoke();
    reset(inputNumber);
  }
};

const showError = (input, mensaje) => {
  inputNumber.classList.add('error');
  const errorMsj = document.getElementById('msjerror');
  errorMsj.textContent = mensaje;
};

const showSuccess = (input) => {
  input.classList.remove('error');
  const errorMsj = document.getElementById('msjerror');
  errorMsj.textContent = '';
};

const renderSearchedPoke = async () => {
  const pokemon = +inputNumber.value.trim();
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    );
    const data = await response.json();
    console.log('POKEBUSCADO', data);
    const html = `
    <div class="img-container">
    <img
      src="${data.sprites.front_default}"
      alt="imagen de pokemon"/>
    </div>
    <div class="data-container">
    <ul>
      <li>Nombre: ${data.name.toUpperCase()}</li>
      <li>Altura: ${data.height / 10}m</li>
      <li>Peso: ${data.weight / 10}kg</li> 
    </ul>  
        <div class="types">
    ${data.types
      .map((tipo) => {
        return `<span class="${
          tipo.type.name
        } poke_type"> ${tipo.type.name.toUpperCase()} </span>`;
      })
      .join('')}
        </div>
    
  </div>
`;
    cardContainer.innerHTML = html;
  } catch (error) {
    const mal = `
    <div class="error-nro">
    <p class="error-nro-mje"> No encontramos pokemones con ese número </p>
    <img src="assets/errornumeropoke.png" alt="Pikachu triste">
</div>`;
    cardContainer.innerHTML = mal;
  }
};

const init = () => {
  btnBuscar.addEventListener('click', isEmpty);
};

init();
