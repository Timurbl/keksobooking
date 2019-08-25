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

const map = document.querySelector('.map');
map.classList.remove('map--faded');

const authors = renderAuthors(map.offsetWidth);
const pins = map.querySelector('.map__pins');
const pinTemplate = document.querySelector('#card_template').content.querySelector('.map__pin');
const cardTemplate = document.querySelector('#card_template').content.querySelector('.map__card');


authors.forEach(function(author) {
  const pin = pinTemplate.cloneNode(true);
  pin.style.left = author.location.x + 'px';
  pin.style.top = (author.location.y - pin.firstChild.height / 2 - 17) + 'px';
  pin.firstChild.src = author.author.avatar;
  pin.firstChild.alt = author.offer.title;
  pins.appendChild(pin);

  const card = cardTemplate.cloneNode(true);
  card.querySelector('.popup__title').textContent = author.offer.title;
  card.querySelector('.popup__text--address').textContent = author.offer.address;
  card.querySelector('.popup__text--price').textContent = author.offer.price;
  card.querySelector('.popup__title').textContent = `${author.offer.title}₽/ночь`;
  switch (author.offer.type) {
    case 'flat':
      card.querySelector('.popup__type').textContent = 'Квартира';
      return;
    case 'bungalo':
      card.querySelector('.popup__type').textContent = 'Бунгало';
      return;
    case 'house':
      card.querySelector('.popup__type').textContent = 'Дом';
      return;
    case 'palace':
      card.querySelector('.popup__type').textContent = 'Дворец';
      return;
  }
  card.querySelector('.popup__text--capacity').textContent = `${author.offer.rooms} комнаты для ${author.offer.guests} гостей`;
  card.querySelector('.popup__text--capacity').textContent = `Заезд после ${author.offer.checkin}, выезд до ${author.offer.checkout}`;
  const features = card.querySelector('.popup__features');
  for (let i = 0; i < author.offer.features.length; i++) {
    features.querySelector(`.feature--${author.offer.features[i]}`).textContent = author.offer.features[i]
  }
  card.querySelector('.popup__description').textContent = author.offer.description;
  const photos = card.querySelector('.popup__pictures');
  for(let i = 0; i < author.offer.photos.length; i++) {

  }


});

