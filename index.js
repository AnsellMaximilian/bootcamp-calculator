var _a;
var Operation;
(function (Operation) {
    Operation["ADD"] = "ADD";
    Operation["SUB"] = "SUB";
    Operation["MUL"] = "MUL";
    Operation["DIV"] = "DIV";
    Operation["EXP"] = "EXP";
    Operation["LOG"] = "LOG";
    Operation["SIN"] = "SIN";
    Operation["COS"] = "COS";
    Operation["TAN"] = "TAN";
    Operation["REC"] = "REC";
    Operation["SQR"] = "SQR";
    Operation["SCI"] = "SCI";
})(Operation || (Operation = {}));
var opMap = (_a = {},
    _a[Operation.ADD] = "+",
    _a[Operation.SUB] = "-",
    _a[Operation.MUL] = "x",
    _a[Operation.DIV] = "/",
    _a[Operation.EXP] = "^",
    _a);
var isOpUnary = function (op) {
    return [
        Operation.LOG,
        Operation.SIN,
        Operation.COS,
        Operation.TAN,
        Operation.REC,
        Operation.SQR,
        Operation.SCI,
    ].includes(op);
};
var numBtns = document.querySelectorAll(".num-btn");
var opBtns = document.querySelectorAll(".op-btn");
var evalBtn = document.querySelector("#eval-btn");
var clearBtn = document.querySelector("#clear-btn");
var signBtn = document.querySelector("#sign-btn");
var decimalBtn = document.querySelector("#decimal-btn");
var mainDisplay = document.querySelector("#display__main");
var subDisplay = document.querySelector("#display__sub");
var leftVal = 0;
var rightVal = null;
var currentOp = null;
var hasDecimal = false;
var shouldReset = false;
numBtns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
        if (e.target) {
            var btn_1 = e.target;
            if (shouldReset) {
                shouldReset = false;
                clear();
            }
            if (!currentOp) {
                var newLeftVal = appendNumber(leftVal, parseFloat(btn_1.dataset.value), hasDecimal);
                leftVal = newLeftVal;
                mainDisplay.textContent = newLeftVal.toString();
            }
            else {
                var newRightVal = appendNumber(rightVal || 0, parseFloat(btn_1.dataset.value), hasDecimal);
                rightVal = newRightVal;
                mainDisplay.textContent = newRightVal.toString();
            }
        }
    });
});
opBtns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
        var btn = e.target;
        shouldReset = false;
        addOp(Operation[btn.dataset.value || "ADD"]);
    });
});
evalBtn.addEventListener("click", function () {
    if (rightVal != null && currentOp) {
        subDisplay.textContent = subDisplay.textContent + " " + rightVal + " =";
        var res = evaluate(leftVal, currentOp, rightVal);
        leftVal = res;
        currentOp = null;
        rightVal = null;
        mainDisplay.textContent = res.toString();
        shouldReset = true;
    }
});
clearBtn.addEventListener("click", function () { return clear(); });
signBtn.addEventListener("click", function () {
    var newVal = -leftVal;
    if (!currentOp) {
        leftVal = newVal;
    }
    else {
        rightVal = newVal;
    }
    mainDisplay.textContent = newVal.toString();
});
decimalBtn.addEventListener("click", function () {
    hasDecimal = true;
    mainDisplay.textContent += ".";
});
var appendNumber = function (oldVal, num, hasDecimal) {
    if (hasDecimal === void 0) { hasDecimal = false; }
    return parseFloat(oldVal.toString() + (hasDecimal ? "." : "") + num.toString());
};
var addOp = function (op) {
    if (!isOpUnary(op)) {
        currentOp = op;
        subDisplay.textContent = leftVal + " " + opMap[op];
    }
    else {
        if (!currentOp) {
            subDisplay.textContent = formatUnary(leftVal, op);
            leftVal = evaluate(leftVal, op);
        }
        else if (rightVal && currentOp) {
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
var evaluate = function (leftVal, op, rightVal) {
    var res;
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
    }
    else {
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
var clear = function () {
    leftVal = 0;
    currentOp = null;
    rightVal = null;
    subDisplay.textContent = "";
    mainDisplay.textContent = leftVal.toString();
};
var formatUnary = function (num, op) {
    var res;
    switch (op) {
        case Operation.LOG:
            res = "log(".concat(num, ")");
            break;
        case Operation.SIN:
            res = "sin(".concat(num, ")");
            break;
        case Operation.COS:
            res = "cos(".concat(num, ")");
            break;
        case Operation.TAN:
            res = "tan(".concat(num, ")");
            break;
        case Operation.REC:
            res = "1/".concat(num);
            break;
        case Operation.SQR:
            res = "".concat(num, "^2");
            break;
        case Operation.SCI:
            res = "10^".concat(num);
            break;
        default:
            res = "".concat(num);
            break;
    }
    return res;
};
