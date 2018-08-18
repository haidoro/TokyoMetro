


var app =new Vue({
	el: '#app',
	data: {
		railway:null,
		hasError: false,
		loading:true
	},
	mounted: function(){
		axios.get("https://api.tokyometroapp.jp/api/v2/datapoints?rdf:type=odpt:Station&dc:title=東京&acl:consumerKey=****")
		.then(function(response){
			this.railway = response.data[0]['odpt:railway']
			console.log(response.data[0]['odpt:railway'])
		}.bind(this))
		.catch(function(error){
			console.log(error)
			this.hasError = true
		}.bind(this))
		.finally(function(){
			this.loading = false
		}.bind(this))
	}
})