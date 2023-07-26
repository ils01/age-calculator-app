const submit = document.querySelector(".button--submit");
const inputDay = document.querySelector("#day");
const inputMonth = document.querySelector("#month");
const inputYear = document.querySelector("#year");

const outputDay = document.querySelector("#output-day");
const outputMonth = document.querySelector("#output-month");
const outputYear = document.querySelector("#output-year");

const inputs = [inputDay, inputMonth, inputYear];
const NUMBER_OF_FIELDS = 3;
const today = new Date();

submit.addEventListener("click", validateInput);

function validateInput() {
    let flagCount = 0;
    inputs.forEach((input) => {
        let notif = document.querySelector(`.notification--${input.id}`);

        if (checkForEmpty(input, notif) && checkForRange(input, notif))
            flagCount += 1;
    });
    if (inputDay.value <= 31 && flagCount === NUMBER_OF_FIELDS) {
        flagCount += checkDateForValidity(+inputMonth.value, +inputDay.value);
    }
    if (flagCount === NUMBER_OF_FIELDS + 1) countAge();
}

function checkDateForValidity(month, day) {
    let isValid = true;
    let maxDays = 31;
    if (month === 2) maxDays = 28;
    else if ([4, 6, 9, 11].includes(month)) {
        maxDays = 30;
    }
    if (day > maxDays) {
        document.querySelector(`.notification--day`).textContent =
            "Must be a valid date";
        isValid = false;
    }
    return isValid;
}

function checkForEmpty(input, notif) {
    let isValid = true;
    if (!input.value) {
        notif.textContent = "The field is required";
        isValid = false;
    } else {
        notif.textContent = "";
    }
    return isValid;
}

function checkForRange(input, notif) {
    let isValid = true;
    if (
        input.id === "day" &&
        (isNaN(input.value) || input.value < 1 || input.value > 31)
    ) {
        notif.textContent = "Must be a valid day";
        isValid = false;
    } else if (
        input.id === "month" &&
        (isNaN(input.value) || input.value < 1 || input.value > 12)
    ) {
        notif.textContent = "Must be a valid month";
        isValid = false;
    } else if (input.id === "year") {
        if (isNaN(input.value) || input.value < 1900) {
            notif.textContent = "Must be a valid year";
            isValid = false;
        } else if (input.value > today.getFullYear()) {
            notif.textContent = "Must be in the past";
            isValid = false;
        }
    }
    return isValid;
}

function countAge() {
    const birthDay = inputDay.value;
    const birthMonth = +inputMonth.value;
    const birthYear = inputYear.value;

    const currDay = today.getDate();
    const currMonth = today.getMonth() + 1;
    const currYear = today.getFullYear();

    let ageDay = currDay - birthDay;
    let ageMonth = currMonth - birthMonth;
    let ageYear = currYear - birthYear;

    if (birthDay > currDay && birthMonth > currMonth) {
        ageMonth--;
        ageDay = currDay + (daysInMonth(birthMonth, birthYear) - birthDay);
    }

    if (birthDay > currDay && birthMonth < currMonth) {
        ageMonth--;
        ageDay = currDay + daysInMonth(currMonth - 1, currYear) - birthDay + 1;
    }

    if (birthDay > currDay && birthMonth === currMonth) {
        ageYear--;
        ageMonth = 11;
        ageDay = currDay + daysInMonth(currMonth - 1, currYear) - birthDay + 1;
    }

    if (birthMonth > currMonth) {
        ageYear--;
        ageMonth = 12 + ageMonth;
    }

    outputDay.textContent = ageDay;
    outputMonth.textContent = ageMonth;
    outputYear.textContent = ageYear;
}

function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}
