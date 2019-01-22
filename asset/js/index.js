$(document).ready(function() {
    /*$(".loader").fadeOut(2500);*/
    $(".container").fadeIn(1000);
    var answer;
    var answer2;
    var flag = false;
    $('span').click(function() {
        if ($(this).data("answer") === "correct") {
            answer = $(this).text();
            flag = true
            $(this).siblings().removeClass("incorrect");

        } else if ($(this).data("answer") === "incorrect") {
            flag = false
            answer2 = $(this).text();

            $(this).addClass("incorrect");
        }
        console.log(flag);
    });
    $('.answer').click(function(e) {


        var xxTarget = $(event.target)
        var haveText = xxTarget.html()
        if (haveText != '') {
            console.log("haveText");
        } else if (!flag) {
            console.log(xxTarget.text(answer2));
            xxTarget.text(answer2);
            visiblElement(xxTarget);
        } else if (flag) {
            console.log(xxTarget.text(answer));
            xxTarget.text(answer);
            visiblElement(xxTarget);
            answer = ''
        }




    });

    $('.restetAll').click(() => {

        var resetEl = $("span.question");
        resetEl.css({
            "visibility": "visible"
        });
        $('.answer').empty();
        answer = '';
    });

    function visiblElement(xxTarget) {
        xxTarget.removeClass("correctSound");

        $("span.question").each(function(index) {
            var incorrect = $(this).hasClass("incorrect");
            var x = $(this).text();
            var xx = $(this);
            if (x === answer) {
                xx.css({
                    "visibility": "hidden"
                });



            }

            if (incorrect) {


                $(this).css({
                    "visibility": "visible"
                });
                //  xxTarget.addClass('correctSound').append("<audio controls autoplay > <source src='correct.mp3' type='audio/mpeg'> </audio>");
                setTimeout(() => {

                    xxTarget.removeClass("correctSound");
                    xxTarget.empty();


                }, 500)
            }


        })
    }

    $('.result').click(() => {
        var arr = []
        $("span.question").each(function(index, item) {
            if ($(item).data("answer") === "correct") {
                var resyltItem = $(item).html()
                arr.push(resyltItem);
            }
        });

        liList = $('.col-sm-12.answer');
        liList.map((index, element) => {
            $(element).text(arr[index]);
        });




    })
});