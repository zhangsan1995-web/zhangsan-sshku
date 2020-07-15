$(function () {
    var yaomei = 'yaomei';
    // 页面刷新 就渲染一次
    load();
    // input框注册键盘事件
    $('#title').on('keydown', function (event) {
        if (event.keyCode === 13) {
            if ($(this).val().trim() == '') {
                $(this).val('');
                alert('请输入内容');
            } else {
                //获取本地原来的数据
                var local = getDate();
                //把local数据进行更新 把最新的数据追加给local数组
                local.push({ title: $(this).val(), done: false });
                //调用保存数据-- 把新的数据保存给本地数据
                saveDate(local);
                //新数据输入后 就渲染页面
                load();
                // 清空内容
                $(this).val('');
            }
        }
    })

    // 读取本地数据-- 封装函数
    function getDate() {
        //变量接收本地数据    
        var data = localStorage.getItem('todolist');
        // 判断如果没有数据就返回空数组去接收
        if (data == null) {
            return [];
        } else {
            // 本地储存里面的数据是字符串格式
            //用  JSON.parse 转成对象格式
            return JSON.parse(data);
        }
    }

    // 保存本地数据
    function saveDate(data) {
        // 得到的新数据是对象格式 json.stringify 转成数组形式
        // 保存新数据
        localStorage.setItem('todolist', JSON.stringify(data));
    }

    //渲染加载数据
    function load() {
        // 有新数据加入后,先清除前面的数据
        $('ol, ul').empty();
        // 接收新的数据
        var data = getDate();
        // 循环遍历数组
        for (var i = 0; i < data.length; i++) {
            if (!data[i].done) {
                $('ol').prepend(`<li>
                <input type="checkbox">
                <p>${data[i].title}</p>
                <a href="javascript:;" id="${i}"></a>
                </li>`)
            } else {
                $('ul').prepend(`<li>
                <input type="checkbox">
                <p>${data[i].title}</p>
                <a href="javascript:;" id="${i}"></a>
                </li>`)
            }
        }
        $('#todocount').text($('ol li').length);
        $('#donecount').text($('ul li').length);
    }

    // todolist 删除数据
    $('ol, ul').on('click', 'a', function () {
        //获取本地数据 
        var data = getDate();
        // 修改数据获取 a 的索引值
        var index = $(this).prop('id');

        //从哪个索引值开始删除,删除的个数--splice
        data.splice(index, 1);
        //把删除后的数据保存到本地数据 --saveDate
        saveDate(data);
        // 重新渲染
        load();
    })

    // todolist 正在进行和已完成进行选项操作
    $('ol, ul').on('click', 'input', function () {
        //获取本地数据
        var data = getDate();
        // 修改数据-- 获得 input 兄弟a的索引值
        var index = $(this).siblings('a').prop('id');

        // 数组某一项中 done 属性
        data[index].done = $(this).prop('checked');
        //先保存当前点击的索引值
        var el = data[index];
        //删除这个数据
        data.splice(index, 1);
        // 再添加到末尾
        data.push(el);
        // 保存到本地数据
        saveDate(data);
        //重新渲染
        load();
    })
})