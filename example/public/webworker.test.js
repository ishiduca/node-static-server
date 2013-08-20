var is = QUnit.strictEqual;

QUnit.module('モジュールの読み込み', {
	setup: function () { this.worker = new Worker('/w01.js'); }
});
asyncTest('ポストしたデータをworkerがそのまま返すか', function () {
	this.worker.onmessage = function (ev) {
		var data = ev.data;
		is(data.hello, 'webworker', 'data.hello === "webworker"');

		start();
	};

	this.worker.postMessage({hello: 'webworker'});
});
