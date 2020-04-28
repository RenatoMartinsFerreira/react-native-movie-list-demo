# Movie List App

 Projeto desenvolvido para pleitear vaga de desenvolvedor React Native.

## Preparação do ambiente
Para o funcionamento da aplicação é necessário informar o client ID do Trakt API e a API Key do TMDB no arquivo ```webjumpMovieListApp/.env```

```bash
TRAKT_API_KEY=[YOUR_TRAKT_CLIENT_ID]
TMDB_API_KEY=[YOUR_TMDB_API_KEY_V3]
```
Mais informações

Trakt: https://trakt.tv/oauth/applications/new

TMDB: https://www.themoviedb.org/settings/api

## Instalação

 Instalação via yarn.


## Instalação Android

```bash
cd webjumpMovieListApp
yarn
yarn android 
```


## Instalação IOS

```bash
cd webjumpMovieListApp
yarn
cd ios
pod install
cd ..
yarn ios 
```

## Protótipo

 O protótipo de alta fidelidade foi desenvolvido utilizando Figma.

[Link para o projeto](https://www.figma.com/file/5yjCvkMkkxcJzx3fkdb6mD/webjump-movie-list?node-id=1%3A2)


## API

 Foi determinado o consumo da API [Trakt](https://trakt.docs.apiary.io/), em razão da falta de imagens para contemplar o layout foi escolhida a API [TMDB](https://developers.themoviedb.org/3) para complementar a Trakt.

## Arquitetura
 Foi utilizada arquitetura MVVM em conjunto com redux-persist para gerenciamento de estado e persistência dos dados.
## License
[MIT](https://choosealicense.com/licenses/mit/)