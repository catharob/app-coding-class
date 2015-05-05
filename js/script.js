$.ajax({
   			dataType: "json",
  			url: "https://data.cityofnewyork.us/resource/xx67-kt59.json",
  			success:function(data){
  			console.log(data);

  			$.each(data, function(index,item){

  					$('#restaurants').append("<h2>"+item.dba+'</h2><p>'+item.grade_date+'</p><p>'+item.violation_description+'</p><p>'+item.building+' '+item.street+' '+item.zipcode+'</p>');
  				});
  			}
		});