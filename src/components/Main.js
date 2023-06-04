import api from "../utils/Api";
import React from "react";
import Card from "./Card";

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick }) {
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState({});
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api
      .getUserData()
      .then(({ name, about, avatar }) => {
        setUserDescription(about);
        setUserName(name);
        setUserAvatar(avatar);
      })
  }, []);

  React.useEffect(() => {
    api
      .getCards()
      .then((card) => {
        setCards(card);
      })
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__main">
          <button className="profile__avatar-btn" type="button" onClick={onEditAvatar}>
            <img className="profile__avatar" alt="Главное фото профиля" src={userAvatar} ></img>
          </button>
          <div className="profile__info">
            <h1 className="profile__name">{userName}</h1>
            <p className="profile__description">{userDescription}</p>
            <button type="button" className="profile__edit-button" onClick={onEditProfile} aria-label="Редактировать информацию"></button>
          </div>
        </div>
        <button className="profile__add-button" type="button" onClick={onAddPlace} aria-label="Добавить фото"></button>
      </section>
      <section className="gallery">
        {cards?.map((card) => (
          <Card key={card._id} card={card} link={card.link} title={card.name} likes={card.likes.length} onCardClick={onCardClick} />
        ))}
      </section>
    </main>
  )
}

export default Main;
