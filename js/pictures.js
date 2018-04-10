'use strict';

var showElement = function (elem) {
  elem.classList.remove('hidden');
};

var hideElement = function (elem) {
  elem.classList.add('visually-hidden');
};

var getRandomInt = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
};

var isDuplicatedProp = function (arr, item, prop) {
  for (var j = 0; j < arr.length - 1; j++) {
    var duplicate = arr[j][prop] === item[prop] ? true : false;
    if (duplicate) {
      return duplicate;
    }
  }
  return duplicate;
};

var getArrProp = function (arr, item, prop, number) {
  item[prop] = 'photos/' + getRandomInt(1, number) + '.jpg';
  var duplicate = isDuplicatedProp(arr, item, prop);
  if (duplicate) {
    getArrProp(arr, item, prop, number);
  }
  return item[prop];
};

var getComment = function (arr) {
  //  строка комментария
  var comment = '';
  var comment2 = '';
  //  определяем сколько предложений войдет в строку комментария: 1 или 2
  var commentQty = getRandomInt(1, 2);

  //  если у нас 2 предложения в строке комментария, то проверяем не повторяются ли они
  if (commentQty === 1) {

    return arr[getRandomInt(0, 5)];

  } else {

    comment = arr[getRandomInt(0, 5)];
    comment2 = arr[getRandomInt(0, 5)];

    while (comment === comment2) {
      comment2 = arr[getRandomInt(0, 5)];
    }
    return comment + ' ' + comment2;
  }
};

var getDescription = function (arr) {
  return arr[getRandomInt(0, 5)];
};

var getPhotos = function (photosCounts, photosComments, photosDescriptions) {
  var photos = [];

  for (var i = 0; i < photosCounts; i++) {
    photos[i] = {};
    photos[i]['url'] = getArrProp(photos, photos[i], 'url', photosCounts);
    photos[i]['likes'] = getRandomInt(15, 200);
    photos[i]['comments'] = [];
    photos[i]['comments'].push(getComment(photosComments));
    photos[i]['commentsQty'] = photos[i]['comments'].length;
    photos[i]['description'] = getDescription(photosDescriptions);
  }

  return photos;

  //
  //  var photo = {
  //    url: getArrProp(photos, this, 'url', photosCounts),
  //     likes: getRandomInt(15,200),
  //    comments: comments.push(getComment(photosComments)),
  //     description: getDescription(photosDescriptions)
  //  };
  //   photos.push(photo);
  //  пыталась сделать по аналогии с комментарием на задание по code and magic,
  //  не  получается. наверное, логика проверки url на дублирование должна быть другой...
};

var renderPhoto = function (photo, template) {
  var photoElement = template.cloneNode(true);

  photoElement.querySelector('.picture__img').setAttribute('src', photo.url);
  photoElement.querySelector('.picture__stat--likes').textContent = photo.likes;
  photoElement.querySelector('.picture__stat--comments').textContent = photo.commentsQty;

  return photoElement;
};

var createBigPicture = function (item) {
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureImg = bigPicture.querySelector('.big-picture__img img');
  var likes = bigPicture.querySelector('.likes-count');
  var commentsQty = bigPicture.querySelector('.comments-count');
  var socialComments = bigPicture.querySelector('.social__comments');
  var number = getRandomInt(1, 6);
  var description = bigPicture.querySelector('.social__caption');

  bigPictureImg.setAttribute('src', item.url);
  likes.textContent = item.likes;
  commentsQty.textContent = item.commentsQty;
  description.textContent = item.description;

  var newElement = document.createElement('li');
  newElement.className = 'social__comment social__comment--text';
  newElement.innerHTML = '<img class="social__picture" src="img/avatar-' + number + '.svg" alt="Аватар комментатора фотографии" width="35" height="35"> ' + item.comments;
  socialComments.appendChild(newElement);
};

var createPhotos = function (photosNumber) {

  var bigPicture = document.querySelector('.big-picture');
  var socialCommentCount = document.querySelector('.social__comment-count');
  var socialCommentLoadmore = document.querySelector('.social__comment-loadmore');

  var comments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  var descriptions = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];

  var pictures = document.querySelector('.pictures');
  var picturesTemplate = document.querySelector('#picture').content.querySelector('.picture__link');
  var fragment = document.createDocumentFragment();

  hideElement(socialCommentCount);
  hideElement(socialCommentLoadmore);
  showElement(bigPicture);

  var photos = getPhotos(photosNumber, comments, descriptions);

  for (var i = 0; i < photosNumber; i++) {
    fragment.appendChild(renderPhoto(photos[i], picturesTemplate));
  }

  pictures.appendChild(fragment);
  createBigPicture(photos[0]);
};

createPhotos(25);
