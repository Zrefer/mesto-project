const profileNameElement = document.querySelector('.profile__name');
const profileDescElement = document.querySelector('.profile__description');

const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditPopup = document.querySelector('.popup_type_profile');
const profileEditForm = profileEditPopup.querySelector('#profile-edit');
const profileEditName = profileEditForm.querySelector('#name-field');
const profileEditDesc = profileEditForm.querySelector('#description-field');

const cardsList = document.querySelector('.cards__list');
const cardTemplate = document.querySelector('#card-template');

const cardAddButton = document.querySelector('.profile__add-button');
const cardAddPopup = document.querySelector('.popup_type_card');
const cardAddForm = cardAddPopup.querySelector('#add-card');
const cardAddName = cardAddForm.querySelector('#cardName-field');
const cardAddLink = cardAddForm.querySelector('#cardLink-field');

const cardImagePopup = document.querySelector('.popup_type_image');
const cardImagePopupImage = cardImagePopup.querySelector('.popup__image');
const cardImagePopupCaption = cardImagePopup.querySelector('.popup__image-caption');

function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

function addPopupsCloseEvents() {
    const popups = document.querySelectorAll('.popup');
    popups.forEach((popup) => {
        const closeBtn = popup.querySelector('.popup__close-button');
        closeBtn.addEventListener('click', () => closePopup(popup));
    });
}

function openProfileEdit() {
    profileEditName.value = profileNameElement.textContent;
    profileEditDesc.value = profileDescElement.textContent;
    openPopup(profileEditPopup);
}

function profileEditSubmitHandler(evt) {
    evt.preventDefault();

    profileNameElement.textContent = profileEditName.value;
    profileDescElement.textContent = profileEditDesc.value;
    closePopup(profileEditPopup);
}

function openAddCard() {
    cardAddName.value = cardAddLink.value = null;
    openPopup(cardAddPopup);
}

function cardLikeBtnHandler(evt) {
    evt.target.classList.toggle('card__like_active');
}

function cardDeleteBtnHandler(evt) {
    evt.target.closest('.card').remove();
}

function createCard(name, imgLink) {
    const newCard = cardTemplate.content.querySelector('.card').cloneNode(true);
    newCard.querySelector('.card__title').textContent = name;

    const likeBtn = newCard.querySelector('.card__like');
    likeBtn.addEventListener('click', cardLikeBtnHandler);

    const deleteBtn = newCard.querySelector('.card__delete');
    deleteBtn.addEventListener('click', cardDeleteBtnHandler);

    const newCardImage = newCard.querySelector('.card__image');
    newCardImage.src = imgLink;
    newCardImage.alt = name;
    newCardImage.addEventListener('click', () => openCardImagePopup(imgLink, name));

    return newCard;
}

function addCard(card) {
    cardsList.prepend(card);
}

function cardAddSubmitHandler(evt) {
    evt.preventDefault();

    const newCard = createCard(cardAddName.value, cardAddLink.value);
    addCard(newCard);
    closePopup(cardAddPopup);
}

function openCardImagePopup(imgLink, name) {
    cardImagePopupImage.alt = cardImagePopupCaption.textContent = name;
    cardImagePopupImage.src = imgLink;
    openPopup(cardImagePopup);
}

addPopupsCloseEvents();

profileEditButton.addEventListener('click', openProfileEdit);
profileEditForm.addEventListener('submit', profileEditSubmitHandler);

cardAddButton.addEventListener('click', openAddCard);
cardAddForm.addEventListener('submit', cardAddSubmitHandler);

initialCards.forEach((card) => addCard(createCard(card.name, card.link)));