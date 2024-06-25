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

Non considerando la pagina di login, dove è presente l'inserimento del token, la prima pagina che si trova è la home.
La homePage è strutturata in tre parti:
<<<<<<< HEAD

- filtro
- creazione utente
- quantità di utenti trovati
- ed elenco utenti

Partendo dalla prima è possibile filtrare gli utenti in 4 modi: ID, email, gender e status.
nella crezione utente è possibile scegliere il nome, email, gender e status. L'ID viene assegnato in automatico, pertanto non è necessario scriverlo.
La quantità di utenti trovati sono 3 icone rappresentate rispettivamente dal numero 1, 5 e 9+, dove 1 mostra sino a 10 utenti, 5 sino a 50 e 9+ sino a 100 utenti.
Infine l elenco utenti è suddiviso in: ID, nome, email, gender, status, dettagli e elimina utente. elimina utente, come dice appunto il nome, basterà cliccare sul pulsante e comparirà una scritta se l'utente e stato eliminato con successo oppure no, mentre dettagli, porta su una pagina a parte dove sono presenti i principali dettagli dell'utente.

Nella pagina dettagli a primo impatto è possibile vedere 4 informazioni fondamentali dell'utente: nome, gender, email e ID. A seguire ci sarà la parte di creazione del post, dove l'ID in modo dinamico viene inserito e basterà inserire il titolo del post e la descrizione e se sarà stato fatto tutto correttamente, comparirà un messaggio nel quale dice che è stato creato con successo e comparirà il post. Adesso cliccando sul post non sarà presente alcun commento, ma compilando il riquadro grigio scuro sarà possibile crearne uno ed una volta cliccato "create comment" quest ultimo sarà presente sempre sopra la scritta "create comment".

Nella pagina Posts abbiamo un interfaccia simile a quella della home:

- filtro
- creazione post
- quantità di posts trovati
- ed elenco posts

il filtro in questo caso lo troviamo diverso, perchè per filtrare la ricerca ha: ID dell'utente, il titolo e la descrizione del post. Subito sotto troviamo la possibilità di creare un post, ma questa volta ID dell'utente sarà da inserire, insieme al titolo ed alla descrizione. Una volta creato il post comparirà un messaggio dove ci sarà scritto se è stato creato con successo o no. Come terzo elemento è presente la quantità di post trovati, che ha il funzionamento come per quello della home ed infine l'elenco dei posts dove le informazioni che troviamo sono: ID del post, ID dell'utente, il titolo, descrizione e la possibilità di eliminare il post. Cliccando su un post sarà possibile vedere se ci fossero dei commenti per quel post. (una precisazione: tutti gli ID che cominciano con "1" sono gli ID dei post, mentre quelli che cominciano cono "6" sono gli ID degli utenti)

Come prossima pagina è presente Todos, dove è struttara solo da due cose: quantità di informazioni trovate e dall elenco dei todos.

Saltando il primo, perchè è stato già visto precedentemente, nell elenco è possibile notare: ID del todos, ID dell'utente, titolo, data, ora e status.

=======
- filtro
- creazione utente
- quantità di utenti trovati
- ed elenco utenti

Partendo dalla prima è possibile filtrare gli utenti in 4 modi: ID, email, gender e status.
nella crezione utente è possibile scegliere il nome, email, gender e status. L'ID viene assegnato in automatico, pertanto non è necessario scriverlo.
La quantità di utenti trovati sono 3 icone rappresentate rispettivamente dal numero 1, 5 e 9+, dove 1 mostra sino a 10 utenti, 5 sino a 50 e 9+ sino a 100 utenti.
Infine l elenco utenti è suddiviso in: ID, nome, email, gender, status, dettagli e elimina utente. elimina utente, come dice appunto il nome, basterà cliccare sul pulsante e comparirà una scritta se l'utente e stato eliminato con successo oppure no, mentre dettagli, porta su una pagina a parte dove sono presenti i principali dettagli dell'utente.

Nella pagina dettagli a primo impatto è possibile vedere 4 informazioni fondamentali dell'utente: nome, gender, email e ID. A seguire ci sarà la parte di creazione del post, dove l'ID in modo dinamico viene inserito e basterà inserire il titolo del post e la descrizione e se sarà stato fatto tutto correttamente, comparirà un messaggio nel quale dice che è stato creato con successo e comparirà il post. Adesso cliccando sul post non sarà presente alcun commento, ma compilando il riquadro grigio scuro sarà possibile crearne uno ed una volta cliccato "create comment" quest ultimo sarà presente sempre sopra la scritta "create comment".

