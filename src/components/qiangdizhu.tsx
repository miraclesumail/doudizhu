import React, { useContext, useState, useEffect, useCallback } from "react";

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

export const useCountDown = (time: number) => {
  let [count, setCount] = useState(time);

  const resetCount: any = useCallback(() => {
    setCount(time);
  }, []);

  useEffect(
    () => {
      const timer = setTimeout(function() {
        setCount(--count);
      }, 1000);

      return () => clearTimeout(timer);
    },
    [count]
  );

  return [count, resetCount];
};

const Qiang: React.FC<Props> = ({
  cardColor,
  cardNum,
  cardId,
  index,
  hideQiang,
  addToList
}) => {
  let [round, setRound] = useState(0);
  const [count, resetCount] = useCountDown(10);

  const increRound = useCallback(
    () => {
      if (round < 2) {
        setRound(++round);
      } else {
        hideQiang();
      }
    },
    [round]
  );

  const noQiang = () => {
    resetCount();
    increRound();
  };

  const qiang = () => {
    console.log("qiang", round);
    addToList(round);
    noQiang();
  };

  useEffect(
    () => {
      let timer: any = null;
      if (!count) {
        timer = setTimeout(noQiang, 500);
      }

      return () => {
        if (timer) clearTimeout(timer);
      };
    },
    [count]
  );

  return (
    <div className="qiang-container" style={styles[round]}>
      <div>还剩{count}s</div>
      <div onClick={noQiang}>不抢</div>
      <div onClick={qiang}>我抢</div>
    </div>
  );
};

export default Qiang;
