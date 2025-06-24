document.addEventListener('DOMContentLoaded', () => {
  // 1) Tu array ahora con 7 items:
  const portfolioItems = [
    { background: 'assets/images/Proyecto1.png', color: '#9B61A4' },
    { background: 'assets/images/Databam.png',      color: '#04C7AA' },
    { background: 'assets/images/Proyecto3.png',     color: '#9B61A4' },
    { background: 'assets/images/Proyecto4.png',     color: '#04C7AA' },
    { background: 'assets/images/Proyecto5.png',     color: '#9B61A4' },
    { background: 'assets/images/Proyecto6.png',     color: '#04C7AA' },
    { background: 'assets/images/Proyecto7.png',     color: '#9B61A4' }
  ];

  const slidesContainer = document.getElementById('carousel-slides');
  const backgroundEl   = document.getElementById('portfolio-background');
  const prevBtn        = document.getElementById('prev-button');
  const nextBtn        = document.getElementById('next-button');
  const indicatorsWrap = document.getElementById('indicators-container');

  // 2) Clonar primer y último slide para loop infinito
  const slides   = Array.from(slidesContainer.children);
  const first    = slides[0].cloneNode(true);
  const last     = slides[slides.length - 1].cloneNode(true);
  slidesContainer.appendChild(first);
  slidesContainer.insertBefore(last, slidesContainer.firstChild);
  // 3) Nueva colección y estado inicial
  const allSlides   = Array.from(slidesContainer.children);
  const realCount   = portfolioItems.length;
  let   currentIdx  = 1;  // empieza en la “primera” slide real

  // Ajusta tamaño y posición inicial
  slidesContainer.style.transform = `translateX(-${100 * currentIdx}%)`;

  // Crear indicadores basados en realCount
  function createIndicators() {
    indicatorsWrap.innerHTML = '';
    for (let i = 0; i < realCount; i++) {
      const btn = document.createElement('button');
      btn.className = 'w-3 h-3 rounded-full transition-colors';
      btn.dataset.slide = i;
      btn.style.backgroundColor = i === 0 ? '#9B61A4' : '#BEC3C7';
      btn.addEventListener('click', () => goToSlide(i + 1));
      indicatorsWrap.appendChild(btn);
    }
  }

  function updateIndicators() {
    const dots = indicatorsWrap.querySelectorAll('button');
    dots.forEach((dot, i) => {
      dot.style.backgroundColor = (i + 1) === currentIdx ? '#9B61A4' : '#BEC3C7';
    });
  }

  function updateBackground() {
    const item = portfolioItems[(currentIdx - 1 + realCount) % realCount];
    backgroundEl.style.backgroundImage = `url(${item.background})`;
    backgroundEl.style.backgroundColor  = item.color;
  }

  function goToSlide(targetIdx) {
    currentIdx = targetIdx;
    slidesContainer.style.transition = 'transform 0.5s ease-out';
    slidesContainer.style.transform  = `translateX(-${100 * currentIdx}%)`;
  }

  // Botones Next / Prev
  nextBtn.addEventListener('click', () => goToSlide(currentIdx + 1));
  prevBtn.addEventListener('click', () => goToSlide(currentIdx - 1));

  // Al terminar cada transición chequeamos si estamos en un clon
  slidesContainer.addEventListener('transitionend', () => {
    // Si pasaste al clon final (índice realCount+1), resetea a 1
    if (currentIdx === realCount + 1) {
      slidesContainer.style.transition = 'none';
      currentIdx = 1;
      slidesContainer.style.transform = `translateX(-${100 * currentIdx}%)`;
    }
    // Si fuiste al clon inicial (índice 0), resetea a realCount
    if (currentIdx === 0) {
      slidesContainer.style.transition = 'none';
      currentIdx = realCount;
      slidesContainer.style.transform = `translateX(-${100 * currentIdx}%)`;
    }

    updateIndicators();
    updateBackground();
  });

  // Iniciar todo
  createIndicators();
  updateBackground();
});
