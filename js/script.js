$(document).ready(function(){


	$.ajax({
   			dataType: "json",
  			url: "https://data.cityofnewyork.us/resource/xx67-kt59.json",
  			success:function(data){
  				// console.log(data);
  				var groupedData = groupUnderName(data);
  				var arr = restaurantArray(groupedData);

  				// var arr = restaurantArray(data);
  				// groupUnderName(arr);
  				// var sortArr = sortedArr(arr);
  				putOnPage(arr);
  				runSearch();
  				showViolations();


  			// $.each(data, function(index,item){

  			// 		$('#restaurants').append("<h2>"+item.dba+'</h2><p>'+item.grade_date+'</p><p>'+item.violation_description+'</p><p>'+item.building+' '+item.street+' '+item.zipcode+'</p>');
  			// 	});
  			}
		});



	function restaurantArray(groupedData){

		var rest = [];

		_.each(groupedData,function(r,index){
			var restaurant = {
				name:r[0].dba,
				address:r[0].building+' '+r[0].street+' '+r[0].zipcode
				
			}
			

			restaurant.violations = [];
			
			_.each(r,function(v,i){
				// console.log(v);

				var violation = {
					date: v.grade_date,
					description: v.violation_description

				};
				restaurant.violations.push(violation);
			});

			// console.log(restaurant.violations);


			rest.push(restaurant);

		});

		console.log(rest);
		// console.log(rest);
		return rest;

	};

	function groupUnderName(data){
		var groupedRest = _.groupBy(data,'dba');
		return groupedRest;
	};


	function putOnPage(arr){
		var listItemTemplate = _.template("<li id='item-<%= index %>'><h2 class='restaurant-name'><%= name %></h2><h3><%= address %></h3></li>");
		_.each(arr,function(rest,index){

			rest.index = index + 1;
			console.log(rest.index);

			var listItem = listItemTemplate(rest);
			$('#rest-list').append(listItem);

			var violationTemplate = _.template("<p class='violation-description'><strong><%= date %></strong><%= description %></p>")
			_.each(rest.violations,function(violation,index){

				var vioDes = violationTemplate(violation);
				$('#item-'+rest.index).append(vioDes);
				console.log(vioDes)
			});
		});
	}

	function runSearch(){
		var rows = $('#rest-list li');
		$('#search-box').keyup(function(){
			var val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();

			rows.show().filter(function(){
				var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
				return !~text.indexOf(val);
			}).hide();
		});
	};

	// $("button").click(function(){

 //        $("p").toggle();

 //    });

	function showViolations(){
		$('.restaurant-name').click(function(){
			$('.violation-description').removeClass('violation-description')
		});
		// $('.restaurant-name').click(function(){
		// 	$('.violation-description').addClass('violation-description')
		// })
	}


})	
