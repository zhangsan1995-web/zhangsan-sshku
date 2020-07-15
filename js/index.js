$(function () {
    // 页面刷新 就渲染加载一次     
    load();
    // 注册键盘事件
    $('#title').on('keydown', function (event) {
        //  event事件对象 keyCode 键盘码
        if (event.keyCode === 13) {
            if ($(this).val().trim() == '') {
                $(this).val('');
                alert('请输入内容');
            } else {
                // 先获取本地存储原来的数据
                var local = getDate();
                // 把local数组进行更新数据 把最新的数据追加给local数组
                local.push({ title: $(this).val(), done: false });
                // 调用保存数据--把新的数据保存给本地数据
                saveDate(local);
                // 新数据输入后 就渲染页面
                load();
                // 清空内容
                $(this).val('');
            }
        }
    })

    // 读取本地数据-- 封装函数
    function getDate() {
        // 变量接收本地数据
        var date = localStorage.getItem('todolist');
        // console.log(date);
        // 判断 如果没有数据
        if (date == null) {
            // 返回空数组
            return [];
        } else {
            // 本地储存里面的数据是字符串格式的  但是我们需要的是对象格式 JSON.parse 转成对象格式
            return JSON.parse(date);
        }

    }

    //保存本地数据 
    function saveDate(date) {
        // 得到的新数据是对象格式 JSON.stringify 转成数组形式
        localStorage.setItem('todolist', JSON.stringify(date));
    }

    // 渲染加载数据
    function load() {
        // 有新的数据保存后 先清除前面的数据再进行渲染
        $('ol, ul').empty();
        // 接收最新的数据
        var data = getDate();
        // console.log(date);
        // 循环遍历数组 
        for (var i = 0; i < data.length; i++) {
            // 接收到最新数据某一项属性中的 done == true
            if (data[i].done == true) {
                //把数据ol 添加到 ul 里面
                $('ul').prepend(`<li>
                    <input type="checkbox" checked>
                    <p>${data[i].title}</p>
                    <a href="javascript:;" id="${i}"></a>
                    </li>`);
            } else {
                //checked == false 就返回 ol中去
                $('ol').prepend(`<li>
                    <input type="checkbox">
                    <p>${data[i].title}</p>
                    <a href="javascript:;" id="${i}"></a>
                    </li>`);
            }
        }
        //未完成 -- li 的长度赋值给span文本
        $('#todocount').text($('ol li').length);
        // 已完成
        $('#donecount').text($('ul li').length);
    }
    // todolist 删除数据
    $('ol, ul').on('click', 'a', function () {
        //获取本地数据
        var data = getDate();
        // console.log(data);
        //修改数据--获取 a 索引值
        var index = $(this).prop('id');
        // console.log(index);

        //从哪个索引开始删除,删除的个数
        data.splice(index, 1);
        //把删除后的数据保存到本地数据 saveDate 
        saveDate(data);
        //重新渲染数据
        load();
    })

    //toDoList 正在进行和已完成选项操作
    $('ol, ul').on('click', 'input', function () {
        // alert(11);
        //获取本地存储数据
        var data = getDate();
        // 修改数据--获取 input 的索引值
        var index = $(this).siblings('a').prop('id');
        // console.log(index);

        // 数组的某一项中 done 属性 
        data[index].done = $(this).prop('checked');
        //先保存当前点击的索引值 data[index]; 
        var el = data[index];
        //删除这个数据
        data.splice(index, 1);
        //再添加末尾去
        data.push(el);
        // //保存到本地数据
        saveDate(data);
        //重新渲染
        load();
        // console.log(load);

    })

})