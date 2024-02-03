enum Operation {
  ADD = "ADD",
  SUB = "SUB",
  MUL = "MUL",
  DIV = "DIV",
  EXP = "EXP",
  LOG = "LOG",
  SIN = "SIN",
  COS = "COS",
  TAN = "TAN",
  REC = "REC",
  SQR = "SQR",
  SCI = "SCI",
}

const opMap = {
  [Operation.ADD]: "+",
  [Operation.SUB]: "-",
  [Operation.MUL]: "x",
  [Operation.DIV]: "/",
  [Operation.EXP]: "^",
};

const isOpUnary = (op: Operation) =>
  [
    Operation.LOG,
    Operation.SIN,
    Operation.COS,
    Operation.TAN,
    Operation.REC,
    Operation.SQR,
    Operation.SCI,
  ].includes(op);

const numBtns = document.querySelectorAll(".num-btn");
const opBtns = document.querySelectorAll(".op-btn");
const evalBtn = document.querySelector("#eval-btn")!;
const clearBtn = document.querySelector("#clear-btn")!;
const signBtn = document.querySelector("#sign-btn")!;
const decimalBtn = document.querySelector("#decimal-btn")!;
const mainDisplay = document.querySelector("#display__main")!;
const subDisplay = document.querySelector("#display__sub")!;

let leftVal = 0;
let rightVal: number | null = null;
let currentOp: Operation | null = null;
let hasDecimal = false;

let shouldReset = false;

numBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    if (e.target) {
      const btn = e.target as HTMLButtonElement;
      if (shouldReset) {
        shouldReset = false;
        clear();
      }

      if (!currentOp) {
        const newLeftVal = appendNumber(
          leftVal,
          parseFloat(btn.dataset.value as string),
          hasDecimal
        );
        leftVal = newLeftVal;
        mainDisplay.textContent = newLeftVal.toString();
      } else {
        const newRightVal = appendNumber(
          rightVal || 0,
          parseFloat(btn.dataset.value as string),
          hasDecimal
        );
        rightVal = newRightVal;
        mainDisplay.textContent = newRightVal.toString();
      }
    }
  });
});

opBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const btn = e.target as HTMLButtonElement;
    shouldReset = false;
    addOp(Operation[btn.dataset.value || "ADD"]);
  });
});

evalBtn.addEventListener("click", () => {
  if (rightVal != null && currentOp) {
    subDisplay.textContent = subDisplay.textContent + " " + rightVal + " =";

    const res = evaluate(leftVal, currentOp, rightVal);
    leftVal = res;
    currentOp = null;
    rightVal = null;
    mainDisplay.textContent = res.toString();
    shouldReset = true;
  }
});

clearBtn.addEventListener("click", () => clear());

signBtn.addEventListener("click", () => {
  const newVal = -leftVal;
  if (!currentOp) {
    leftVal = newVal;
  } else {
    rightVal = newVal;
  }
  mainDisplay.textContent = newVal.toString();
});

decimalBtn.addEventListener("click", () => {
  hasDecimal = true;
  mainDisplay.textContent += ".";
});

const appendNumber = (
  oldVal: number,
  num: number,
  hasDecimal: boolean = false
) => {
  return parseFloat(
    oldVal.toString() + (hasDecimal ? "." : "") + num.toString()
  );
};

const addOp = (op: Operation) => {
  if (!isOpUnary(op)) {
    currentOp = op;
    subDisplay.textContent = leftVal + " " + opMap[op];
  } else {
    if (!currentOp) {
      subDisplay.textContent = formatUnary(leftVal, op);
      leftVal = evaluate(leftVal, op);
    } else if (rightVal && currentOp) {
      subDisplay.textContent =
        leftVal + " " + opMap[currentOp] + " " + formatUnary(rightVal, op);
      leftVal = evaluate(leftVal, currentOp, evaluate(rightVal, op));
    }
    currentOp = null;
    rightVal = null;
    shouldReset = true;
    mainDisplay.textContent = leftVal.toString();
  }
};

const evaluate = (leftVal: number, op: Operation, rightVal?: number) => {
  let res: number;

  if (rightVal) {
    switch (op) {
      case Operation.ADD:
        res = leftVal + rightVal;
        break;
      case Operation.SUB:
        res = leftVal - rightVal;
        break;
      case Operation.MUL:
        res = leftVal * rightVal;
        break;
      case Operation.DIV:
        res = leftVal / rightVal;
        break;
      case Operation.EXP:
        res = Math.pow(leftVal, rightVal);
        break;
      default:
        res = 0;
        break;
    }
  } else {
    switch (op) {
      case Operation.LOG:
        res = Math.log10(leftVal);
        break;
      case Operation.SIN:
        res = leftVal * (Math.PI / 180);
        break;
      case Operation.COS:
        res = Math.cos(leftVal * (Math.PI / 180));
        break;
      case Operation.TAN:
        res = Math.tan(leftVal * (Math.PI / 180));
        break;
      case Operation.REC:
        res = 1 / leftVal;
        break;
      case Operation.SQR:
        res = leftVal * leftVal;
        break;
      case Operation.SCI:
        res = Math.pow(10, leftVal);
        break;
      default:
        res = 0;
        break;
    }
  }

  return res;
};

const clear = () => {
  leftVal = 0;
  currentOp = null;
  rightVal = null;
  subDisplay.textContent = "";
  mainDisplay.textContent = leftVal.toString();
};

const formatUnary = (num: number, op: Operation): string => {
  let res: string;
  switch (op) {
    case Operation.LOG:
      res = `log(${num})`;
      break;
    case Operation.SIN:
      res = `sin(${num})`;
      break;
    case Operation.COS:
      res = `cos(${num})`;
      break;
    case Operation.TAN:
      res = `tan(${num})`;
      break;

    case Operation.REC:
      res = `1/${num}`;
      break;

    case Operation.SQR:
      res = `${num}^2`;
      break;
    case Operation.SCI:
      res = `10^${num}`;
      break;

    default:
      res = `${num}`;
      break;
  }
  return res;
};
