// buttons
const buttonSortear = document.getElementsByClassName("btn")[0];
const buttonRifa = document.getElementsByClassName("btn")[1];

// configuração do intervalo
const valorInicial = document.getElementsByClassName("interval")[0];
const valorFinal = document.getElementsByClassName("interval")[1];
const quantNumeros = document.getElementsByClassName("interval")[2];
const naoSortear = document.getElementsByClassName("interval")[3];
const check = document.getElementsByClassName("check")[0];

// elemento que receberá valores de exibição
let display = document.getElementById("display");

// função que transforma uma string de números em array
function transformArray(stringNumber) {
  let stringAux = "";
  let arrayNumero = [];
  stringNumber += " f"; // pra achar o ultimo número
  for (numero of stringNumber) {
    if (numero == " ") {
      if (!isNaN(parseFloat(stringAux)) && isFinite(stringAux)) {
        arrayNumero.push(parseInt(stringAux));
        stringAux = "";
      } else {
        stringAux = "";
      }
    } else {
      stringAux += numero;
    }
  }
  return arrayNumero;
}

// função que verifica se um número está dentro de uma string
function verificaNumero(numero, array) {
  for (n of array) {
    if (n == numero) {
      return true;
    }
  }
  return false;
}

// função sortear
function sortear() {
  // condição para o usuário não colocar números negativos
  if (valorInicial.value < 0) {
    valorInicial.value = 1;
  }

  // condição para que o valor final seja sempre maior que o valor inicial
  if (valorFinal.value < valorInicial.value) {
    valorFinal.value = parseInt(valorInicial.value) + 1;
  }

  // variaveis do intervalo
  let numeros = [];
  let max = parseInt(valorFinal.value);
  let min = parseInt(valorInicial.value);
  let quantosNumerosSortear = parseInt(quantNumeros.value);
  let excluidos = transformArray(naoSortear.value);

  // variaveis auxiliares
  let aux;
  let metadeDeSorteados = quantosNumerosSortear / 2;

  // condição que não deixa sortear mais números do o valor final
  if (
    quantNumeros.value > max ||
    excluidos.length + quantosNumerosSortear >= max ||
    quantNumeros.value < 1
  ) {
    quantNumeros.value = 1;
  }

  // a qunatidade de números excluídos não pode
  // passar da metade da quantidade de números sorteados (loop infinito)
  if (excluidos.length >= metadeDeSorteados) {
    alert("Você não pode usar esse intervalo. Tente de novo");
    return numeros;
  }

  // loop de sorteio
  for (let i = 1; i <= quantNumeros.value; i++) {
    aux = Math.floor(Math.random() * (max - min + 1)) + min;

    if (!check.checked) {
      if (verificaNumero(aux, excluidos) || verificaNumero(aux, numeros)) {
        i -= 1;
      } else {
        numeros.push(aux);
      }
    } else {
      if (verificaNumero(aux, excluidos)) {
        i -= 1;
      } else {
        numeros.push(aux);
      }
    }
  }

  return numeros;
}

buttonSortear.onclick = mostrar;

function mostrar() {
  // lista de numeros
  let lista = sortear();

  // caso a lista esteja vazia
  if (lista.length == 0) {
    return;
  }

  // Substituindo tudo dentro da ul
  let primeiroElemento = lista.shift();
  let abertura =
    "<li style='list-style-type: none; color: gold; display: inline-block; margin: 20px; font-size: 50px; font-family:Courier; font-weight:bold'>";
  let fechamento = "</li>";
  display.innerHTML = abertura + primeiroElemento + fechamento;

  // loop que exibe os números restantes
  for (let numero of lista) {
    display.innerHTML += abertura + numero + fechamento;
  }
}
