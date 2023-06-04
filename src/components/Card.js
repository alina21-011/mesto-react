import React from "react";

function Card({ card, onCardClick, link, title, likes }) {
    
    function handleClickImage() {
        onCardClick(card);
    }

    return (
        <article className="place">
            <div className="place__image">
                <img className="place__photo" alt={title} src={link} onClick={handleClickImage}></img>
            </div>
            <div className="place__info">
                <h2 className="place__title" id="">{title}</h2>
                <div className="place__like_container">
                    <button className="place__like" type="button" aria-label="Нравится фотография"></button>
                    <p className="place__like_amount">{likes}</p>
                </div>
                <button className="place__delete" type="button" aria-label="Удалить фотографию"></button>
            </div>
        </article>

    );
}

export default Card;
