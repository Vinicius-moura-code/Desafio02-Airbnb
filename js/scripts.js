const api = "https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72";

// Selecionar o elemento HTML

const cardsCounteudo = document.querySelector("#cards");

let data = [];

//Buscar os dados na api

async function buscarCards() {
  let resposta = await fetch(api);

  const dataResposta = await resposta.json();

  return dataResposta;
}

// Mapear e gerar cada card

function gerarCards(cards) {
  cardsCounteudo.innerHTML = "";
  cards.map(renderCard);
}

// Gerar o card

function renderCard(card) {
  var div = document.createElement("div");
  div.className = "item";

  var cardImage = document.createElement("img");
  cardImage.className = "card-image";
  cardImage.src = card.photo;

  var propriedadeTipo = document.createElement("p");
  propriedadeTipo.className = "card-type";
  propriedadeTipo.innerHTML = card.property_type;

  var firstP = document.createElement("p");
  firstP.innerHTML = card.name;

  var secondP = document.createElement("p");
  secondP.innerHTML = `Valor por noite: <b class="card-price">R$${card.price},00</b>`;

  div.appendChild(cardImage);
  div.appendChild(propriedadeTipo);
  div.appendChild(firstP);
  div.appendChild(secondP);

  cardsCounteudo.appendChild(div);
}

// principal

async function main() {
  data = await buscarCards();

  if (data[0]) {
    gerarCards(data);
  }
}

main();

// Ordenar cards

function ordernamCres() {
  data.sort(function (a, b) {
    return a.name > b.name ? 1 : b.name > a.name ? -1 : 0;
  });
  //gerar cards com ordenacao
  gerarCards(data);
}

function ordemDecres() {
  data.sort(function (a, b) {
    return a.name < b.name ? 1 : b.name < a.name ? -1 : 0;
  });
  //gerar cards com ordenacao
  gerarCards(data);
}

function menorPreco() {
  data.sort(function (a, b) {
    return a.price > b.price ? 1 : b.price > a.price ? -1 : 0;
  });
  //gerar cards com ordenacao
  gerarCards(data);
}

function maiorPreco() {
  data.sort(function (a, b) {
    return a.price < b.price ? 1 : b.price < a.price ? -1 : 0;
  });
  //gerar cards com ordenacao
  gerarCards(data);
}

// Filtrar pelo nome
function handleSearch() {
  //Pega o valor do input e converte para Upper
  let valueInput = document.querySelector("#searchInput").value.toUpperCase();
  //Busca os valores em data e realiza um filter neles
  const filteredResults = data.filter((places) => {
    //converte todos os name para Upper
    const placesToSearchByName = places.name.toUpperCase();
    //Verifica se tem valores iguais (compara o name com o input)
    if (placesToSearchByName.search(valueInput) > -1) {
      //se tiver, retorna o array para o filter
      return places;
    }
  });
  // se houver dados no array de comparacao, gera os cards.
  gerarCards(filteredResults);
}
