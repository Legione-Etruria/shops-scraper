# Scraper Taiwangun e ilSemaforo

Scraper creato per ottenere i dati degli oggetti (nome, prezzo, immagine, disponibilità) dai suddetti negozi in modo da permettere l'automatismo dell'aggiunta di un prodotto nel gestore ordini Legione Etruria

Sotto il cofano usa puppeteer per accedere al web


# Routes


 - `/scrape` 
  	 ```typescript 
     "URL": string; //l'url da cui ottenere le informazioni
     "checkAvailability?": boolean; //skip dell'ottenimento di tutto ciò che non è lo stato di disponibilità dell'oggetto
     "apikey": any //api key necessaria per una sorta di autenticazione 

