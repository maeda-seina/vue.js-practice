// 即時関数
(function () {
  // 厳密なエラーチェック
  'use strict';

  // UIに結びつくモデル view model
  const vm = new Vue({
    // どの領域のVueと結びつけるかをelキーで指定。
    // elキーはelじゃないといけない。elementとか他のキーでは機能しないことがわかった。
    el: '#app',
    // このvmモデルにデータを保持してもらう。
    data: {
      name: 'taguchi'
    }
  })
})();
