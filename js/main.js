// 即時関数
Vue.config.devtools = true;
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
      // formがsubmitされた時に、newItemの値をtodosに追加してあげる。それがaddItemというメソッド
      newItem: '',
      // editIndexが-1をデフォルトにしておき、編集ボタン押したときにtodosのindexが入るためのものとして用意している。
      editIndex: -1,
      // オブジェクトで管理することに。titleとisDoneというキーで。
      todos: []
    },
    // 指定したデータの変更を監視してくれる。
    // todosに変更があったときはこの処理をしてくださいという処理を書く。
    // todosの配列の中身(titleやisDone)が変更された時にも処理を走らせたいので、
    // handlerという記述をかいて、deepオブションをtrueにする。
    watch: {
      todos: {
        handler: function () {
          // todosというキーで、todosの値をJson形式で保存するという記述
          localStorage.setItem('todos', JSON.stringify(this.todos))
        },
        deep: true
      }
    },
    // localStorageに入ったデータを呼び出す。アプリがページにマウントされるタイミングで読み込む。
    // Jsonをparseしつつ、localStorageからtodosというキーでデータをgetItem()する。
    // また、JSONのparseがうまくいかなかったら、空の配列を返すようにする。
    mounted: function () {
      this.todos = JSON.parse(localStorage.getItem('todos')) || [];
    },
    methods: {
      // 追加と編集を同じメソッドで管理
      setItems: function () {
        // -1つまり、編集ボタン押されてない時は追加するメソッド。
        if (this.editIndex === -1) {
          const item = {
            title: this.newItem,
            isDone: false
          }
          this.todos.push(item);
          // pushした後にnewItemを空にして、formに値が残ってしまう問題を解消。
          this.newItem = '';
          // ここから編集の内容。
        } else {
          this.todos.splice(this.editIndex, 1, this.newItem)
        }
        // cancelメソッドなくても良さそう？？？
        this.cancel()
      },
      deleteItem: function (index) {
        if (confirm('are you sure?')) {
          this.todos.splice(index, 1)
        }
      },
      purge: function () {
        if (!confirm('delete finished?')){
          return;
        }
        // todosに終わっていないタスクを入れる。
        // つまり、終わったタスクはtodosのなかに入らないので、
        // 削除されているように見せることができる。
        // this.todos = this.todos.filter(function (todo) {
        //   return !todo.isDone
        // })
        this.todos = this.remaining
      },
      // editIndexには編集ボタンを押されたtodosのindexが入るようになっている。
      edit: function (index) {
        this.editIndex = index
        this.newItem = this.todos[index]
      },
      cancel: function () {
        this.newItem = ""
        this.editIndex = -1
      }
    },
    // todoの残数を表示させるために計算する。データから動的にプロパティを計算してくれる算出プロパティ
    computed: {
      remaining: function () {
        // todosから一つずつオブジェクトを渡している。それがisDoneがfalse、
        // つまり終わってないタスクをreturnしてitemsという変数に入れ直している。
        // そして、そのitemsに入った数がまだ終わってないタスクの数になる。
        return this.todos.filter(function (todo) {
          return !todo.isDone
        })
      },
      // 編集ボタン押したらUpdateボタンに変わるようになる。
      changeButtonText: function () {
        return this.editIndex === -1 ? 'Add' : 'Update'
      }
    }
  })
})();
