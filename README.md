# Scraper Taiwangun e ilSemaforo

Scraper creato per ottenere dati dei prodotti (nome, prezzo, immagine, disponibilità) dai suddetti negozi in modo da permettere l'automatismo dell'aggiunta e il tracking di un prodotto nel gestore ordini Legione Etruria

Puppeteer è usato per ottenere le informazioni dai siti web


# Routes


 - `/scrape` 
  	 ```typescript 
     "url": string; //l'url da cui ottenere le informazioni
     "checkAvailability?": boolean; //skip dell'ottenimento di tutto ciò che non è lo stato di disponibilità dell'oggetto
     "apikey": any //api key necessaria per una sorta di autenticazione 

