$(document).ready(function () {
    let $slider = $("#slider-range");
    let priceMin = $slider.attr("data-price-min"),
        priceMax = $slider.attr("data-price-max");
    console.log($slider)

    $slider.slider({
        range: true,
        min: priceMin,
        max: priceMax,
        values: [priceMin, priceMax],
        slide: function (event, ui) {
            $("#amount").text("$" + ui.values[0] + " - $" + ui.values[1]);
        }
    });
    console.log($slider.slider.max)
    $("#amount").text("$" + $slider.slider("values", 0) + " - $" + $slider.slider("values", 1));
});