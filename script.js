const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// show Loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

//hide loading
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

//show New Quote
function newQuote() {
  loading();
  //pick a random quote from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // check if Author field is blank and replace it with 'Unknown'
  if (!quote.author) {
    authorText.textContent = 'Unknown';
  } else {
    authorText.textContent = quote.author;
  }
  //check Quote length to determine the styiling
  if (quote.text.length > 120){
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }
  //set Quote,hide loader
   quoteText.textContent = quote.text;
   complete();
}

//get quotes from API
async function getQuotes() {
  loading();
  const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';git
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    //catch error here
  }

}

// Event Listeners
newQuoteBtn.addEventListener('click',newQuote);

//on load
getQuotes();