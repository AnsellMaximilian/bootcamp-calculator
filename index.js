var _a;
var Operation;
(function (Operation) {
    Operation["ADD"] = "ADD";
    Operation["SUB"] = "SUB";
    Operation["MUL"] = "MUL";
    Operation["DIV"] = "DIV";
    Operation["LOG"] = "LOG";
})(Operation || (Operation = {}));
var opMap = (_a = {},
    _a[Operation.ADD] = "+",
    _a[Operation.SUB] = "-",
    _a[Operation.MUL] = "x",
    _a[Operation.DIV] = "/",
    _a[Operation.LOG] = "log",
    _a);
var isOpEnclosing = function (op) { return op === Operation.LOG; };
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
    evaluate();
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
    currentOp = op;
    subDisplay.textContent = leftVal + " " + opMap[op];
};
var evaluate = function () {
    if (rightVal != null && currentOp) {
        subDisplay.textContent = subDisplay.textContent + " " + rightVal + " =";
        var res = void 0;
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
var clear = function () {
    leftVal = 0;
    currentOp = null;
    rightVal = null;
    subDisplay.textContent = "";
    mainDisplay.textContent = leftVal.toString();
};
