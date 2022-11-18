addPopupsCloseEvents();

const profileNameElement = document.querySelector('.profile__name');
const profileDescElement = document.querySelector('.profile__description');

const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditForm = document.querySelector('#profile-edit');
profileEditButton.addEventListener('click', openProfileEdit);
profileEditForm.addEventListener('submit', profileEditSubmitHandler);

const cardsList = document.querySelector('.cards__list');
const cardTemplate = document.querySelector('#card-template');

const cardAddButton = document.querySelector('.profile__add-button');
const cardAddForm = document.querySelector('#add-card');
cardAddButton.addEventListener('click', openAddCard);
cardAddForm.addEventListener('submit', addCardSubmitHandler);

const cardImagePopup = document.querySelector('.popup__image-container').closest('.popup');
const cardImagePopupImage = cardImagePopup.querySelector('.popup__image');
const cardImagePopupCaption = cardImagePopup.querySelector('.popup__image-caption');

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

function addPopupsCloseEvents() {
    const popups = document.querySelectorAll('.popup');
    for (let i = 0; i < popups.length; i++) {
        const popup = popups[i];

        const closeBtn = popup.querySelector('.popup__close-button');
        closeBtn.addEventListener('click', () => closePopup(popup));
    }
}

function openProfileEdit() {
    profileEditForm.querySelector('#name-field').value = profileNameElement.textContent;
    profileEditForm.querySelector('#description-field').value = profileDescElement.textContent;
    profileEditForm.closest('.popup').classList.add('popup_opened');
}

function profileEditSubmitHandler(evt) {
    evt.preventDefault();
    profileNameElement.textContent = profileEditForm.querySelector('#name-field').value;
    profileDescElement.textContent = profileEditForm.querySelector('#description-field').value;
    closePopup(profileEditForm.closest('.popup'))
}

function openAddCard() {
    cardAddForm.querySelector('#cardName-field').value = null;
    cardAddForm.querySelector('#cardLink-field').value = null;
    cardAddForm.closest('.popup').classList.add('popup_opened');
}

function addCardSubmitHandler(evt) {
    evt.preventDefault();
    const name = cardAddForm.querySelector('#cardName-field').value;
    const link = cardAddForm.querySelector('#cardLink-field').value;
    addCard(name, link);
    closePopup(cardAddForm.closest('.popup'))
}

function openCardImagePopup(imgLink, name) {
    cardImagePopupImage.alt = cardImagePopupCaption.textContent = name;
    cardImagePopupImage.src = imgLink;
    cardImagePopup.classList.add('popup_opened');
}

function addCard(name, imgLink) {
    const newCard = cardTemplate.content.querySelector('.card').cloneNode(true);
    newCard.querySelector('.card__title').textContent = name;

    const likeBtn = newCard.querySelector('.card__like');
    likeBtn.addEventListener('click', () => toggleLikeBtn(likeBtn));

    const deleteBtn = newCard.querySelector('.card__delete');
    deleteBtn.addEventListener('click', (evt) => evt.target.closest('.card').remove());

    const newCardImage = newCard.querySelector('.card__image')
    newCardImage.src = imgLink;
    newCardImage.alt = name;
    newCardImage.addEventListener('click', () => openCardImagePopup(imgLink, name))

    cardsList.prepend(newCard);
}

function toggleLikeBtn(likeBtn) {
    likeBtn.classList.toggle('card__like_active');
}

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

initialCards.forEach((card) => addCard(card.name, card.link));