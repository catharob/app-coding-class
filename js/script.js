$(document).ready(function(){


	$.ajax({
   			dataType: "json",
  			url: "https://data.cityofnewyork.us/resource/xx67-kt59.json",
  			success:function(data){
  				console.log(data);
  				var arr = restaurantArray(data);
  				var sortArr = sortedArr(arr);
  				putOnPage(sortArr);
  				runSearch();


  			// $.each(data, function(index,item){

  			// 		$('#restaurants').append("<h2>"+item.dba+'</h2><p>'+item.grade_date+'</p><p>'+item.violation_description+'</p><p>'+item.building+' '+item.street+' '+item.zipcode+'</p>');
  			// 	});
  			}
		});

	function restaurantArray(data){

		var rest = [];

		_.each(data.result.records,fuction(r,index){

			var restaurant = {
				name: r.dba,
				date: r.grade_date,
				address: r.building+' '+r.street+' '+r.zipcode
			};

			rest.push(restaurant);

		});
		return rest;
	}
})	
