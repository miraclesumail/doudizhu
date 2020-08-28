import React, { useState, useRef, useEffect } from "react";

export const usePrevious = (val: any) => {
  const ref = useRef();

  useEffect(
    () => {
      ref.current = val;
    },
    [val]
  );

  return ref.current;
};

//  if (cardIds.length === 1) {
//       return true;
//     }

//     if (cardIds.length === 2 || cardIds.length === 3) {
//       return Card.checkAllEqual(cardIds);
//     }

//     if (cardIds.length === 4) {
//       return (
//         Card.checkAllEqual(cardIds) ||
//         checkSame(cardIds.map(cardId => new Card(cardId).cardNum), 3)
//       );
//     }

//     if (cardIds.length === 5) {
//       if (checkSame(cardIds.map(cardId => new Card(cardId).cardNum), [3, 2]))
//         return true;

//       if (isConSeq(cardIds.sort((prev, next) => prev - next), 4)) return true;

//       return false;
//     }

//     if (cardIds.length === 6) {
//       if (isConSeq(cardIds.sort((prev, next) => prev - next), 4)) return true;
//       if (
//         isSeqInrow(
//           cardIds
//             .sort((prev, next) => prev - next)
//             .map(item => Math.floor(item / 4)),
//           2,
//           3
//         )
//       )
//         return true;
//       if (
//         isSeqInrow(
//           cardIds
//             .sort((prev, next) => prev - next)
//             .map(item => Math.floor(item / 4)),
//           3,
//           2
//         )
//       )
//         return true;
//       return false;
//     }

//     return false;
