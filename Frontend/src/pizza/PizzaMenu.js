/**
 * Created by chaika on 02.02.16.
 */
var Templates = require("../Templates");
var PizzaCart = require("./PizzaCart");
var Pizza_List;
var api = require("../API");

//HTML едемент куди будуть додаватися піци
var $pizza_list = $("#pizza_list");

function showPizzaList(list) {
    //Очищаємо старі піци в кошику
    $pizza_list.html("");

    //Онволення однієї піци
    function showOnePizza(pizza) {
        var html_code = Templates.PizzaMenu_OneItem({
            pizza: pizza
        });

        var $node = $(html_code);

        var counter;

        $node.find(".buy-big").click(function () {
            counter = parseInt($(".bl-orange-label").text()) || 0;
            $(".bl-orange-label").text(++counter);
            if (!PizzaCart.getPizzaFromCart(pizza.id, PizzaCart.PizzaSize.Big)) {
                PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Big);
            } else {
                PizzaCart.getPizzaFromCart(pizza.id, PizzaCart.PizzaSize.Big)
                    .quantity++;
                PizzaCart.updateCart();
            }
        });
        $node.find(".buy-small").click(function () {
            counter = parseInt($(".bl-orange-label").text()) || 0;
            $(".bl-orange-label").text(++counter);
            if (!PizzaCart.getPizzaFromCart(pizza.id, PizzaCart.PizzaSize.Small)) {
                PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Small);
            } else {
                PizzaCart.getPizzaFromCart(pizza.id, PizzaCart.PizzaSize.Small)
                    .quantity++;
                PizzaCart.updateCart();
            }
        });

        $pizza_list.append($node);
    }

    list.forEach(showOnePizza);
}

function filterPizza(filter) {
    //Масив куди потраплять піци які треба показати
    var pizza_shown = [];

    console.log("came in");

    Pizza_List.forEach(function (pizza) {
        //Якщо піка відповідає фільтру
        if (pizza.content[filter]) {
            pizza_shown.push(pizza);
            console.log("pushed");
        }
        if (filter == "meat") {
            console.log("meat filter");
            if (pizza.content['chicken']) {
                pizza_shown.push(pizza);
            }
        }
        if (filter == "vega") {
            if (pizza.type == 'Вега піца') {
                pizza_shown.push(pizza);
            }
        }
    });

    //Показати відфільтровані піци
    showPizzaList(pizza_shown);
}

function initialiseMenu(data) {
    //Показуємо усі піци
    //showPizzaList(Pizza_List);
    Pizza_List = data;
    $("#all").click(function (params) {
        api.getPizzaList(function (error, data) {
            showPizzaList(data);
        });
    });

    $("#meat").click(function (params) {
        api.getPizzaList(function (error, data) {
            filterPizza("meat");
        });
    });
    $("#ananas").click(function (params) {
        api.getPizzaList(function (error, data) {
            filterPizza("pineapple");
        });
    });
    $("#mushrooms").click(function (params) {
        api.getPizzaList(function (error, data) {
            filterPizza("mushroom");
        });
    });
    $("#seafood").click(function (params) {
        api.getPizzaList(function (error, data) {
            filterPizza("ocean");
        });
    });
    $("#vega").click(function (params) {
        api.getPizzaList(function (error, data) {
            filterPizza("vega");
        });
    });

    $("li").click(function () {
        $("li").removeClass("active");
        $(this).addClass("active");
    });
}

exports.filterPizza = filterPizza;
exports.initialiseMenu = initialiseMenu;