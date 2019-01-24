$(document).ready(function() {
	$(".loader").fadeOut(1000);
	$(".page-content").fadeIn(2000);
	var answerCorrect;
	var answerInCorrect;
	var flag = false;

	/*
	 ** check  if the span data-answer has correct or not correct if correct add active class 
	 ** else if data-answer has incorrect  add class incorrect to target element and  remove from any another one 
	 *** the  flag for test  if is correct or  no  to easy access to another function
	 */

	$('span.question').click(function() {
		if ($(this).data("answer") === "correct") {
			answerCorrect = $(this).text();
			flag = true
			$(this).addClass('active').siblings().removeClass("active");
			$(this).siblings().removeClass("incorrect");
		} else if ($(this).data("answer") === "incorrect") {
			flag = false
			answerInCorrect = $(this).text();
			$(this).addClass("incorrect");
			$(this).siblings().removeClass("incorrect active");
		}
	});

	/* 
	   **** when click in div elementTargert to past the select answer from the span 
	   **** first check the elementTargert if ccontain  any  text  can't add anothe text to this elementTargert
	   ***** if else access to the  flag if true the answer correct  else the answer is Incorrect
	   *** and finally can call visibleElment() functin this function take the element target

    */

	$('.answer').click(function(e) {
		var elementTarget = $(event.target)
		var haveText = elementTarget.html()
		if (haveText != '') {
			console.log("haveText");
		} else if (!flag) {
			elementTarget.text(answerInCorrect);
			visiblElement(elementTarget);
		} else if (flag) {
			elementTarget.text(answerCorrect);
			visiblElement(elementTarget);
			answerCorrect = ''
		}
	});

	/* 
	 ** this function access  to   elementTarget fetch the text for element if correct hide the correct answer add in dev 
	 ** and then add the audio and img warning  or not 
	 */

	function visiblElement(elementTarget) {
		elementTarget.removeClass("correctSound");
		$("span.question").each(function(index) {
			var incorrect = $(this).hasClass("incorrect");
			var thisElementText = $(this).text();
			var thisElement = $(this);
			var buttonDisable = $(".result");
			if (thisElementText === answerCorrect) {
				thisElement.css({
					"visibility": "hidden"
				});
				elementTarget.addClass('correctSound').append(" <span class='media-warning'><audio controls autoplay > <source src='yesCorrect.wav' type='audio/mpeg'> </audio> <img  class='animation-target' src='asset/img/correct.png'></span>");
			}
			if (incorrect) {
				$(this).css({
					"visibility": "visible"
				});
				elementTarget.addClass('correctSound').append(" <span class='media-warning'><audio controls autoplay > <source src='Incorrect.wav' type='audio/mpeg'> </audio> <img src='asset/img/crossMark.png' ></span>");
				setTimeout(() => {
					buttonDisable.removeAttr('disabled');
					elementTarget.removeClass("correctSound");
					elementTarget.empty();
				}, 500)
			}
			var arrDisable = [];
			$(".answer").map(function(index, elem) {
				arrDisable.push($(elem).text());
			})
			if (!arrDisable.includes("")) {
				$('.result').attr('disabled', true);
			} else {
				$(".result").removeAttr('disabled');
			}
		})
	}

	/*
	 *** to restart  the exam again every thing back  to the first time 
	 */

	$('.restetAll').click(() => {
		var resetEl = $("span.question");
		resetEl.css({
			"visibility": "visible"
		}).removeClass('active incorrect');
		$('.answer').empty();
		answerCorrect = '';
		answerInCorrect = ''
		$(".result").removeAttr('disabled');
	});

	/*
	 ** this event  show  all  result correct with imgcorrect if can't finshid the  exam by yourself 
	 */

	$('.result').click(() => {
		var arr = []
		$("span.question").each(function(index, item) {
			if ($(item).data("answer") === "correct") {
				var resultItem = $(item).html()
				arr.push(resultItem);
				$(item).css({
					"visibility": "hidden"
				});
			}
		});
		elementList = $('.answer');
		elementList.map((index, element) => {
			$(element).text(arr[index]).append("<span class='media-warning'> <img src='asset/img/correct.png' class='animation-target'></span>")
		});
	})

	$(".modal-wide").on("show.bs.modal", function() {
		var height = $(window).height() - 100;
		$(this).find(".modal-body").css("max-height", height);
	  });
});
