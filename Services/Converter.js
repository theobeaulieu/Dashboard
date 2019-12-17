function converter(currencySrc, currencyDest, id_time) {
    var quantity = document.getElementById("quantity").value;
    $.ajax({
        url: 'https://api.exchangeratesapi.io/latest?base=' + currencySrc,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            var currency = data.rates;
            Object.entries(currency).forEach(
                ([cle, valeur]) => {
                    for (i in cle) {
                        if (currencyDest == `${cle}`) {
                            var display_result = (`${valeur}` * quantity);
                            document.getElementById("result_" + id_time).innerHTML = display_result.toFixed(2) + " " + currencyDest;
                        }
                    }
                });
            if (currencyDest == currencySrc)
                document.getElementById("result_" + id_time).innerHTML = quantity + " " + currencySrc;
        }
    })
}