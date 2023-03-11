# E-commerce API

## Parte 1

1. Deve criar um pedido com 3 produtos (com descrição, preço e quantidade) e calcular o valor total
2. Deve criar um pedido com 3 produtos, associar um cupom de desconto e calcular o total (percentual sobre o total do pedido)
3. Não deve criar um pedido com cpf inválido (lançar algum tipo de erro)

## Parte 2

1. Não deve aplicar cupom de desconto expirado
2. Ao fazer um pedido, a quantidade de um item não pode ser negativa
3. Ao fazer um pedido, o mesmo item não pode ser informado mais de uma vez
4. Nenhuma dimensão do item pode ser negativa
5. O peso do item não pode ser negativo
6. Deve calcular o valor do frete com base nas dimensões (altura, largura e profundidade em cm) e o peso dos produtos (em kg)
7. Deve retornar o preço mínimo de frete caso ele seja superior ao valor calculado

### Considere

O valor mínimo é de R$10,00
Por enquanto, como não temos uma forma de calcular a distância entre o CEP de origem e destino, será de 1000 km (fixo)
Utilize a fórmula abaixo para calcular o valor do frete

### Fórmula de Cálculo do Frete

Valor do Frete = distância (km) * volume (m3) * (densidade/100)

## Parte 3

1. Deve gerar o código do pedido
2. Deve fazer um pedido, salvando no banco de dados
3. Deve simular o frete, retornando o frete previsto para o pedido
4. Deve validar o cupom de desconto, indicando em um boolean se o cupom é válido

### Considere

O código do pedido é formado por AAAAPPPPPPPP onde AAAA representa o ano e o PPPPPPPP representa um sequencial do pedido.

## To-do

-[ ] Implementar TypeORM ou Prisma
