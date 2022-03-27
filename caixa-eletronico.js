const formCurrency = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2
});

const cedulas = [200, 100, 50, 20, 10, 5, 2, 1, 0.5, 0.25, 0.1, 0.05];

const cedulas_disponiveis = cedulas.map(valor => { return { valor, qtd: parseInt(Math.random() * 10) } });
console.log('Cedulas Disponíveis')
console.log(cedulas_disponiveis)

let saldo_cliente = parseInt(Math.random() * 1000);

const ConsultarSaldo = (arrCed) => arrCed.reduce((acu, cedl) => acu + (cedl.valor * cedl.qtd), 0);
const ConsultarSaldoCedula = (arrCed, vSaque) => { ConsultarSaldo(arrCed.filter(ced => vSaque >= ced.valor)); };

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
            arraySaqueCedulas = [...arraySaqueCedulas, ...CalcularCedulasSaque(valor, ncedula + 1)];
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
            result.map(e => { message += `\n${e.qtd} ${e.valor <= 1 ? "moeda" : "cédula"}${e.qtd == 1 ? "" : "s"} de ${formCurrency.format(e.valor)}.`; });
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

const pesoSaque = [100, 100, 10, 10, 10, 10];

for (let index = 0; index < pesoSaque.length; index++) {
    const element = pesoSaque[index];
    console.log(Sacar(parseFloat(Math.random() * element).toFixed(2)))
}