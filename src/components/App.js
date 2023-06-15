import '../index.css';
import React from "react";
import Header from './Header'
import Footer from './Footer'
import Main from './Main'

import ImagePopup from './ImagePopup'
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { AppContext } from "../contexts/AppContext";
import api from "../utils/Api";
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'


function App() {
  const [cards, setCards] = React.useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [selectedCard, setSelectedCard] = React.useState(null);
  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard;
  const [isLoading, setIsLoading] = React.useState(false);


  React.useEffect(() => {
    api.getCards()
      .then((card) => {
        setCards(card);
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  }, []);

  React.useEffect(() => {
    api
      .getUserData()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  }, []);

  React.useEffect(() => {
    function closeByEscape(evt) {
      if(evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if(isOpen) { 
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen]) 
 



  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => c._id === card._id ? newCard : c)
        );
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  }


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



  function handleCardDelete(card) {
    setIsLoading(true);
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((prevCards) => prevCards.filter((c) => c._id !== card._id));

      })

      .catch((err) => {
        console.log(`Ошибка ${err}`);

      })
      .finally(() => {
        setIsLoading(false);
      });
  }




  function handleUpdateUser(data) {
    setIsLoading(true);
    api
      .setUserData(data.name, data.about)
      .then((serverData) => {
        setCurrentUser(serverData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  function handleUpdateAvatar(data) {
    setIsLoading(true);
    api
      .editUserAvatar(data.avatar)
      .then((serverData) => {
        setCurrentUser(serverData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddPlaceSubmit(card) {
    setIsLoading(true);
    api
      .addNewCard(card.name, card.link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }


  return (
    <div className="page">
      <AppContext.Provider value={{ closeAllPopups }}>
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main
          cards={cards}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}

        />
        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onUpdateUser={handleUpdateUser}
          buttonText={isLoading ? "Сохранение..." : "Сохранить"}
        />


        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onAddPlace={handleAddPlaceSubmit}
          buttonText={isLoading ? "Сохранение..." : "Сохранить"}


        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onUpdateAvatar={handleUpdateAvatar}
          buttonText={isLoading ? "Сохранение..." : "Сохранить"}
        />

        <ImagePopup
          popup={'photo'}
          card={selectedCard}
        />
      </CurrentUserContext.Provider>
      </AppContext.Provider>
 
    </div>
  );
}

export default App;
