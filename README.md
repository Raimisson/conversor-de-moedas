# Conversor de Moedas

Conversor simples em HTML, CSS e JavaScript para converter valores entre Real (BRL), Dólar (USD) e Euro (EUR).

## Como funciona

O conversor busca a cotação real das moedas através da [API gratuita do Frankfurter](https://api.frankfurter.dev/v1/latest), que não exige chave de acesso. As taxas são atualizadas automaticamente sempre que a moeda de origem é alterada, e o resultado é recalculado em tempo real conforme o valor ou as moedas são alterados.

A data da última cotação obtida é exibida abaixo do resultado.

**É necessário estar conectado à internet** para que a conversão funcione, já que as taxas não ficam mais fixas no código — elas são buscadas na API a cada troca de moeda de origem.

### Tratamento de erro

Se a busca da cotação falhar (sem conexão com a internet, API fora do ar, ou resposta inesperada), o conversor exibe uma mensagem de erro clara na tela (⚠️ Não foi possível obter a cotação. Verifique sua conexão e tente novamente.) em vez de travar a página, mantendo o último resultado calculado visível.

## Como usar

Basta abrir o arquivo `index.html` em um navegador.

## Estrutura do projeto

- `index.html` — estrutura da página
- `style.css` — estilos visuais
- `script.js` — lógica de busca de cotação e conversão
