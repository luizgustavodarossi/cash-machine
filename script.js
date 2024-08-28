document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('#balance').value = (Math.random() * 1000).toFixed(2);
  document.querySelector('#balance-machine').value = (Math.random() * 1000).toFixed(2);
})

document.querySelectorAll('#money, #balance, #balance-machine').forEach(function (element) {
  element.addEventListener('input', function () {
    const balance = parseFloat(document.querySelector('#balance').value) || 0;
    const balanceMachine = parseFloat(document.querySelector('#balance-machine').value) || 0;
    
    const max = Math.min(balance, balanceMachine);

    const moneyElement = document.querySelector('#money');
    if (moneyElement.getAttribute('max') !== max.toString()) {
      moneyElement.setAttribute('max', max);
    }
  })
})

function statement(text) {
  const rows = text.split('\n').length;
  return `
    <textarea class="form-control" rows="${rows}" readonly>${text}</textarea>
  `;
}

function calculate(event) {
  event.preventDefault();

  const value = parseFloat(event.target.money.value);

  const notas = [100, 50, 20, 10, 5, 2];
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

  if (result > 0.00) {
    resultText += `R$ ${result.toFixed(2)} restante\n`;
  }

  document.querySelector('#statement').innerHTML = statement(resultText);
}

function resetForm() {
  document.querySelector('#statement').innerHTML = '';
}