
$(document).ready(function() {
	$("#formShop").hide();
 
 	$("#createShop").click(function(){
		$("#formShop").toggle();
	});

 	//dont show card footer when they empty
 	$("[id^=card-footer_]").hide();





 	// call ajax - review
 	$("[id^=show_]").click(function(){
 		let id = $(this).data("id")
 		$.get(`/api/review/${id}`, function(data){

 			let content = ""
 			if(data.err){
 				content = "loi"
 			} else {
 				content = data.bReview
 			}

 			$(`#card-footer_${id}`).empty().append(content).toggle()

 		})
 	})
 	//add to cart
 	
 	$("[id^=buy_]").click(function(){
 		let id = $(this).data("id")
 		let data = { id : id }
 		$.post(`/api/buy`, data, function(res, status){
 			alert( "Buy " + status)
	  		$("#showCart").html(res.totalItems)

  		})
 	})

 	$("#myInput").on("keyup", function() {
	 	$("[id^=card-footer_]").hide();
	    var value = $(this).val();
	    var expression = new RegExp(value,"i");
	    var result="";
	    function change(price){
			let changePrice = price.toLocaleString('vi', {style : 'currency', currency : 'VND'});
			return changePrice
		}

	    $.get("/api/search",function(res){

		   $.each(res,(key, value)=>{
		   		if(value.title.search(expression) !=-1){

		   			result +=`
	   				
		   				<div class="card mt-5 mr-4">
		   					<a href="/books/bookDetail/"+${value._id}>
						  		<img class= "card-img-top" src=${value.cover} style="height: 250px;">
		   					</a>
					  		<div class="card-body">
							    <h5 class="card-title text-center">${value.title}</h5>
							    <p class="card-text text-center"><strong>Giá : ${change(value.price)}</strong></p>
							    <div class="group-btn d-flex justify-content-around">
								    <a class="btn btn-primary mr-1" href="(href='/books/bookDetail/'+ ${value._id}) ">Chi tiết</a>
								    <button class="btn btn-success mr-1" data-id =${value._id} id="buy_${value._id}">Mua</button>
								    <button class="btn btn-warning " data-id =${value._id} id="show_${value._id}">Xem</button>
							    </div>
					  		</div>

						</div>
					`

		   	}
		   })

		   $(".showCard").html(result);
	  })


})

 })