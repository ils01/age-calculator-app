const submit = document.querySelector(".button--submit");
const inputDay = document.querySelector("#day");
const inputMonth = document.querySelector("#month");
const inputYear = document.querySelector("#year");
const today = new Date();
const outputDay = document.querySelector("#output-day");
const outputMonth = document.querySelector("#output-month");
const outputYear = document.querySelector("#output-year");

submit.addEventListener("click", countAge);

function countAge() {
    const birthDay = inputDay.value || 8;
    const birthMonth = +inputMonth.value || 4;
    const birthYear = inputYear.value || 2002;

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
