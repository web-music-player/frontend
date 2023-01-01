# Web Music Player

Questa repository contiene il codice di **frontend** del progetto Web Music Player. 

# Come avviare il progetto

Il frontend è live all'URL [https://wmp-frontend.netlify.app](https://wmp-frontend.netlify.app). Qui è possibile testare alcune funzionalità del sito che sfruttano le API sviluppate nel backend.

Se il sito dovesse essere offline, è possibile eseguire il progetto localmente in questo modo:

1. Clonare il progetto
2. Eseguire ```cd frontend``` per entrare nella cartella
4. Eseguire ```npm install``` per installare le librerie del progetto
5. Eseguire ```npm start``` per avviare il programma in locale

Se il backend dovesse essere offline:

1. Recarsi alla repository del [backend](https://github.com/web-music-player/backend) del progetto e seguire i passi per eseguirlo in locale
2. Sostituire ```http://localhost:8080``` al nome dell'host nel file ```/src/main.ts```
3. Eseguire ```npm run dev```
