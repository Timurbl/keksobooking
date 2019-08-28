'use strict';

(function () {
  /*Functions*/
  const getPins = function(authors) {
    const width = 50;
    const height = 70;

    for (let i = 0; i < authors.length; i++) {
      const pin = pinTemplate.cloneNode(true);
      pin.style.left = authors[i].location.x - width / 2 + 'px';
      pin.style.top = (authors[i].location.y - height) + 'px';
      pin.firstChild.src = authors[i].author.avatar;
      pin.firstChild.alt = authors[i].offer.title;
      pin.setAttribute('data-id', i);
      pins.appendChild(pin);

      pin.addEventListener('click', pinClickHandler);
    }
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
    features.innerHTML = '';
    for (let i = 0; i < author.offer.features.length; i++) {
      let li = document.createElement('li');
      li.classList.add('popup__feature');
      li.classList.add(`popup__feature--${author.offer.features[i]}`);
      features.appendChild(li);
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

    const close = card.querySelector('.popup__close');
    close.addEventListener('click', cardRemoveClickHandler);
    document.addEventListener('keydown', keydownHandler);

    document.querySelector('.map__filters-container').before(card);
  };
  const makeFormAvailable = function () {
    const adForm = document.querySelector('.ad-form');
    adForm.classList.remove('ad-form--disabled');
    adForm.querySelectorAll('.ad-form__element').forEach(function (element) {
      element.disabled = false;
    });
  };
  const removeCard = function (card) {
    card.querySelector('.popup__close').removeEventListener('click', cardRemoveClickHandler);
    card.remove();
  };

  /*Handlers*/
  const pinClickHandler = function (evt) {
    evt.preventDefault();
    const previousCard = map.querySelector('.map__card');
    if (previousCard) {
      removeCard(previousCard);
    }

    getCard(authors[evt.currentTarget.dataset.id]);
  };
  const cardRemoveClickHandler = function (evt) {
    evt.preventDefault();
    removeCard(evt.currentTarget.closest('article'))
  };
  const keydownHandler = function (evt) {
    if (evt.key === 'Escape') {
      const card = map.querySelector('.map__card');
      if (card) {
        card.remove()
      }
    }
  };

  /*main*/
  const main = function () {
    makeFormAvailable();

    mainPin.removeEventListener('mouseup', main);
    map.classList.remove('map--faded');
    getPins(authors);
  };

  const map = document.querySelector('.map');
  const pins = map.querySelector('.map__pins');
  const pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  const cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  const mainPin = document.querySelector('.map__pin--main');

  let authors;
  const onError = function (message) {
    console.error(message);
  };
  const onSuccess = function (data) {
    authors = data;
  };
  window.load('https://js.dump.academy/keksobooking/data', onSuccess, onError);


  mainPin.addEventListener('mouseup', main);
})();
