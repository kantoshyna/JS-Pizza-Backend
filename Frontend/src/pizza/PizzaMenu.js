/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');
var PizzaCart = require('./PizzaCart');
//var Pizza_List = require('../Pizza_List');
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
                PizzaCart.getPizzaFromCart(pizza.id, PizzaCart.PizzaSize.Big).quantity++;
                PizzaCart.updateCart();
            }


        });
        $node.find(".buy-small").click(function () {
            counter = parseInt($(".bl-orange-label").text()) || 0;
            $(".bl-orange-label").text(++counter);
            if (!PizzaCart.getPizzaFromCart(pizza.id, PizzaCart.PizzaSize.Small)) {
                PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Small);
            } else {
                PizzaCart.getPizzaFromCart(pizza.id, PizzaCart.PizzaSize.Small).quantity++;
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

    Pizza_List.forEach(function (pizza) {
        //Якщо піка відповідає фільтру
        //pizza_shown.push(pizza);

        //TODO: зробити фільтри
    });

    //Показати відфільтровані піци
    showPizzaList(pizza_shown);
}

function initialiseMenu() {
    //Показуємо усі піци
    //showPizzaList(Pizza_List);

    api.getPizzaList(function (error, data) {
        showPizzaList(data);
    });
}

exports.filterPizza = filterPizza;
exports.initialiseMenu = initialiseMenu;