import React from "react";

function Card({ card, onCardClick }) {
    
    function handleClickImage() {
        onCardClick(card);
        console.log(card);
    }

    return (
        <article className="place">
            <div className="place__image">
                <img className="place__photo" alt={card.name} src={card.link} onClick={handleClickImage}></img>
            </div>
            <div className="place__info">
                <h2 className="place__title" id="">{card.name}</h2>
                <div className="place__like_container">
                    <button className="place__like" type="button" aria-label="Нравится фотография"></button>
                    <p className="place__like_amount">{card.likes.length}</p>
                </div>
                <button className="place__delete" type="button" aria-label="Удалить фотографию"></button>
            </div>
        </article>

    );
}

export default Card;
