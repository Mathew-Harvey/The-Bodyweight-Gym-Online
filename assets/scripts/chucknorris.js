
$(".modal-close").on("click", function () {
    $(".modal-chucknorris").removeClass("is-active");
    $("#chucknorris-quote").text("Loading...");
})

$(".chucknorris-btn").on("click", function () {
    var url = `http://api.icndb.com/jokes/random`;
    $.ajax({
        url: url,
        success: function (data) {
            $("#chucknorris-quote").text('"' + data.value.joke + '" - Chuck Norris');
        },
        error: function () {
        }
    });
    $(".modal-chucknorris").addClass("is-active");
})