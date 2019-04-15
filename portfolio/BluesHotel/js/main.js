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
		format: 'dd.mm.yyyy'
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
});