const dropListCur = document.querySelectorAll('.converter-box select'),
	  fromCur = document.querySelector('.from select'),
	  toCur = document.querySelector('.to select');
	  swapCur = document.querySelector('form .reverse'),
	  inpAmount = document.querySelector('.amount input'),
	  getButton = document.querySelector('form button'),
	  outExchenge = document.querySelector('form .exchange-rate');



dropListCur.forEach((select, i) => {
	for (let curCode in countryCode_list) {
		let selected;

		if (i == 0) {
			selected = curCode == 'USD' ? 'selected' : '';
		}else if (i == 1) {
			selected = curCode == 'RUB' ? 'selected' : '';
		}

		let option = `<option value="${curCode}" ${selected}>${curCode}</option>`;

		select.insertAdjacentHTML("beforeend", option);
	}

	//change icon currency
	select.addEventListener('change', () => {
		const code = select.value;
		const imgTag = select.parentElement.querySelector('img');
		imgTag.src = `https://flagcdn.com/48x36/${countryCode_list[code].toLowerCase()}.png`;
	});
});

window.addEventListener("load", getExchangeRate());

getButton.addEventListener('click', e => {
	e.preventDefault();
	getExchangeRate();
});

function getExchangeRate() {
	let amountValue = inpAmount.value;

	if (amountValue == '' || amountValue == 0) {
		inpAmount.value = '1';
		amountValue = 1;
	}

	var requestURL = `https://api.exchangerate.host/latest?base=${fromCur.value}`; 
	var request = new XMLHttpRequest(); 
	request.open('GET', requestURL);
	request.responseType = 'json';
	request.send();
	
	request.onload = function() {
		var response = request.response;
		let exRate = response.rates[toCur.value]  
		let totalExRate = (amountValue * exRate).toFixed(2);
		outExchenge.innerText = `${amountValue} ${fromCur.value} = ${totalExRate} ${toCur.value}`;
	}
}

// swap currency
swapCur.addEventListener('click', () => {
	let changeVar = fromCur.value;
	fromCur.value = toCur.value;
	toCur.value = changeVar;
	[fromCur, toCur].forEach((select) => {
		const code = select.value;
		const imgTag = select.parentElement.querySelector('img');
		imgTag.src = `https://flagcdn.com/48x36/${countryCode_list[code].toLowerCase()}.png`;
	});
	getExchangeRate();
});