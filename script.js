document.querySelector('#money').addEventListener('input', function () {
  const balance = Number(document.querySelector('#balance').value);
  const balanceMachine = Number(document.querySelector('#balance-machine').value);
  const max = Math.min(balance, balanceMachine);

  document.querySelector('#money').setAttribute('max', max);
})

function statement(text) {
  const rows = text.split('\n').length;
  return `
    <textarea class="form-control" rows="${rows}" readonly>${text}</textarea>
  `;
}

function calculate(event) {
  event.preventDefault();

  const value = Number(event.target.money.value);

  const notas = [100, 50, 20, 10, 5, 2, 1, 0.5, 0.25, 0.1, 0.05, 0.01];
  let result = value;
  let resultText = '';

  for (let i = 0; i < notas.length; i++) {
    const nota = notas[i];
    const qtd = Math.floor(result / nota);

    if (qtd > 0) {
      resultText += `${qtd} ${nota >= 2 ? "nota" : "moeda"}${qtd > 1 ? "s" : ""} de R$ ${nota.toFixed(2)}\n`;
      result = result % nota;
    }
  }

  document.querySelector('#statement').innerHTML = statement(resultText);
}

function resetForm() {
  document.querySelector('#statement').innerHTML = '';
}