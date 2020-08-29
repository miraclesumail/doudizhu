export function shuffle(array: any[]): any[] {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// 模拟发牌
export function extractArr(arrs: number[], index: number, total: number = 17) {
  const arr = [];
  for (let i = index; i < arrs.length; i += 3) {
    arr.push(arrs[i]);
    if (arr.length >= total) break;
  }
  return arr;
}

export function removeEleFrom(arr: any[], ele: any) {
  const copy = arr.slice();
  const index = arr.indexOf(ele);
  copy.splice(index, 1);
  return copy;
}

export function removeElesFrom(arr: any[], eles: any) {
  const arrs = [];
  for (let i = 0; i < arr.length; i++) {
    if (!eles.includes(arr[i])) {
      arrs.push(arr[i]);
    }
  }
  return arrs;
}

// 是否是连续的  3 4 5 6 7 顺子
export function isConSeq(arrs: number[], baseNum: number) {
  let prev = undefined;
  if (arrs.length < 5) return false;
  for (let i = 0; i < arrs.length; i++) {
    if (i) {
      const now = Math.floor(arrs[i] / baseNum);
      if (prev !== undefined && now !== prev + 1) {
        return false;
      } else {
        prev = now;
      }
    } else {
      prev = Math.floor(arrs[i] / baseNum);
    }
  }
  return true;
}

// 检查3带2  3带1
export function checkSame(arrs: any[], amount: number | number[]) {
  const obj: any = {};
  for (let i = 0; i < arrs.length; i++) {
    obj[arrs[i]] = obj[arrs[i]] ? obj[arrs[i]] + 1 : 1;
  }

  if (typeof amount === "number") {
    return Object.keys(obj).some(key => obj[key] === amount);
  } else {
    let flag = true;
    for (const [key, val] of Object.entries(obj)) {
      if (amount.indexOf(val as any) === -1) {
        return false;
      }
    }
    return flag;
  }
}

/**
 * 检查 是否是连对或飞机 33 44 55 或 333 444 555
 */
export function isSeqInrow(arrs: number[], repeat: number, least: number = 3) {
  if (arrs.length % 2) {
    return false;
  }
  let count = 0;
  let basket: any = [];
  let prev = undefined;
  while (count <= arrs.length - 1) {
    const repeatNumbers = basket.length / repeat;
    if (basket.length && Math.floor(repeatNumbers) !== repeatNumbers) {
      const now = arrs[count];
      if (now !== prev) return false;
      basket.push(now);
    } else {
      prev = arrs[count];
      if (basket.length && basket[basket.length - 1] + 1 !== prev) return false;
      basket.push(prev);
    }
    count++;
  }
  return arrs.length / repeat >= least;
}

export function getElesFromArr(arrs: number[], repeat: number = 1) {
  const map: any = new Map();
  for (let i = 0; i < arrs.length; i++) {
    if (map.has(arrs[i])) {
      map.set(arrs[i], map.get(arrs[i]) + 1);
    } else {
      map.set(arrs[i], 1);
    }
  }
  const arr = [];
  for (const key of map) {
    console.log("key", key);
    if (key[1] === repeat) {
      arr.push(key[0]);
    }
  }
  return arr;
}

// 是否是飞机带翅膀  555-6 + 666-5
export function isFlywingOne(arrs: number[]) {
  if (arrs.length % 4) {
    return false;
  }
  const singles = getElesFromArr(arrs);
  if (singles.length !== arrs.length / 4) {
    return false;
  }

  const rest = removeElesFrom(arrs, singles);
  console.log(rest, "rest");
  const flag = isSeqInrow(rest, 3, arrs.length / 4);

  return flag;
}

// 是否是飞机带翅膀  555-77 + 666-88
export function isFlywingTwo(arrs: number[]) {
  if (arrs.length % 5) {
    return false;
  }

  const singles = getElesFromArr(arrs, 2);
  if (singles.length !== arrs.length / 5) {
    return false;
  }
  const rest = removeElesFrom(arrs, singles);
  const flag = isSeqInrow(rest, 3, arrs.length / 5);

  return flag;
}
