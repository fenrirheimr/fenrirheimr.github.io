$(document).ready(function() {
	// Menu
	$('#menu-top').sticky({responsiveWidth: true});
	
	// Top Info
	$('#news-top .close').click(function(){
		var hMenu = $('.navbar-brand').height();
		
		$('#news-top').css({'display':'none'});
		
		$('.sticky-wrapper').height(hMenu);
	});
	
	// Карусель в номерах
	$('.rm_slider').bxSlider();


	// Карусель в "О нас"
	$('.slider').bxSlider({
		maxSlides: 5,
		slideWidth: 490
	});
	
	// Селекты и даты
	$('.selectpicker').selectpicker();
	$('.datepicker').datepicker({
		format: 'dd.mm.yyyy',
		weekStart: 1
	});
	
	// Маска времени
	$('.time input').mask("99:99");

	// Маска телефона
	$('input.phone').mask("+7 (999) 999-99-99");
	
	// Нажатие на далее и
	// переход к другому окну

	$('.btn-next').on('click', function() {
		var modalCurrent = $(this).attr('data-current');
		var modalNext    = $(this).attr('data-next');

		$('#'+modalCurrent).modal('hide');
		$('#'+modalNext).modal('show');
		return false;

	});

	function timeSlider() {

		$('.box-cont').each(function(){
			var totalBlocks = $('#block div.box').length;
			var blockViews = Math.round($('#block').width() / $('#block div.box').width());
			var currentPosition = 0;

			$( "#left" ).click(function() {

				if(currentPosition > 0) {
					$( "#block" ).animate({ "left": "+=105px" }, "slow" );
					currentPosition--;
				}
			});

			$( "#right" ).click(function(){
				if(blockViews + (currentPosition+6) <= totalBlocks) {
					$( "#block" ).animate({ "left": "-=105px" }, "slow" );
					currentPosition++;
				}

				console.log(blockViews, totalBlocks);
			});
		})



	};

	timeSlider();



});