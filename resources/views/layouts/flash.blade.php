@if(session('flash'))
<div class="alert alert-{{session('level')}} alert-flash col-md-4"
	role="alert" id="alert_box">
  <span class="closebtn float-right" onclick="this.parentElement.style.display='none';">&times;</span>
		<strong>{{{(session('level')=='success')?'Success':'Error'}}}!</strong>
		 {{ session('flash') }}
	</div>
@endif
