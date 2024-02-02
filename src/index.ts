const numBtns: NodeListOf<HTMLButtonElement> =
  document.querySelectorAll(".num-btn");
const display = document.querySelector("#display")!;

numBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    if (e.target) {
      const btn = e.target as HTMLButtonElement;
      display.textContent = btn.dataset.value as string;
    }
  });
});

const getDisplayValue = () => {
  return parseFloat(display.textContent || "0");
};
