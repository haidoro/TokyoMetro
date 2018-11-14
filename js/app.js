
var app =new Vue({
	el: '#app',
	data: {
		stationName:null,
		railways:null,
		hasError: false,
		loading:true
	},
	computed: {
		railway:function(){
			var railwayCopy=[...this.railways];
			var rail=[];
			for(var key in railwayCopy){
				rail.push(railwayCopy[key]['owl:sameAs']);
			}
			return rail;
		},
		conect:function(){
			var railwayCopy=[...this.railways];
			return railwayCopy[0]['odpt:connectingRailway'];
		}
	},
	methods:{
		stationClick:function(){
			
		axios.get("https://api.tokyometroapp.jp/api/v2/datapoints?rdf:type=odpt:Station&dc:title="+this.stationName+"&acl:consumerKey=  ")
		.then(function(response){
			return this.railways = response.data
		}.bind(this))
		.catch(function(error){
			console.log(error)
			return this.hasError = true
		}.bind(this))
		.finally(function(){
			return this.loading = false
		}.bind(this))
	}
}
})