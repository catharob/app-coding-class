$(document).ready(function(){


	$.ajax({
   			dataType: "json",
  			url: "https://data.cityofnewyork.us/resource/xx67-kt59.json",
  			success:function(data){
  				var arr = restaurantArray(data);
  				groupUnderName(data);
  				// var sortArr = sortedArr(arr);
  				// putOnPage(arr);
  				
  				// runSearch();


  			// $.each(data, function(index,item){

  			// 		$('#restaurants').append("<h2>"+item.dba+'</h2><p>'+item.grade_date+'</p><p>'+item.violation_description+'</p><p>'+item.building+' '+item.street+' '+item.zipcode+'</p>');
  			// 	});
  			}
		});

	function restaurantArray(data){

		var rest = [];

		_.each(data,function(r,index){
				var restaurant = {
				name: r.dba,
				date: r.grade_date,
				address: r.building+' '+r.street+' '+r.zipcode,
				violation: r.violation_description
			};
			rest.push(restaurant);

		});


		return rest;

	};

	function groupUnderName(data){

		var groupedRest = _.groupBy(data,'name');
		console.log(groupedRest);
		return groupedRest;
		
	};

	

	// function putOnPage(groupedRest){
	// 	// var listItemTemplate = _.template("<li><h2><%= name %></h2><h3><%= address %></h3>");
	// 	_.each(arr,function(rest,index){

	// 		// var listItem = listItemTemplate(rest);
	// 		$('#rest-list').append(groupedRest);
	// 	});
	// }
})	
