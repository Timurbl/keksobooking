(function () {
  const getAddress = function () {
    const pinWidth = mainPin.offsetWidth;
    const pinHeight = mainPin.offsetHeight + 5;
    const top = parseInt(mainPin.style.top);
    const left = parseInt(mainPin.style.left);

    inputAddress.value = `${left + Math.floor(pinWidth / 2)} ${top + pinHeight}`;
  };

  const mainPin = document.querySelector('.map__pin--main');
  const map = document.querySelector('.map');
  const inputAddress = document.querySelector('#address');
  let top;
  let left;
  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    const pinMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      let shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      top = (mainPin.offsetTop - shift.y < 0 ? 0 :
        (mainPin.offsetTop - shift.y + mainPin.offsetHeight > map.offsetHeight
          ? map.offsetHeight - mainPin.offsetHeight : mainPin.offsetTop - shift.y));
      left = (mainPin.offsetLeft - shift.x < 0 ? 0 :
        (mainPin.offsetLeft - shift.x + mainPin.offsetWidth > map.offsetWidth
          ? map.offsetWidth - mainPin.offsetWidth : mainPin.offsetLeft - shift.x));

      mainPin.style.top = top + 'px';
      mainPin.style.left = left + 'px';
    };

    const pinUpHandler = function (upEvt) {
      upEvt.preventDefault();

      getAddress();
      console.log('aaa');
      document.removeEventListener('mousemove', pinMoveHandler);
      document.removeEventListener('mouseup', pinUpHandler);
    };

    document.addEventListener('mousemove', pinMoveHandler);
    document.addEventListener('mouseup', pinUpHandler);
  });
})();
