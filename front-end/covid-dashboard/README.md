# covid-dashboard

Dashboard interativo baseado nos [dados abertos do Governo Federal](https://covid.saude.gov.br/) sobre
o avanço do novo Coronavírus no país.

## Tecnologias utilizadas
- [TypeScript](http://typescriptlang.org/)
- [React.js](http://reactjs.org/)
- [Axios](https://github.com/axios/axios) (para solicitações HTTP)
- [Vega](http://vega.github.io/) (para gráficos)
- [SASS](https://sass-lang.com/) (para pré-processamento CSS)
- [PostCSS](https://github.com/postcss/postcss) (para pós-processamento CSS)
- [Eslint](https://eslint.org/) (linter JavaScript/TypeScript)
- [Stylelint](https://stylelint.io/) (linter CSS/SASS)
- [Webpack](https://webpack.js.org/) (para empacotamento)

## Pré-requisitos
- [Node.js](http://nodejs.org/) >= 10

## Desenvolvimento e deploy
1. Instale a dependências com `npm` ou `yarn` (recomendado)
2. Execute `npm run watch` ou `yarn run watch` para rodar o dashboard
em modo de desenvolvimento, o qual estará disponível na porta 9000

No modo de desenvolvimento, a página é atualiza automaticamente conforme
o código é editado. Para passar os linters, execute `npm run lint` ou `yarn run lint`. para deploy execute `npm run build` ou `yarn run build`. A aplicação
compilada ficará na pasta `dist/`, já pronta para deploy como site estático.

## Notas
- Embora o Governo Federal forneça download dos dados como um "csv"
(o que na verdade é um xlsx), não há forma direta de obter esse arquivo.
Porém, após um pouco de investigação, o botão de download serve um arquivo
hospedado em uma instância do [Parse](https://parseplatform.org/) hospedada
na AWS (`https://xx9p7hp1p7.execute-api.us-east-1.amazonaws.com/`), com ID `unAFkcaNDeXajurGB7LChj8SgQYS2ptm`. Como estamos usando uma API
não exatamente pública (mas que deveria ser), essas informações podem
parar de funcionar sem aviso prévio.
- Para os mapas geográficos, foram utilizados dados da API de malhas
(https://servicodados.ibge.gov.br/api/docs/malhas) e localidades
(https://servicodados.ibge.gov.br/api/docs/localidades) do IBGE.
