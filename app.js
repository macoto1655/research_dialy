const addTask = document.querySelector('.add');
const list = document.querySelector('.todos');
const search = document.querySelector('.search input');

//##
(function () {
    //初期化処理
    //ローカルストレージに格納されている値を取得し、リストを再生する
    for (let key in localStorage) {
        let html = localStorage.getItem(key)
        if (html) {
            list.innerHTML += localStorage.getItem(key)
        }
    }
})()

const saveTaskToLocalStorage = (task, html) => {
    //null はlocalStorageに保存しない
    if (html) {
        //localStorage は０から始まる
        localStorage.setItem(task, html)
        return
    }
    return
}

const deleteTaskFromLocalStorage = task => {
    localStorage.removeItem(task)
    return
}

//##

/*const createTodoList = (task, substance) => {
    // HTML テンプレートを生成
    const html = `
    <li class="list-group-item d-flex justify-content-between align-items-center">
        <span>${task}</span>
        <span>${substance}</span>
        <i class="far fa-trash-alt delete"></i>
    </li>
    `;

    list.innerHTML += html;
}
*/

const createTodoList = (task) => {
    // HTML テンプレートを生成
    const html = `
    <div class="list-group-item d-flex justify-content-between align-items-center">
        <div>${task}</div>
        <i class="far fa-trash-alt delete"></i>
        
    </div>
    `;

    list.innerHTML += html;
}

const createDailyContents = (substance) => {
    // HTML テンプレートを生成
    const html = `
    <div class="list-group-item d-flex justify-content-between align-items-center">
        <div>${substance}</div>
        <i class="far fa-trash-alt delete"></i>
    </div>
    <br>
    `;

    list.innerHTML += html;
}

//
/*一応とっておく、エンターキーで内容を保存する
addTask.addEventListener('submit', e => {
    // デフォルトのイベントを無効
    e.preventDefault();

    // タスクに入力した値を空白を除外して格納
    const task = addTask.add.value.trim();
    if (task.length) {
        // Todo List の HTML を作成
        createTodoList(task);
        // タスクに入力した文字をクリア
        addTask.reset();
    }
});
*/

//削除機能
list.addEventListener('click', e => {
    if (e.target.classList.contains('delete')) {
        e.target.parentElement.remove();

        const task = e.target.parentElement.textContent.trim()
        deleteTaskFromLocalStorage(task)
    }
})

const filterTasks = (term) => {

    Array.from(list.children)
        //フィルタの条件
        .filter((todo) => !todo.textContent.toLowerCase().includes(term))
        .forEach((todo) => todo.classList.add('filtered'))

    Array.from(list.children)
        .filter((todo) => todo.textContent.toLowerCase().includes(term))
        .forEach((todo) => todo.classList.remove('filtered'))

}

search.addEventListener('keyup', () => {
    //空白削除かつ小文字に変換(大文字、小文字の区別をなくす)
    const term = search.value.trim().toLowerCase();
    filterTasks(term)
})

/* ボタンで日誌の内容を登録したいな！ */

//target:bottunを登録してみる
const button = document.getElementById("button")

//論文や書籍のタイトルと、それの内容を同時に記録したい！
const bookContents = document.getElementById("message-body");

//ボタンをおして登録
button.addEventListener('click', e => {
    console.log('hello')

    // デフォルトのイベントを無効
    e.preventDefault();

    // タスクに入力した値を空白を除外して格納
    const task = addTask.add.value.trim();

    const substance = bookContents.value.trim();

    if (task.length != 0 && substance.length != 0) {
        // Todo List の HTML を作成
        //createTodoList(task, substance);
        createTodoList(task);
        createDailyContents(substance);
        // タスクに入力した文字をクリア
        addTask.reset();
        bookContents.reset();

    }
    else {
        alert("どっちも入れてね")
        // 入力した文字をクリアにする
        addTask.reset();
        bookContents.reset();
    }
});