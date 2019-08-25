const renderAuthors = function (windowWidth) {
  let authorTemplate = {
    "author": {
      "avatar": `img/avatars/user01.png`
    },
    "offer": {
      "title": ["Большая уютная квартира", "Маленькая неуютная квартира", "Огромный прекрасный дворец",
        "Маленький ужасный дворец", "Красивый гостевой домик", "Некрасивый негостеприимный домик",
        "Уютное бунгало далеко от моря", "Неуютное бунгало по колено в воде"],
      "address": `${location.x} ${location.y}`,
      "price": 5400,
      "type": ['palace', 'flat', 'house', 'bungalo'],
      "rooms": [1, 2, 3, 4, 5],
      "guests": 0,
      "checkin": ['12:00', '13:00', '14:00'],
      "checkout": ['12:00', '13:00', '14:00'],
      "features": ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"],
      "description": '',
      "photos": ["http://o0.github.io/assets/images/tokyo/hotel1.jpg",
        "http://o0.github.io/assets/images/tokyo/hotel2.jpg",
        "http://o0.github.io/assets/images/tokyo/hotel3.jpg"]
    },
    "location": {
      "x": Math.floor(Math.random() * windowWidth),
      "y": 130 + Math.floor(Math.random() * 500)
    }
  };

  let authors = [];

  for (let i = 0; i < 8; i++) {
    const locationX = Math.floor(Math.random() * windowWidth);
    const locationY = 130 + Math.floor(Math.random() * 500);
    let author = {
      "author": {
        "avatar": `img/avatars/user0${i + 1}.png`
      },
      "location": {
        "x": locationX,
        "y": locationY
      },
      "offer": {
        "title": authorTemplate.offer.title[Math.floor(Math.random() * authorTemplate.offer.title.length)],
        "address": `${locationX} ${locationY}`,
        "price": Math.floor(800 + Math.random() * 6000),
        "type": authorTemplate.offer.type[Math.floor(Math.random() * authorTemplate.offer.type.length)],
        "rooms": Math.floor(Math.random() * 5) + 1,
        "guests": Math.floor(Math.random() * 10 + 1),
        "checkin": authorTemplate.offer.checkin[Math.floor(Math.random() * authorTemplate.offer.checkin.length)],
        "checkout": authorTemplate.offer.checkout[Math.floor(Math.random() * authorTemplate.offer.checkout.length)],
        "features": ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"],
        "description": '',
        "photos": ["http://o0.github.io/assets/images/tokyo/hotel1.jpg",
          "http://o0.github.io/assets/images/tokyo/hotel2.jpg",
          "http://o0.github.io/assets/images/tokyo/hotel3.jpg"]
      }
    };

    authors.push(author);
  }

  return authors;
};
const getPins = function(authors) {
  const width = 50;
  const height = 70;

  authors.forEach(function(author) {
    const pin = pinTemplate.cloneNode(true);
    pin.style.left = author.location.x - width / 2 + 'px';
    pin.style.top = (author.location.y - height) + 'px';
    pin.firstChild.src = author.author.avatar;
    pin.firstChild.alt = author.offer.title;
    pins.appendChild(pin);
  });
};
const getCard = function (author) {
  const card = cardTemplate.cloneNode(true);

  card.querySelector('.popup__title').textContent = author.offer.title;
  card.querySelector('.popup__text--address').textContent = author.offer.address;
  card.querySelector('.popup__text--price').textContent = `${author.offer.price} ₽/ночь`;
  card.querySelector('.popup__title').textContent = author.offer.title;
  switch (author.offer.type) {
    case 'flat':
      card.querySelector('.popup__type').textContent = 'Квартира';
      break;
    case 'bungalo':
      card.querySelector('.popup__type').textContent = 'Бунгало';
      break;
    case 'house':
      card.querySelector('.popup__type').textContent = 'Дом';
      break;
    case 'palace':
      card.querySelector('.popup__type').textContent = 'Дворец';
      break;
  }
  card.querySelector('.popup__text--capacity').textContent = `${author.offer.rooms} комнаты для ${author.offer.guests} гостей`;
  card.querySelector('.popup__text--time').textContent = `Заезд после ${author.offer.checkin}, выезд до ${author.offer.checkout}`;

  const features = card.querySelector('.popup__features');
  for (let i = 0; i < author.offer.features.length; i++) {
    features.querySelector(`.popup__feature--${author.offer.features[i]}`).textContent = author.offer.features[i]
  }
  card.querySelector('.popup__description').textContent = author.offer.description;

  const photos = card.querySelector('.popup__photos');
  const photoTemplate = photos.children[0];
  photoTemplate.src = author.offer.photos[0];
  for(let i = 1; i < author.offer.photos.length; i++) {
    const photo = photoTemplate.cloneNode(true);
    photo.src = author.offer.photos[i];
    photos.appendChild(photo);
  }
  const userImage = card.querySelector('.popup__avatar');
  userImage.src = author.author.avatar;

  document.querySelector('.map__filters-container').before(card);
};
const makeFormAvailable = function () {
  const adForm = document.querySelector('.ad-form');
  adForm.classList.remove('ad-form--disabled');
  adForm.querySelectorAll('.ad-form__element').forEach(function (element) {
    element.disabled = false;
  });
};

const main = function () {
  makeFormAvailable();

  mainPin.removeEventListener('mouseup', main);
  map.classList.remove('map--faded');
  const authors = renderAuthors(map.offsetWidth);

  getPins(authors);
  getCard(authors[0]);
};

const map = document.querySelector('.map');
const pins = map.querySelector('.map__pins');
const pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
const cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
const mainPin = document.querySelector('.map__pin--main');

mainPin.addEventListener('mouseup', main);
