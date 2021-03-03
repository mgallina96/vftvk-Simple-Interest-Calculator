const valueIsNotValidMessage = "Some of the inputs are not valid."

function initPage() {
    hideResult();
    setNumberOfYearsList();
    setYear();
    setPrincipal()
    setRateSlider();
    setRateValue();
    initValidationAlerts()
}

function initValidationAlerts() {
    removeDefaultValidationAlerts();
    hideValidationAlert("principalValidationAlert");
    hideValidationAlert("rateValidationAlert");
    hideValidationAlert("yearsValidationAlert");
}

function compute() {
    let amount = document.getElementById("principal").value;
    if(!validatePrincipalValue()) {
        alert(valueIsNotValidMessage);
        return;
    }

    let rate = document.getElementById("rate").value;
    if(!validateRateValue()) {
        alert(valueIsNotValidMessage);
        return;
    }

    let years = document.getElementById("years").value;
    if(!validateYearValue()) {
        alert(valueIsNotValidMessage);
        return;
    }

    let result = computeResultValue(parseFloat(amount), parseFloat(rate), parseInt(years));

    showResult(parseFloat(amount).toFixed(2), parseFloat(rate), getEndingYear(parseInt(years)), result.toFixed(2));
}

function getEndingYear(years) {
    let currentYear = new Date().getFullYear();
    return currentYear + years;
}

function computeResultValue(amount, rate, years) {
    return amount * (rate / 100 * years);
}

function setRateValue(value = 3.5) {
    hideValidationAlert("rateValidationAlert");
    document.getElementById("rateValue").value=value;
    validateRateValue();
}

function setRateSlider(value = 3.5) {
    hideValidationAlert("rateValidationAlert");
    document.getElementById("rate").value = value;
    validateRateValue();
}

function setPrincipal(value = 1_000_000) {
    hideValidationAlert("principalValidationAlert");
    document.getElementById("principal").value = value;
    validatePrincipalValue();
}

function setYear(value = "5") {
    hideValidationAlert("yearsValidationAlert");
    document.getElementById("years").value = value;
    validateYearValue();
}

function setNumberOfYearsList(minValue = 1, maxValue = 100) {
    let options = '';
    for(let i = minValue; i <= maxValue; i++) {
        options += '<option value="' + i + '" />';
    }
    let numberOfYears = document.getElementById("numberOfYears");
    numberOfYears.innerHTML = options;
}

function validatePrincipalValue() {
    let input = document.getElementById("principal");
    let value = input.value;

    if(value === undefined || value == null) {
        showValidationAlert("principalValidationAlert", "Must have a value.");
        input.focus();
        return false;
    }

    if(value <= 0) {
        showValidationAlert("principalValidationAlert", "Value must be a positive number.");
        input.focus();
        return false;
    }

    return true;
}

function validateRateValue() {
    let input = document.getElementById("rateValue");
    let value = input.value;

    if(value === undefined || value == null) {
        showValidationAlert("rateValidationAlert", "Must have a value.");
        input.focus();
        return false;
    }

    if(value <= 0) {
        showValidationAlert("rateValidationAlert", "Interest rate must be a positive number.");
        input.focus();
        return false;
    }

    return true;
}

function validateYearValue() {
    let input = document.getElementById("years");


    if(isNaN(input.value)) {
        showValidationAlert("yearsValidationAlert", "Years must be a number.");
        input.focus();
        return false;
    }

    let value = parseInt(input.value);

    if(value === undefined || value == null) {
        showValidationAlert("yearsValidationAlert", "Must have a value.");
        input.focus();
        return false;
    }

    if(value <= 0) {
        showValidationAlert("yearsValidationAlert", "Years must be a positive number.");
        input.focus();
        return false;
    }

    return true;
}

function showValidationAlert(id, message) {
    let validationAlert = document.getElementById(id);
    validationAlert.style.color = "rgb(200, 0, 0)";
    validationAlert.innerHTML = message;
    validationAlert.hidden = false;
}

function hideValidationAlert(id) {
    let validationAlert = document.getElementById(id);
    validationAlert.hidden = true;
    validationAlert.innerHTML = "";
}

function removeDefaultValidationAlerts() {
    let inputs = document.getElementsByTagName( "input" );
    for(let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener( "invalid",
            function( event ) {
                event.preventDefault();
            });
    }
}

function hideResult() {
    let result = document.getElementById("result");
    result.hidden = true;
}

function showResult(amount, rate, years, result) {
    let outputBlock = document.getElementById("result");
    let principalOutput = document.getElementById("principalOutput");
    let rateOutput = document.getElementById("rateOutput");
    let output = document.getElementById("output");
    let yearOutput = document.getElementById("yearOutput");

    principalOutput.innerText = amount;
    rateOutput.innerText = rate.toString() + "%";
    output.innerText = result;
    yearOutput.innerText = years;

    outputBlock.hidden = false;
}
        