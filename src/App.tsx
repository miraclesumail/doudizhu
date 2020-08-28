import React, { Component } from "react";
import CardContainer from "./components/card";
import { shuffle, extractArr, removeEleFrom } from "./utils";
import Card from "./utils/card";
import Qiang from "./components/qiangdizhu";
import Chu from "./components/play-card";
import "./index.css";

export const CardContext = React.createContext({
  cardList: [],
  turn: "",
  deskCards: [],
  prevDeskCards: [],
  chuPai: (card: number) => {},
  playCard: () => {},
  nextTurn: () => {}
});
const arrs = Array.from({ length: 54 }, (_, index) => index);

class App extends Component<any, any> {
  public state = {
    cardList: [],
    botList: [], // 底牌
    botShow: false,
    hasQiang: false, // 是否已经抢地主
    qiangList: [], // 抢地主的名单
    turn: "",
    deskCards: [], // 桌面上出的牌
    prevDeskCards: [], // 用于比较回合出牌大小
    whoInrun: "" // 是哪一桌出的牌
  };

  componentDidMount() {
    const cardArrs = shuffle(arrs);
    const cardList = [];
    // 获得每桌的牌堆
    for (let i = 0; i < 3; i++) {
      const list = extractArr(cardArrs, i).sort(
        (prev: any, next: any) => prev - next
      );
      // .map(item => new Card(item));
      cardList.push(list);
    }

    this.setState({
      cardList,
      botList: cardArrs.slice(-3)
    });
  }

  // 获取玩家牌样式
  public getStyle = (stand: number, index: number) => {
    const { cardList } = this.state;
    const totalWidth = 30 * ((cardList as any)[stand].length - 1) + 90;
    const firstLeft = (700 - totalWidth) / 2;
    const left = firstLeft + 30 * index;
    return {
      left: left + "px",
      zIndex: index + 1
    };
  };

  // 获取底牌样式
  public getBotStyle = (index: number) => {
    const { cardList } = this.state;
    const totalWidth = 30 * 2 + 90;
    const firstLeft = (200 - totalWidth) / 2;
    const left = firstLeft + 30 * index;
    return {
      left: left + "px",
      zIndex: index + 1
    };
  };

  // 分配地主
  public decideDizhu = () => {
    const { qiangList, cardList, botList } = this.state;
    const tempList: any[] = cardList.slice();
    let chosenOne: any;
    if (!qiangList.length) {
      chosenOne = shuffle(shuffle([0, 1, 2]))[0];
      // alert(`${chosenOne}号桌抢得地主`);
    } else {
      chosenOne = shuffle(shuffle(qiangList))[0];
      // alert(`${chosenOne}号桌抢得地主`);
    }
    let dizhuList: any[] = tempList[chosenOne];
    dizhuList = [...dizhuList, ...botList].sort(
      (prev: any, next: any) => prev - next
    );

    tempList[chosenOne] = dizhuList;
    this.setState(
      {
        botShow: true
      },
      () =>
        setTimeout(
          () =>
            this.setState({
              botList: [],
              cardList: tempList,
              turn: chosenOne
            }),
          1000
        )
    );
  };

  // 点击牌向上移动
  public chuPai = (card: number) => {
    const { deskCards } = this.state as any;
    if (deskCards.includes(card)) {
      this.setState({ deskCards: removeEleFrom(deskCards, card) });
    } else {
      this.setState({
        deskCards: [...this.state.deskCards, card]
      });
    }
  };

  // 出牌  清除deskcards暂存区的牌
  public playCard = () => {
    let { deskCards, cardList, turn } = this.state as any;
    const tempList = cardList.slice();
    const cardArrs = (cardList[+turn] as any[])
      .slice()
      .filter(item => !deskCards.includes(item));
    tempList[turn] = cardArrs;
    // 出完牌要设置 prevDeskCards 给下家进行比对
    this.setState({
      cardList: tempList,
      prevDeskCards: deskCards.slice(),
      whoInrun: turn,
      deskCards: [],
      turn: ++turn > 2 ? 0 : turn
    });
  };

  // 要不起上家的牌 下一个turn
  public nextTurn = () => {
    let { turn, whoInrun } = this.state as any;
    turn = ++turn > 2 ? 0 : turn;

    // 转了一圈没人要 又轮到自己出牌
    if (turn === whoInrun) {
      this.setState({
        prevDeskCards: [],
        turn
      });
    } else {
      this.setState({
        turn
      });
    }
  };

  render() {
    const {
      cardList,
      botList,
      botShow,
      hasQiang,
      qiangList,
      turn,
      deskCards,
      prevDeskCards
    } = this.state;
    // console.log(Card.isValidCards([0, 1, 5, 6, 9, 10]), "isValid");
    console.log(Card.isValidCards([0, 4]), "isValid");
    return (
      <div>
        <CardContext.Provider
          value={{
            cardList,
            turn,
            deskCards,
            prevDeskCards,
            chuPai: this.chuPai as any,
            playCard: this.playCard,
            nextTurn: this.nextTurn
          }}
        >
          {!hasQiang ? (
            <Qiang
              hideQiang={() => {
                this.setState({ hasQiang: true });
                setTimeout(() => {
                  this.decideDizhu();
                }, 1000);
              }}
              addToList={(desk: number) =>
                this.setState({ qiangList: [...qiangList, desk] })}
            />
          ) : null}

          {turn !== "" ? <Chu /> : null}
          {/*底牌 抢地主*/}
          <div className="bot-container">
            {botList.length ? (
              botList.map((card: any, index: number) => (
                <CardContainer
                  key={index}
                  {...{
                    cardId: card,
                    index,
                    style: this.getBotStyle(index),
                    hidden: !botShow
                  }}
                />
              ))
            ) : null}
          </div>

          {cardList.length &&
            cardList.map((cards: any, stand: number) => (
              <div className={`container${stand}`} key={stand}>
                {cards.map((item: any, index: number) => {
                  const style = this.getStyle(stand, index);
                  return (
                    <CardContainer
                      key={index}
                      {...{
                        cardId: item,
                        index,
                        stand,
                        style
                      }}
                    />
                  );
                })}
              </div>
            ))}
        </CardContext.Provider>
        {/*<audio autoPlay={true} controls={false} loop>
          <source src="/doudizhu.mp3" type="audio/ogg" />
          <source src="/doudizhu.mp3" type="audio/mpeg" />
        </audio>*/}
      </div>
    );
  }
}

export default App;
