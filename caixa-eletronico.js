const formCurrency = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2
});

const cedulas_disponiveis = [
    { valor: 200, qtd: parseInt(Math.random() * 10) },
    { valor: 100, qtd: parseInt(Math.random() * 10) },
    { valor: 50, qtd: parseInt(Math.random() * 10) },
    { valor: 20, qtd: parseInt(Math.random() * 10) },
    { valor: 10, qtd: parseInt(Math.random() * 10) },
    { valor: 5, qtd: parseInt(Math.random() * 10) },
    { valor: 2, qtd: parseInt(Math.random() * 10) },
    { valor: 1, qtd: parseInt(Math.random() * 10) },
    { valor: 0.5, qtd: parseInt(Math.random() * 10) },
    { valor: 0.25, qtd: parseInt(Math.random() * 10) },
    { valor: 0.1, qtd: parseInt(Math.random() * 10) },
    { valor: 0.05, qtd: parseInt(Math.random() * 10) },
];
console.log('Cedulas Disponíveis')
console.log(cedulas_disponiveis)

let saldo_cliente = parseInt(Math.random() * 1000);

const ConsultarSaldo = (arrCed) => arrCed.reduce((acu, cedl) => acu + (cedl.valor * cedl.qtd), 0);
const ConsultarSaldoCedula = (arrCed, vSaque) => {
    return ConsultarSaldo(arrCed.filter(ced => vSaque >= ced.valor));
};

const CalcularCedulasSaque = (valor, ncedula = 0) => {
    let arraySaqueCedulas = [];

    while (cedulas_disponiveis[ncedula] && valor > 0) {
        valor = parseFloat(valor).toFixed(2);

        if (valor >= cedulas_disponiveis[ncedula].valor && cedulas_disponiveis[ncedula].qtd > 0) {
            let quantidadeCedulas = 0;
            if (valor <= (cedulas_disponiveis[ncedula].valor * cedulas_disponiveis[ncedula].qtd)) {
                quantidadeCedulas = parseInt(valor / cedulas_disponiveis[ncedula].valor);

                arraySaqueCedulas = [...arraySaqueCedulas, { valor: cedulas_disponiveis[ncedula].valor, qtd: quantidadeCedulas }];/**Adicionando cedulas para o retorno */
                valor -= cedulas_disponiveis[ncedula].valor * quantidadeCedulas;/**Diminuindo valor de saque */
                cedulas_disponiveis[ncedula].qtd -= quantidadeCedulas;/**Retirando do caixa */

            } else {
                quantidadeCedulas = cedulas_disponiveis[ncedula].qtd;

                arraySaqueCedulas = [...arraySaqueCedulas, { valor: cedulas_disponiveis[ncedula].valor, qtd: quantidadeCedulas }];/**Adicionando cedulas para o retorno */
                valor -= cedulas_disponiveis[ncedula].valor * cedulas_disponiveis[ncedula].qtd;/**Diminuindo valor de saque */
                cedulas_disponiveis[ncedula].qtd -= quantidadeCedulas;/**Retirando do caixa */
            }

        } else {
            /**Próxima cédula */
            arraySaqueCedulas = arraySaqueCedulas.concat(CalcularCedulasSaque(valor, ncedula + 1));
            break;
        }
    }

    return arraySaqueCedulas;

};

const Sacar = (valorSaque) => {
    let message = "";
    const valorCaixaCedula = ConsultarSaldoCedula(cedulas_disponiveis, valorSaque);

    message += `-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-`;
    message += `\nValor do Saque: ${formCurrency.format(valorSaque)}\n`;
    if (valorSaque <= valorCaixaCedula) {
        if (saldo_cliente >= valorSaque) {
            const result = CalcularCedulasSaque(valorSaque);
            message += `\nSaldo Inicial: ${formCurrency.format(saldo_cliente)}\n`;
            result.map(e => {
                message += `\n${e.qtd} ${e.valor <= 1 ? "moeda" : "cédula"}${e.qtd == 1 ? "" : "s"} de ${formCurrency.format(e.valor)}.`;
            });
            saldo_cliente -= ConsultarSaldo(result);
            message += `\n\nSaldo Final: ${formCurrency.format(saldo_cliente)}`;
        } else {
            message += `\nO valor de saque é maior que o valor em saldo.\nSeu Saldo é de ${formCurrency.format(saldo_cliente)}`;
        }
    } else {
        message += `\nEste caixa não possui o valor total para esse saque.\nO valor disponível neste caixa é de ${formCurrency.format(valorCaixaCedula)}.`;
    }

    return message;
};

console.log(Sacar(parseFloat(Math.random() * 100).toFixed(2)));
console.log(Sacar(parseFloat(Math.random() * 100).toFixed(2)));
console.log(Sacar(parseFloat(Math.random() * 10).toFixed(2)));
console.log(Sacar(parseFloat(Math.random() * 10).toFixed(2)));
console.log(Sacar(parseFloat(Math.random() * 10).toFixed(2)));
console.log(Sacar(parseFloat(Math.random() * 10).toFixed(2)));