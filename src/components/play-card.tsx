import React, { useContext, useState, useEffect, useCallback } from "react";
import { CardContext } from "../App";
import { useCountDown } from "./qiangdizhu";
import { usePrevious } from "../utils/hooks";
import Card from "../utils/card";

interface Props {
  [key: string]: any;
}

const styles = [
  {
    left: "200px",
    top: "50px"
  },
  {
    left: "600px",
    top: "410px"
  },
  {
    right: "200px",
    top: "50px"
  }
];

const Chu: React.FC<Props> = ({
  cardColor,
  cardNum,
  cardId,
  index,
  hideQiang,
  addToList
}) => {
  const { turn, deskCards, playCard, prevDeskCards, nextTurn } = useContext(
    CardContext
  );
  const lastTurn = usePrevious(turn);
  const [active, setActive] = useState(false);
  const [count, resetCount] = useCountDown(20);

  // pass 不要牌
  const onPass = () => {
    nextTurn();
    resetCount();
  };

  useEffect(
    () => {
      if (!prevDeskCards.length) {
        const active = Card.isValidCards(deskCards);
        setActive(!!active);
      } else {
        const active = Card.compareCards(deskCards, prevDeskCards);
        setActive(!!active);
      }
    },
    [deskCards, prevDeskCards]
  );

  // 超时未出牌
  useEffect(
    () => {
      if (!count) {
        onPass();
      }
    },
    [count]
  );

  // 下一回合
  useEffect(
    () => {
      resetCount();
    },
    [turn]
  );

  const goPlay = () => {
    if (active) {
      playCard();
    }
  };

  return (
    <div className="chupai-container" style={styles[+turn]}>
      <div>还剩{count}s</div>
      {prevDeskCards.length ? <div onClick={onPass}>PASS</div> : null}
      <div
        className={active ? "play-card active" : "play-card"}
        onClick={goPlay}
      >
        出牌
      </div>
    </div>
  );
};

export default Chu;
