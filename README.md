# 東京メトロ遅延情報

## API
APIを使うには公式サイトに行き  
[東京メトロ　オープンデータ　開発者サイト](https://developer.tokyometroapp.jp/)  
こちらのサイトから、まずユーザー登録します。（数時間から数日かかります）
その後、アクセストークンを取得します。

[API仕様ページ](https://developer.tokyometroapp.jp/documents)でAPIの使い方を確認しておきます。
データー形式はjson-LD形式ですが、jsonと同様に取り扱うことが可能です。

データーの読み込みはaxiosを活用します。

## データーの読み込みと表示
基本的にはBitCoin価格表示アプリをベースに作成します。
まずは簡単なデータを一つだけ取得して表示します。

HTML
```
	<h1>東京メトロ遅延情報</h1>
	<div id="app">
	<section v-if="hasError">
	Error
	</section>
	<section v-else>
		<div v-if="loading">
			Loading...
		</div>
		<div v-else>
		<ul v-cloak>
			<li>{{railway}}</li>
		</ul>
		</div>
	</section>
	</div>
	<script src="https://cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/axios@0.18.0/dist/axios.min.js"></script>
	<script src="js/app.js"></script>
```

APIは一旦そのままブラウザのURL欄に入れてどのようなデータが取れるか確認しておきます。
今回のデータは2次元配列の状態になっていますので`this.railway = response.data[0]['odpt:railway']`のようにしてデータを取得します。
エラー処理とロードの処理はBitCoinの仕組みをそのまま使います。

jsファイル
```
var app =new Vue({
	el: '#app',
	data: {
		railway:null,
		hasError: false,
		loading:true
	},
	mounted: function(){
		axios.get('https://api.tokyometroapp.jp/api/v2/datapoints?rdf:type=odpt:Station&dc:title=東京&acl:consumerKey=[ここにアクセストークンを入れる]')
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
```

これでうまくデータが表示されたら、あとは必要なデータを選別して表示させるだけです。

