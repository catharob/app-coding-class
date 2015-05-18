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
  				// runSearch();


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
		var listItemTemplate = _.template("<li id='item-<%= index %>'><h2><%= name %></h2><h3><%= address %></h3><div><ul class='vioList'></ul></div></li>");
		_.each(arr,function(rest,index){

			rest.index = index + 1;
			console.log(rest.index);

			var listItem = listItemTemplate(rest);
			$('#rest-list').append(listItem);

			var violationTemplate = _.template("<li><p><%= description %></p></li>")
			_.each(rest.violations,function(violation,index){

				var vioDes = violationTemplate(violation);
				$('#item-'+rest.index).append(vioDes);
				console.log(vioDes)
			});
		});
	}

	// function runSearch();

})	
