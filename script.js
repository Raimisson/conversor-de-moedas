const API_URL = 'https://api.frankfurter.dev/v1/latest';

const valorInput = document.getElementById('valor');
const moedaOrigemSelect = document.getElementById('moedaOrigem');
const moedaDestinoSelect = document.getElementById('moedaDestino');
const inverterBtn = document.getElementById('inverter');
const resultadoEl = document.getElementById('resultado');
const moedaResultadoEl = document.getElementById('moedaResultado');
const dataCotacaoEl = document.getElementById('dataCotacao');

// Taxas da moeda de origem atual, vindas da API: { base, date, rates: { BRL, USD, EUR } }
let taxasAtuais = null;

function formatarData(dataISO) {
  const [ano, mes, dia] = dataISO.split('-');
  return `${dia}/${mes}/${ano}`;
}

function mostrarErro(mensagem) {
  dataCotacaoEl.textContent = mensagem;
  dataCotacaoEl.classList.add('erro');
}

async function buscarTaxas(base) {
  dataCotacaoEl.textContent = 'Buscando cotação...';
  dataCotacaoEl.classList.remove('erro');

  try {
    const url = `${API_URL}?base=${base}&symbols=BRL,USD,EUR`;
    const resposta = await fetch(url);

    if (!resposta.ok) {
      throw new Error(`Erro na API: ${resposta.status}`);
    }

    const dados = await resposta.json();

    if (!dados.rates || !dados.date) {
      throw new Error('Resposta inesperada da API');
    }

    taxasAtuais = {
      base,
      date: dados.date,
      rates: { ...dados.rates, [base]: 1 }
    };

    converter();
  } catch (erro) {
    mostrarErro('⚠️ Não foi possível obter a cotação. Verifique sua conexão e tente novamente.');
  }
}

function converter() {
  if (!taxasAtuais || taxasAtuais.base !== moedaOrigemSelect.value) {
    return;
  }

  const valor = parseFloat(valorInput.value) || 0;
  const destino = moedaDestinoSelect.value;
  const taxa = taxasAtuais.rates[destino];

  if (taxa === undefined) {
    mostrarErro('⚠️ Cotação indisponível para essa moeda.');
    return;
  }

  const resultado = valor * taxa;
  resultadoEl.textContent = resultado.toFixed(2);
  moedaResultadoEl.textContent = destino;
  dataCotacaoEl.textContent = `Cotação de ${formatarData(taxasAtuais.date)}`;
  dataCotacaoEl.classList.remove('erro');
}

inverterBtn.addEventListener('click', () => {
  const origem = moedaOrigemSelect.value;
  moedaOrigemSelect.value = moedaDestinoSelect.value;
  moedaDestinoSelect.value = origem;
  buscarTaxas(moedaOrigemSelect.value);
});

moedaOrigemSelect.addEventListener('change', () => buscarTaxas(moedaOrigemSelect.value));
moedaDestinoSelect.addEventListener('change', converter);
valorInput.addEventListener('input', converter);

buscarTaxas(moedaOrigemSelect.value);
