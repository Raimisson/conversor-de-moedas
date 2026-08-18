// Tabela de taxas fixas: quantas unidades de BRL equivalem a 1 unidade da moeda
const rates = {
  BRL: 1,
  USD: 5.40,
  EUR: 5.85
};

const valorInput = document.getElementById('valor');
const moedaOrigemSelect = document.getElementById('moedaOrigem');
const moedaDestinoSelect = document.getElementById('moedaDestino');
const inverterBtn = document.getElementById('inverter');
const resultadoEl = document.getElementById('resultado');
const moedaResultadoEl = document.getElementById('moedaResultado');

function converter() {
  const valor = parseFloat(valorInput.value) || 0;
  const origem = moedaOrigemSelect.value;
  const destino = moedaDestinoSelect.value;

  const valorEmBRL = valor * rates[origem];
  const resultado = valorEmBRL / rates[destino];

  resultadoEl.textContent = resultado.toFixed(2);
  moedaResultadoEl.textContent = destino;
}

inverterBtn.addEventListener('click', () => {
  const origem = moedaOrigemSelect.value;
  moedaOrigemSelect.value = moedaDestinoSelect.value;
  moedaDestinoSelect.value = origem;
  converter();
});

[valorInput, moedaOrigemSelect, moedaDestinoSelect].forEach(el => {
  el.addEventListener('input', converter);
});

converter();
