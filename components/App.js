import '../index.css';
import React from "react";
import Header from './Header'
import Footer from './Footer'
import Main from './Main'
import PopupWithForm from './PopupWithForm'
import ImagePopup from './ImagePopup'


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);


  function handleCardClick(selectedCard) {
    setSelectedCard(selectedCard);
    console.log(selectedCard)
  }



  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);

  }



  return (
    <div className="page">
      <Header />
      <Main

        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}

      />
      <Footer />

      <PopupWithForm
        title={'Редактировать профиль'}
        isOpen={isEditProfilePopupOpen}
        popup={'popup_edit'}
        form={'profile'}
        submitButtonText={'Сохранить'}
        onClose={closeAllPopups}
        children={<><input id="name" type="text" className="popup__input popup__input_data_name" required name="name" placeholder="Имя"
          minLength="2" maxLength="40"></input>
          <span id="name-error" className="popup__error name-error"></span>
          <input id="info" type="text" className="popup__input popup__input_data_info" required name="info"
            placeholder="Информация о себе" minLength="2" maxLength="200"></input>
          <span id="info-error" className="popup__error info-error"></span> </>}
      />

      <PopupWithForm
        title={'Новое место'}
        isOpen={isAddPlacePopupOpen}
        popup={'popup_add'}
        form={'card'}
        submitButtonText={'Создать'}
        onClose={closeAllPopups}
        children={<> <input id="title" type="text" className="popup__input popup__input_data_title" required name="name"
          placeholder="Название" minLength="2" maxLength="30"></input>
          <span id="title-error" className="popup__error title-error"></span>

          <input id="url" type="url" className="popup__input popup__input_data_url" required name="link"
            placeholder="Ссылка на картинку"></input>
          <span id="url-error" className="popup__error url-error"></span>
        </>}
      />

      <PopupWithForm
        title={'Обновить аватар'}
        isOpen={isEditAvatarPopupOpen}
        popup={'popup_avatar'}
        form={'avatar'}
        submitButtonText={'Сохранить'}
        onClose={closeAllPopups}
        children={<>
          <input id="url-avatar" type="url" className="popup__input popup__input_data_url popup__input_link" name="avatar"
            placeholder="Ссылка на картинку" required></input>
          <span id="url-avatar-error" className="popup__error url-avatar-error"></span>
        </>}
      />

      <ImagePopup
        popup={'photo'}
        card={selectedCard}
        onClose={closeAllPopups}
      />
    </div>
  );
}

export default App;
