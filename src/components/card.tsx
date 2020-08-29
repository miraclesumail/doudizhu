import React, { useContext, useState, useEffect } from "react";
import { CardContext } from "../App";
import Card from "../utils/card";

interface Props {
  //   cardNum: string;
  //   cardColor: string;
  cardId: number;
  stand?: number; // 摊位
  hidden?: boolean; // 摊位
  [key: string]: any;
}

const CardWraper: React.FC<Props> = ({
  cardId,
  index,
  stand,
  style,
  hidden,
  forwardRef
}) => {
  const { cardList, turn, deskCards, chuPai } = useContext(CardContext);
  const [cardItem, setItem] = useState(new Card(cardId));

  useEffect(
    () => {
      setItem(new Card(cardId));
    },
    [cardId]
  );

  // 轮到你才能出牌
  const playCards = () => {
    if (+turn === stand) {
      chuPai(cardId);
    }
  };

  return (
    <div
      className={
        (deskCards as number[]).includes(cardId) ? (
          "card-container active"
        ) : (
          "card-container"
        )
      }
      style={style || {}}
      onClick={playCards}
      ref={forwardRef}
    >
      {!hidden ? <div>{cardItem.cardNum}</div> : null}
      {cardItem.cardColor && !hidden ? <div>{cardItem.cardColor}</div> : null}
    </div>
  );
};

export default CardWraper;
