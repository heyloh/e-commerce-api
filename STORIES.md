# Clean E-commerce

## Parte 1

Vamos implementar um sistema de vendas online com a possibilidade de realizar pedidos com múltiplos itens, cada um deles com uma quantidade variável, calculando o frete, os impostos, aplicando um cupom de desconto e ainda interagindo com o estoque. Além disso teremos ainda fluxos de pagamento e cancelamento do pedido realizado.

Para começar, faremos um projeto estruturado de forma simples, faça do jeito que você souber, depois vamos ir refatorando juntos.

### Testes
1. Deve criar um pedido com 3 produtos (com descrição, preço e quantidade) e calcular o valor total
2. Deve criar um pedido com 3 produtos, associar um cupom de desconto e calcular o total (percentual sobre o total do pedido)
3. Não deve criar um pedido com cpf inválido (lançar algum tipo de erro)

### Considere

Utilizar e refatorar o algoritmo de validação de cpf: https://github.com/rodrigobranas/cccat7_refactoring/blob/master/src/example2/cpfBefore.ts

### Sugestões

- Faça a modelagem da forma que desejar e não se preocupe por enquanto, vamos implementar juntos na aula seguinte com influências de DDD e Clean Architecture
- Utilize a sua linguagem e biblioteca de teste de sua preferência
- Devem existir no mínimo 2 arquivos, um de teste e outro que é a aplicação
- Como mecanismo de persistência você pode utilizar um banco de dados, um array em memória, um arquivo, qualquer coisa que desejar
- Como entrada você pode utilizar uma API HTTP, um CLI ou qualquer outro mecanismo que permita a entrada dos dados
- Tente seguir com disciplina, criando primeiro um teste que falha, depois fazendo e teste passar e refatorando

## Parte 2

### Testes

1. Não deve aplicar cupom de desconto expirado
2. Ao fazer um pedido, a quantidade de um item não pode ser negativa
3. Ao fazer um pedido, o mesmo item não pode ser informado mais de uma vez
4. Nenhuma dimensão do item pode ser negativa
5. O peso do item não pode ser negativo
6. Deve calcular o valor do frete com base nas dimensões (altura, largura e profundidade em cm) e o peso dos produtos (em kg)
7. Deve retornar o preço mínimo de frete caso ele seja superior ao valor calculado


### Considere

- O valor mínimo é de R$10,00
- Por enquanto, como não temos uma forma de calcular a distância entre o CEP de origem e destino, será de 1000 km (fixo)
- Utilize a fórmula abaixo para calcular o valor do frete

### Fórmula de Cálculo do Frete

Valor do Frete = distância (km) * volume (m3) * (densidade/100)

#### Exemplos de volume ocupado (cubagem)

Camera: 20cm x 15 cm x 10 cm = 0,003 m3
Guitarra: 100cm x 30cm x 10cm = 0,03 m3
Geladeira: 200cm x 100cm x 50cm = 1 m3

#### Exemplos de densidade

Camera: 1kg / 0,003 m3 = 333kg/m3
Guitarra: 3kg / 0,03 m3 = 100kg/m3
Geladeira: 40kg / 1 m3 = 40kg/m3

#### Exemplos

produto: Camera
distância: 1000 (fixo)
volume: 0,003
densidade: 333
preço: R$9,90 (1000 * 0,003 * (333/100))
preço mínimo: R$10,00

produto: Guitarra
distância: 1000 (fixo)
volume: 0,03
densidade: 100
preço: R$30,00 (1000 * 0,03 * (100/100))

produto: Geladeira
distância: 1000 (fixo)
volume: 1
densidade: 40
preço: R$400,00 (1000 * 1 * (40/100))

## Parte 3

### Testes

1. Deve gerar o código do pedido
2. Deve fazer um pedido, salvando no banco de dados
3. Deve simular o frete, retornando o frete previsto para o pedido
4. Deve validar o cupom de desconto, indicando em um boolean se o cupom é válido

### Considere

- O código do pedido é formado por AAAAPPPPPPPP onde AAAA representa o ano e o PPPPPPPP representa um sequencial do pedido

### Importante

- Implemente os DTOs para cada um dos use cases
- Utilize o banco de dados para obter e persistir os dados

## Parte 4

### Testes

1. Deve retornar um pedido com base no código (caso de uso)
2. Deve retornar a lista de pedidos (caso de uso)
3. Calcule a distância entre dois CEPs e utilize no algoritmo de cálculo do frete
4. Calcular frete (caso de uso)

### Considere

- Criar uma API (tanto faz se é REST, GraphQL ou qualquer outro formato) para os casos de uso
- Criar testes de integração para a API e os casos de uso
- Cadastrar no banco de dados 2 ou 3 CEPs e associar com as coordenadas das cidades dos CEPs, apenas para viabilizar os cálculos, não é necessário carregar a base de CEPs inteira
- Utilizar o algoritmo de cálculo e arquivo com as coordenadas: https://github.com/rodrigobranas/distance_calculator
