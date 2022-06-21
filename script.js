//------------------------------------------------------------------

const buttonToTop = document.querySelector('.button-to-top')
buttonToTop.addEventListener('click', function() {
 window.scroll({
   top: 0,
   behavior: "smooth",
 })
})

window.addEventListener('scroll', () => {
  if(scrollY >= 400) {
    buttonToTop.classList.add('active')
  } else {
    buttonToTop.classList.remove('active')
  }
})

//------------------------------------------------------------------
const searchListElement = document.querySelector('.search__list-title');
const searchText = searchListElement.nextElementSibling;
const searchListContentElement = document.querySelectorAll('.list-item__text');

searchListElement.addEventListener('click', handleSearchListClick);

function handleSearchListClick() {
  searchText.classList.toggle('active');

  if (searchText.classList.contains('active')) {
    searchText.style.height = searchText.scrollHeight + 'px';
  } else {
    searchText.style.height = null;
  }
}

searchListContentElement.forEach((item) => {
  item.addEventListener('click', function () {
    searchListElement.textContent = item.textContent;
    searchText.classList.remove('active');
    searchText.style.height = null;
  });
});

//------------------------------------------------------------------

const burgerElement = document.querySelector('.nav__burger');
const navList = document.querySelector('.nav__list');
burgerElement.addEventListener('click', handleBurgerClick);

function handleBurgerClick() {
  navList.classList.toggle('active');
  burgerElement.classList.toggle('active');
  document.body.classList.toggle('lock');
}

//------------------------------------------------------------------

const navLinksElement = document.querySelectorAll('.nav__link[data-goto]');

navLinksElement.forEach((item) => {
  item.addEventListener('click', (event) => {
    event.preventDefault();

    const target = event.target.dataset.goto;
    const targetElement = document.querySelector(target);
    const targetTopValue = targetElement.getBoundingClientRect().top;
    let goToTargetElementValue;

    if(window.innerWidth > 990) {
      goToTargetElementValue = targetTopValue + scrollY;
    } else {
      goToTargetElementValue = targetTopValue + scrollY - document.querySelector('.nav').offsetHeight;
    }

    if (burgerElement.classList.contains('active')) {
      navList.classList.remove('active');
      burgerElement.classList.remove('active');
      document.body.classList.remove('lock');
    }

    window.scrollTo({
      top: goToTargetElementValue,
      behavior: 'smooth',
    });
  });
});

//------------------------------------------------------------------

const headerNavElement = document.querySelector('.nav__bg');

window.addEventListener('scroll', handleScrollNavBg);
let color = 0;

function handleScrollNavBg() {
  if (scrollY < 600) {
    color = scrollY / 1000;
  } else {
    color = 0.6;
  }

  headerNavElement.style.background = `rgba(0,0,0,${color})`;
}

//------------------------------------------------------------------

const likeElement = document.querySelectorAll('.like');

likeElement.forEach((item) => {
  item.addEventListener('click', function () {
    const itemChild = item.lastElementChild;
    let like = itemChild.textContent;

    itemChild.textContent = ++like;
    item.classList.add('liked');

    if (item.classList.contains('liked')) {
      setTimeout(() => {
        item.classList.remove('liked');
      }, 1500);
    }
  });
});

//------------------------------------------------------------------

const currentDate = document.querySelectorAll('.blog-date');

currentDate.forEach((item) => {
  let date = new Date();
  const options = { year: 'numeric', month: 'long', day: 'numeric' };

  item.textContent = date.toLocaleDateString('to-RU', options);
});

//------------------------------------------------------------------

const commentElement = document.querySelectorAll('.comments[data-run]');

commentElement.forEach((item) => {
  let content = item.innerHTML;

  function addComment() {
    item.innerHTML = ++content;
  }

  setInterval(addComment, 2000);
});
