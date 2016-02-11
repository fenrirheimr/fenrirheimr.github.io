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

	$('.btn-next').click(function(e){
		e.preventDefault();

		var modalCurrent = $(this).attr('data-current');
		var modalNext    = $(this).attr('data-next');

		$('#'+modalCurrent)
			.modal('hide')
			.on('hidden.bs.modal', function (e) {
				$('#'+modalNext).modal('show');

				$(this).off('hidden.bs.modal'); // Remove the 'on' event binding
			});

	});



	////////////////////////////////////////////////////////////////////////////////////

	/*$('.r-btn').click(function(){
		Show("bf-date");
	});

	//Fix modal mobile Boostrap 3
	function Show(id){
		//Fix CSS
		$(".modal-footer").css({"padding":"19px 20px 20px","margin-top":"15px","text-align":"right","border-top":"1px solid #e5e5e5"});
		$(".modal-body").css("overflow-y","auto");
		//Fix .modal-body height
		$('#'+id).on('shown.bs.modal',function(){
			$("#"+id+">.modal-dialog>.modal-content>.modal-body").css("height","auto");
			h1=$("#"+id+">.modal-dialog").height();
			h2=$(window).height();
			h3=$("#"+id+">.modal-dialog>.modal-content>.modal-body").height();
			h4=h2-(h1-h3);
			if($(window).width()>=768){
				if(h1>h2){
					$("#"+id+">.modal-dialog>.modal-content>.modal-body").height(h4);
				}
				$("#"+id+">.modal-dialog").css("margin","30px auto");
				$("#"+id+">.modal-dialog>.modal-content").css("border","1px solid rgba(0,0,0,0.2)");
				$("#"+id+">.modal-dialog>.modal-content").css("border-radius",6);
				if($("#"+id+">.modal-dialog").height()+30>h2){
					$("#"+id+">.modal-dialog").css("margin-top","0px");
					$("#"+id+">.modal-dialog").css("margin-bottom","0px");
				}
			}
			else{
				//Fix full-screen in mobiles
				$("#"+id+">.modal-dialog>.modal-content>.modal-body").height(h4);
				$("#"+id+">.modal-dialog").css("margin",0);
				$("#"+id+">.modal-dialog>.modal-content").css("border",0);
				$("#"+id+">.modal-dialog>.modal-content").css("border-radius",0);
			}
			//Aply changes on screen resize (example: mobile orientation)
			window.onresize=function(){
				$("#"+id+">.modal-dialog>.modal-content>.modal-body").css("height","auto");
				h1=$("#"+id+">.modal-dialog").height();
				h2=$(window).height();
				h3=$("#"+id+">.modal-dialog>.modal-content>.modal-body").height();
				h4=h2-(h1-h3);
				if($(window).width()>=768){
					if(h1>h2){
						$("#"+id+">.modal-dialog>.modal-content>.modal-body").height(h4);
					}
					$("#"+id+">.modal-dialog").css("margin","30px auto");
					$("#"+id+">.modal-dialog>.modal-content").css("border","1px solid rgba(0,0,0,0.2)");
					$("#"+id+">.modal-dialog>.modal-content").css("border-radius",6);
					if($("#"+id+">.modal-dialog").height()+30>h2){
						$("#"+id+">.modal-dialog").css("margin-top","0px");
						$("#"+id+">.modal-dialog").css("margin-bottom","0px");
					}
				}
				else{
					//Fix full-screen in mobiles
					$("#"+id+">.modal-dialog>.modal-content>.modal-body").height(h4);
					$("#"+id+">.modal-dialog").css("margin",0);
					$("#"+id+">.modal-dialog>.modal-content").css("border",0);
					$("#"+id+">.modal-dialog>.modal-content").css("border-radius",0);
				}
			};
		});
		//Free event listener
		$('#'+id).on('hide.bs.modal',function(){
			window.onresize=function(){};
		});
		//Mobile haven't scrollbar, so this is touch event scrollbar implementation
		var y1=0;
		var y2=0;
		var div=$("#"+id+">.modal-dialog>.modal-content>.modal-body")[0];
		div.addEventListener("touchstart",function(event){
			y1=event.touches[0].clientY;
		});
		div.addEventListener("touchmove",function(event){
			event.preventDefault();
			y2=event.touches[0].clientY;
			var limite=div.scrollHeight-div.clientHeight;
			var diff=div.scrollTop+y1-y2;
			if(diff<0)diff=0;
			if(diff>limite)diff=limite;
			div.scrollTop=diff;
			y1=y2;
		});
		//Fix position modal, scroll to top.
		$('html, body').scrollTop(0);
		//Show
		$("#"+id).modal('show');
	}*/

	////////////////////////////////////////////////////////////////////////////////////

	function timeSlider() {

		var caption = $('.custom-container .caption');

		$(".default .carousel").jCarouselLite({
			btnNext: ".default .next",
			btnPrev: ".default .prev",
			circular: false,
			visible: 11,
			afterEnd: function(a) {
				var indexText = $(a[5]).attr('data-day');
				caption.text(indexText);
			}
		});


		var relativeDay = $('.carousel > ul li');

		var relativeDayText = relativeDay.attr('data-day');
		caption.text(relativeDayText);

		//relativeText()


	};

	timeSlider();
});