# PROGETTO ANGULAR 1 PER NTT DATA

Questo è il link per provarlo online! [Clicca qui](https://progetto-angular-1.netlify.app/)!

## Come avviarlo dal proprio PC

- Duplicare il progetto sul proprio computer
- Aprire il terminale e usare il comando `npm install`
- una volta scaricati tutti i file, digitare il comando `ng serve` e cliccare sul link che verrà generato

## Struttura del sito

il sito è strutturato da 5 pagine:

- la prima pagina, ovvero quella di login
- la homePage
- la pagina con i dettagli degli utenti
- i posts di tutti gli utenti
- i todos, per vendere le cose pubblicate con le date

## Come posso fare il login al sito?

Per poter fare il login è possibile andando sul sito di [Go Rest](https://gorest.co.in/), fare il login sul sito, andare su "Api Tokens" e copiare il token presente o generarlo uno nuovo.

## Come è costituito a livello di codice?

All interno del progetto è possibile notare 3 cartelle principali, "components", dove è presente i componenti del progetto, create-commnet, create-post, create-user, user, header ed è presente anche un file module, chiamato "shared" dove ha tutti gli elementi comuni dei componenti del progetto. 

La seconda cartella "pages", dove sono presenti le pagine del sito web, home, posts, todos, user-detail, login. 

Per ultima abbiamo i "services", dove sono presenti due file, "auth.guard" con all'interno il codice che permette di "bloccare" il sito e riportarlo nella pagina di login, in caso l'utente provasse a cercare direttamente sulla barra di ricerca il link per andare nei posts, nella home o in qualsiasi altra pagina del web, mentre l altro file, "auth" ha tutte le principali funzioni che servono per il funzionamenti del sito. All interno del file è possibile notare che è suddiviso a gruppi, nella prima parte sono presenti le funzioni per acquisire il token per avere accesso al sito, nel secondo gruppo è presente tutta la parte per la creazione dell'utente, del post e del commento, nel terzo gruppo per eliminare i post e gli utenti, nel quarto gruppo per ottenere le informazioni per gli utenti, i post, i commenti, i todos attraverso le api, grazie anche alla verifica del token, il quale, in caso il token non fosse giusto, andrebe a mostrare un errore che non è stato possibile trovare le informazioni richieste, infine l'ultima funzione è per effettuare il logout del sito. Sempre all'interno della cartella è presente una sotto cartella chiamata "models", dove si trova il file "interface" ed all interno sono presenti le interfacce per le varie richieste al sito web di Go Rest.

## Caratteristiche del codice

- Il codice ha il lazy loading, cioè è stato ottimizzato per utilizzare i moduli o componenti solo quando è necessario.
- Tutta la parte visiva è stata fatta con angualr material.
- in questo progetto è stato usato RXJS (è una libreria per la programmazione reattiva che utilizza osservabili per comporre programmi asincroni o basati su eventi utilizzando sequenze di dati osservabili.)

## Avviare la parte di test

per avviare la parte di test del codice bisogna andare sul terminale e scrivere il comando `ng test` ed aprirà una pagina web con tutti i test creati (68 test fatti) che vanno a controllare che tutti gli elementi di questo sito web siano giusti e che funzionino perfettamente