Nella pagina Posts abbiamo un interfaccia simile a quella della home:
- filtro
- creazione post
- quantità di posts trovati
- ed elenco posts

il filtro in questo caso lo troviamo diverso, perchè per filtrare la ricerca ha: ID dell'utente, il titolo e la descrizione del post. Subito sotto troviamo la possibilità di creare un post, ma questa volta ID dell'utente sarà da inserire, insieme al titolo ed alla descrizione. Una volta creato il post comparirà un messaggio dove ci sarà scritto se è stato creato con successo o no. Come terzo elemento è presente la quantità di post trovati, che ha il funzionamento come per quello della home ed infine l'elenco dei posts dove le informazioni che troviamo sono: ID del post, ID dell'utente, il titolo, descrizione e la possibilità di eliminare il post. Cliccando su un post sarà possibile vedere se ci fossero dei commenti per quel post. (una precisazione: tutti gli ID che cominciano con "1" sono gli ID dei post, mentre quelli che cominciano cono "6" sono gli ID degli utenti)

Come prossima pagina è presente Todos, dove è struttara solo da due cose: quantità di informazioni trovate e dall elenco dei todos.

Saltando il primo, perchè è stato già visto precedentemente, nell elenco è possibile notare: ID del todos, ID dell'utente, titolo, data, ora e status.


>>>>>>> 232066b45b5dae690b70de5659df3656c931f795
## Come posso fare il login al sito?

Per poter fare il login è possibile andando sul sito di [Go Rest](https://gorest.co.in/), fare il login sul sito, andare su "Api Tokens" e copiare il token presente o generarlo uno nuovo.

## Come è costituito a livello di codice?

<<<<<<< HEAD
All interno del progetto è possibile notare 3 cartelle principali, "components", dove è presente i componenti del progetto, create-commnet, create-post, create-user, user, header ed è presente anche un file module, chiamato "shared" dove ha tutti gli elementi comuni dei componenti del progetto.

La seconda cartella "pages", dove sono presenti le pagine del sito web, home, posts, todos, user-detail, login.
=======
All interno del progetto è possibile notare 3 cartelle principali, "components", dove è presente i componenti del progetto, create-commnet, create-post, create-user, user, header ed è presente anche un file module, chiamato "shared" dove ha tutti gli elementi comuni dei componenti del progetto. 

La seconda cartella "pages", dove sono presenti le pagine del sito web, home, posts, todos, user-detail, login. 
>>>>>>> 232066b45b5dae690b70de5659df3656c931f795

Per ultima abbiamo i "services", dove sono presenti due file, "auth.guard" con all'interno il codice che permette di "bloccare" il sito e riportarlo nella pagina di login, in caso l'utente provasse a cercare direttamente sulla barra di ricerca il link per andare nei posts, nella home o in qualsiasi altra pagina del web, mentre l altro file, "auth" ha tutte le principali funzioni che servono per il funzionamenti del sito. All interno del file è possibile notare che è suddiviso a gruppi, nella prima parte sono presenti le funzioni per acquisire il token per avere accesso al sito, nel secondo gruppo è presente tutta la parte per la creazione dell'utente, del post e del commento, nel terzo gruppo per eliminare i post e gli utenti, nel quarto gruppo per ottenere le informazioni per gli utenti, i post, i commenti, i todos attraverso le api, grazie anche alla verifica del token, il quale, in caso il token non fosse giusto, andrebe a mostrare un errore che non è stato possibile trovare le informazioni richieste, infine l'ultima funzione è per effettuare il logout del sito. Sempre all'interno della cartella è presente una sotto cartella chiamata "models", dove si trova il file "interface" ed all interno sono presenti le interfacce per le varie richieste al sito web di Go Rest.

## Librerie usate

- Angular Material
- Router
- RXJS (è una libreria per la programmazione reattiva che utilizza osservabili per comporre programmi asincroni o basati su eventi utilizzando sequenze di dati osservabili.)

## Avviare la parte di test

per avviare la parte di test del codice bisogna andare sul terminale e scrivere il comando `ng test` ed aprirà una pagina web con tutti i test creati (68 test fatti) che vanno a controllare che tutti gli elementi di questo sito web siano giusti e che funzionino perfettamente

## Curiosità sul codice

- Il codice ha il lazy loading, cioè è stato ottimizzato per utilizzare i moduli o componenti solo quando è necessario.
