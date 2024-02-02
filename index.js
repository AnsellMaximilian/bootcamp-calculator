var numBtns = document.querySelectorAll(".num-btn");
var display = document.querySelector("#display");
numBtns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
        if (e.target) {
            var btn_1 = e.target;
            display.textContent = btn_1.dataset.value;
        }
    });
});
var getDisplayValue = function () {
    return parseFloat(display.textContent || "0");
};
