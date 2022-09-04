# veeder-root-tls

![npm](https://img.shields.io/npm/v/veeder-root-tls)
![npm](https://img.shields.io/npm/dt/veeder-root-tls)
[![install size](https://packagephobia.com/badge?p=veeder-root-tls)](https://packagephobia.com/result?p=veeder-root-tls)

Biblioteca para comunicação com medidores eletrônicos Veeder Root.

> Você pode encontrar a documentação oficial do Veeder Root utilizada para o desenvolvimento dessa biblioteca [aqui](https://accuflo.com/pdf/veeder/577013-950.pdf).

## Conteúdo

- [Instalação](#instalação)
- [Conectando ao ATG](#conectando-com-o-atg)
- [Relatório dos tanques (estoque, água, etc.)](#relatório-dos-tanques)

## Instalação

Com o NPM:

```bash
npm i veeder-root-tls
```

Com o yarn:

```bash
yarn add veeder-root-tls
```

## Conectando com o ATG

```js
const { Tls } = require('veeder-root-tls');

const tls = new Tls('<IP>');
```

## Relatório dos tanques

```js
const responseTanks = await tls.getTanks();

responseTanks.tanks.forEach((tank) => {
  console.log('Tanque: ' + tank.id);
  console.log('Volume: ' + tank.volume);
  console.log('Altura: ' + tank.height);
  console.log('Produto: ' + tank.productCode);
  console.log('Temperatura: ' + tank.temperature);
  console.log();
});
```
