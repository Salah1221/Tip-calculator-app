// Global Variables
let resetButton = document.querySelector(".result-screen button");
let billInput = document.querySelector("#bill");
let bill = -1;
let tipButtons = document.querySelectorAll(".tip");
let customTip = document.querySelector(".tip-custom");
let tipValue = -1;
let numberOfPeopleInput = document.querySelector("#nb-of-people");
let numberOfPeople = -1;
let tipResult = document.querySelector(".result:first-child .money");
let totalResult = document.querySelector(".result:last-of-type .money");
// Global Methods
function removeNonDigit(input) {
  let aux = parseFloat(input.value);
  if (isNaN(+input.value)) {
    if (isNaN(aux)) input.value = input.value.slice(1);
    else input.value = aux;
  }
}
function deselectAll(btnArr) {
  btnArr.forEach((x) => {
    x.classList.remove("selected");
    x.classList.add("unselected");
  });
}
function makePositive(input, num) {
  if (num < -1) input.value = input.value.slice(1);
  num = Math.abs(num);
}
function inputValidation() {
  if (numberOfPeople == 0) {
    numberOfPeopleInput.parentElement.parentElement.classList.add("invalid");
    numberOfPeopleInput.classList.add("invalid");
    return;
  }
  if (bill != -1 && tipValue != -1 && numberOfPeople != -1) {
    updateResult();
    resetButton.removeAttribute("disabled");
  } else {
    resetResult();
    resetButton.setAttribute("disabled", "true");
  }
}
function updateResult() {
  let aux1 = (bill * (tipValue / 100)) / numberOfPeople;
  let aux2 = (bill * (1 + tipValue / 100)) / numberOfPeople;
  if (aux1.toString().split(".")[0].length >= 7) {
    tipResult.innerHTML = aux1.toPrecision(3);
  } else {
    tipResult.innerHTML = aux1.toFixed(2);
  }
  if (aux2.toString().split(".")[0].length >= 7) {
    totalResult.innerHTML = aux2.toPrecision(3);
  } else {
    totalResult.innerHTML = aux2.toFixed(2);
  }
}
function resetResult() {
  tipResult.innerHTML = "0.00";
  totalResult.innerHTML = "0.00";
}
// Bill Input
billInput.oninput = () => {
  removeNonDigit(billInput);
  if (billInput.value) bill = +billInput.value;
  else bill = -1;
  inputValidation();
  makePositive(billInput, bill);
};
// Select Tip %
tipButtons.forEach((btn, _, btnArr) => {
  btn.onclick = () => {
    deselectAll(btnArr);
    btn.classList.add("selected");
    btn.classList.remove("unselected");
    customTip.value = "";
    tipValue = +btn.textContent.slice(0, -1);
    inputValidation();
  };
});
customTip.oninput = () => {
  removeNonDigit(customTip);
  if (customTip.value) {
    deselectAll(tipButtons);
    tipValue = +customTip.value;
  } else tipValue = -1;
  inputValidation();
  makePositive(customTip, tipValue);
};
// Number of people
numberOfPeopleInput.oninput = () => {
  removeNonDigit(numberOfPeopleInput);
  if (numberOfPeopleInput.value) {
    numberOfPeople = +numberOfPeopleInput.value;
  } else numberOfPeople = -1;
  numberOfPeopleInput.classList.remove("invalid");
  numberOfPeopleInput.parentElement.parentElement.classList.remove("invalid");
  inputValidation();
  makePositive(numberOfPeopleInput, numberOfPeople);
};
// Tip Amount and Total
resetButton.onclick = () => {
  tipValue = -1;
  bill = -1;
  numberOfPeople = -1;
  numberOfPeopleInput.value = "";
  customTip.value = "";
  billInput.value = "";
  deselectAll(tipButtons);
  resetButton.setAttribute("disabled", "true");
  resetResult();
};
