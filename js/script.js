const quoteText = document.querySelector('.quote'),
  quoteAuthor = document.querySelector('.author .name'),
  qouteBtn = document.querySelector('button'),
  speechBtn = document.querySelector('.speech'),
  copyBtn = document.querySelector('.copy');

function randomQuote() {
  qouteBtn.classList.add('loading');
  qouteBtn.innerHTML = 'Loading...';
  fetch('http://api.quotable.io/random')
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      quoteText.innerText = data.content;
      quoteAuthor.innerText = data.author;
      qouteBtn.classList.remove('loading');
      qouteBtn.innerHTML = 'New Quote';
    })
    .catch((err) => console.log(err));
}

qouteBtn.addEventListener('click', randomQuote);

speechBtn.addEventListener('click', () => {
  if (!qouteBtn.classList.contains('loading')) {
    let uttarance = new SpeechSynthesisUtterance(
      `${quoteText.innerText} by ${quoteAuthor.innerText}`
    );
    speechSynthesis.speak(uttarance);
    setInterval(() => {
      !speechSynthesis.speaking
        ? speechBtn.classList.remove('active')
        : speechBtn.classList.add('active');
    }, 10);
  }
});

copyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(quoteText.innerText);
});
