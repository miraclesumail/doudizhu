import {
  checkSame,
  isConSeq,
  isSeqInrow,
  isFlywingOne,
  isFlywingTwo,
  getElesFromArr
} from "./index";
const cardSeq = [
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
  "2",
  "king1",
  "king2"
];

enum cardColors {
  BT = "♠",
  MH = "♣",
  HT = "♥",
  FK = "♦"
}

enum cardTypes {
  isSingle = "isSingle",
  isDouble = "isDouble",
  isTriangle = "isTriangle",
  isbomb = "isbomb",
  isTriplusOne = "isTriplusOne",
  isTriplusTwo = "isTriplusTwo",
  isConSeq = "isConSeq",
  isSeqInrow = "isSeqInrow",
  isFly = "isFly",
  isFlyWingOne = "isFlyWingOne",
  isFlyWingTwo = "isFlyWingTwo"
}
const cardArrs = ["BT", "MH", "HT", "FK"];

const checkMethods = [
  "isSingle",
  "isDouble",
  "isTriangle",
  "isbomb",
  "isTriplusOne",
  "isTriplusTwo",
  "isConSeq",
  "isSeqInrow",
  "isFly",
  "isFlyWingOne",
  "isFlyWingTwo"
];
/**
 * 17*3 + 3
 */
class Card {
  public cardId = 0;
  public cardNum = "";
  public cardColor = "";

  constructor(cardId: number) {
    this.cardId = cardId;
    const { cardNum, cardColor } = this.getCardInfo();
    this.cardNum = cardNum;
    this.cardColor = cardColor;
  }

  public getCardInfo() {
    let cardColor = "";
    let cardNum = "";
    if (this.cardId < 52) {
      cardNum = cardSeq[Math.floor(this.cardId / 4)];
      cardColor = (cardColors as any)[cardArrs[this.cardId % 4]];
    } else {
      if (this.cardId === 52) {
        cardNum = "king1";
      } else {
        cardNum = "king2";
      }
    }
    return {
      cardNum,
      cardColor
    };
  }

  public static compareCard(cardId1: number, cardId2: number): boolean {
    const card1 = new Card(cardId1);
    const card2 = new Card(cardId2);
    const index1 = cardSeq.indexOf(card1.cardNum);
    const index2 = cardSeq.indexOf(card2.cardNum);
    return index1 >= index2;
  }

  // 判断所出牌是否都一样
  public static checkAllEqual(cardIds: number[]): boolean {
    let flag = true;
    let cardNum = "";
    for (let i = 0; i < cardIds.length; i++) {
      if (cardNum) {
        if (new Card(cardIds[i]).cardNum !== cardNum) return false;
      } else {
        cardNum = new Card(cardIds[i]).cardNum;
      }
    }
    return flag;
  }

  // 是否是单张
  public static isSingle(cardIds: number[]): boolean {
    return cardIds.length === 1;
  }

  // 是否是对子
  public static isDouble(cardIds: number[]): boolean {
    if (cardIds.length === 2 && Card.checkAllEqual(cardIds)) {
      return true;
    }
    return false;
  }

  // 是否是三张 555 666
  public static isTriangle(cardIds: number[]): boolean {
    if (cardIds.length === 3 && Card.checkAllEqual(cardIds)) {
      return true;
    }
    return false;
  }

  // 是否是炸弹
  public static isbomb(cardIds: number[]): boolean {
    if (cardIds.length === 4 && Card.checkAllEqual(cardIds)) {
      return true;
    }
    return false;
  }

  // 是否是三带1 555-6 666-5
  public static isTriplusOne(cardIds: number[]): boolean {
    if (
      cardIds.length === 4 &&
      checkSame(cardIds.map(cardId => new Card(cardId).cardNum), 3)
    ) {
      return true;
    }
    return false;
  }

  // 是否是三带2 555-66 666-55
  public static isTriplusTwo(cardIds: number[]): boolean {
    if (
      cardIds.length === 5 &&
      checkSame(cardIds.map(cardId => new Card(cardId).cardNum), [3, 2])
    ) {
      return true;
    }
    return false;
  }

  // 是否是顺子  顺子不包含2 king
  public static isConSeq(cardIds: number[]): boolean {
    const max = Math.max.apply(null, cardIds);
    if (max <= 47 && isConSeq(cardIds.sort((prev, next) => prev - next), 4)) {
      return true;
    }
    return false;
  }

  // 是否是连对 44 55 66
  public static isSeqInrow(cardIds: number[]): boolean {
    if (
      isSeqInrow(
        cardIds
          .sort((prev, next) => prev - next)
          .map(item => Math.floor(item / 4)),
        2,
        3
      )
    ) {
      return true;
    }
    return false;
  }

  // 是否是飞机 444 555
  public static isFly(cardIds: number[]): boolean {
    if (
      isSeqInrow(
        cardIds
          .sort((prev, next) => prev - next)
          .map(item => Math.floor(item / 4)),
        3,
        2
      )
    ) {
      return true;
    }
    return false;
  }

  // 是否是飞机带翅膀  333-5 + 444-6
  public static isFlyWingOne(cardIds: number[]): boolean {
    if (isFlywingOne(cardIds.map(item => Math.floor(item / 4)))) {
      return true;
    }
    return false;
  }

  // 是否是飞机带翅膀  333-55 + 444-66
  public static isFlyWingTwo(cardIds: number[]): boolean {
    if (isFlywingTwo(cardIds.map(item => Math.floor(item / 4)))) {
      return true;
    }
    return false;
  }

  public static isValidCards(cardIds: number[]) {
    let flag = "";
    if (!cardIds.length) return flag;
    for (let i = 0; i < checkMethods.length; i++) {
      if ((Card as any)[checkMethods[i]](cardIds)) {
        console.log(i, "aa");
        flag = checkMethods[i];
        break;
      }
    }
    return flag;
  }

  public static compareCards(cardIds1: number[], cardIds2: number[]) {
    const type1 = Card.isValidCards(cardIds1);
    const type2 = Card.isValidCards(cardIds2);

    if (type1 !== type2) {
      return false;
    }

    if (
      [
        cardTypes.isSingle,
        cardTypes.isDouble,
        cardTypes.isTriangle,
        cardTypes.isbomb
      ].includes(type1 as any)
    ) {
      return Math.floor(cardIds1[0] / 4) > Math.floor(cardIds2[0] / 4);
    }

    if (type1 === cardTypes.isConSeq) {
      return (
        cardIds1.length === cardIds2.length &&
        Math.floor(cardIds1[0] / 4) > Math.floor(cardIds2[0] / 4)
      );
    }

    // 三代一 555-6
    if (type1 === cardTypes.isTriplusOne || type1 === cardTypes.isTriplusTwo) {
      const card1Num = getElesFromArr(cardIds1, 3)![0];
      const card2Num = getElesFromArr(cardIds2, 3)![0];
      return card1Num > card2Num;
    }

    if (type1 === cardTypes.isSeqInrow || type1 === cardTypes.isFly) {
      const card1Start = Math.min.apply(null, cardIds1);
      const card2Start = Math.min.apply(null, cardIds2);
      return cardIds1.length === cardIds2.length && card1Start > card2Start;
    }
  }
}

export default Card;
