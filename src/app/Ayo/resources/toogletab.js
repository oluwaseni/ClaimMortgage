$(document).ready(function() {
		$('.nav2-tabs > li > a').click(function(event){
		event.preventDefault();//stop browser to take action for clicked anchor

		//get displaying tab content jQuery selector
		var active_tab_selector = $('.nav2-tabs > li.active > a').attr('href');

		//find actived nav2igation and remove 'active' css
		var actived_nav2 = $('.nav2-tabs > li.active');
		actived_nav2.removeClass('active');

		//add 'active' css into clicked nav2igation
		$(this).parents('li').addClass('active');

		//hide displaying tab content
		$(active_tab_selector).removeClass('active');
		$(active_tab_selector).addClass('hide');

		//show target tab content
		var target_tab_selector = $(this).attr('href');
		$(target_tab_selector).removeClass('hide');
		$(target_tab_selector).addClass('active');
		map.removeInteraction(measuringTool);
map.addInteraction(selectInteraction);
vectorLayer.getSource().clear();
clearvalid();

	     });
	  });