export enum Operation {
  ADD = "ADD",
  SUB = "SUB",
  MUL = "MUL",
  DIV = "DIV",
}

export const opMap = {
  [Operation.ADD]: "+",
  [Operation.SUB]: "-",
  [Operation.MUL]: "x",
  [Operation.DIV]: "/",
};

const numBtns = document.querySelectorAll(".num-btn");
const opBtns = document.querySelectorAll(".op-btn");
const evalBtn = document.querySelector("#eval-btn")!;
const clearBtn = document.querySelector("#clear-btn")!;
const signBtn = document.querySelector("#sign-btn")!;
const mainDisplay = document.querySelector("#display__main")!;
const subDisplay = document.querySelector("#display__sub")!;

let leftVal = 0;
let rightVal: number | null = null;
let currentOp: Operation | null = null;

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
          parseFloat(btn.dataset.value as string)
        );
        leftVal = newLeftVal;
        mainDisplay.textContent = newLeftVal.toString();
      } else {
        const newRightVal = appendNumber(
          rightVal || 0,
          parseFloat(btn.dataset.value as string)
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
  evaluate();
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

const appendNumber = (oldVal: number, num: number) => {
  return parseFloat(oldVal.toString() + num.toString());
};

const addOp = (op: Operation) => {
  currentOp = op;
  subDisplay.textContent = leftVal + " " + opMap[op];
};

const evaluate = () => {
  if (rightVal != null && currentOp) {
    subDisplay.textContent = subDisplay.textContent + " " + rightVal + " =";

    let res: number;

    switch (currentOp) {
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

      default:
        res = 0;
        break;
    }
    leftVal = res;
    currentOp = null;
    rightVal = null;
    mainDisplay.textContent = res.toString();
    shouldReset = true;
  }
};

const clear = () => {
  leftVal = 0;
  currentOp = null;
  rightVal = null;
  subDisplay.textContent = "";
  mainDisplay.textContent = leftVal.toString();
};
