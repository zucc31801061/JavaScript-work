
# 2020-2021学年第2学期
# **实 验 报 告**
![zucc](.\img\zucc.png)

- 课程名称:跨平台脚本开发技术  
- 实验项目:有限自动机正则表达式（选做）
- 专业班级:计算机1801
- 学生学号:31801061
- 学生姓名:王灵霜
- 实验指导教师:郭鸣

## 实验内容

1. `ruby`开发工具使用。
    - 安装 [ruby windows installer](https://rubyinstaller.org/) or [linux]( https://www.ruby-lang.org/en/documentation/installation/) 
    - `gem install pry`
    - 运行 [understanding computation](https://github.com/tomstuart/computationbook) 第3章的 Ruby代码 DFA ,NFA, Regular Expression
    
1. 学习ruby 到javascript 移植说明 [ruby to javascript](/ruby2js.md)

1.  参考[dfa代码](/dfajs.zip)，实现 understanding computation 第3章 3.2 的NFA代码。包含必要的测试。
    
1. 实现 understanding computation 第3章 3.3 的正则表达式代码。包含必要的测试。

```js
    class Literal{
        //实现代码    
    } 
    class Empty {
        //实现代码   
    }
    class Repeat{
        //实现代码    
    } 
    class Concatenate {
        //实现代码   
    }
    class Choose {
        //实现代码   
    }        
    
    var pattern =
    new Repeat(
        new Concatenate(
            new Literal('a'),
            new Choose(new Empty(), new Literal('b'))
        )
    );
    
    
    // pattern.toString();
    // => '(a(|b))*'
```

5. 阅读课件回答下面的问题
    - `确定性有限自动机`的两个约束条件是什么？
    - `非确定性有限自动机`的计算能力与`确定性有限自动机`相同吗?
1. 给出 非确定性有限自动机到确定性有限自动机的转换方法,用 JS实现NFASimulation 。
    - https://github.com/bgrawi/jsflap
    - https://www.npmjs.com/package/finite-automata

1. 画出 正则表达式/a(a|bc)*/ 的 NFA图，并转换为DFA

1. 如何通过多个 `小的NFA`的 顺序，选择，重复 构造`大的 NFA`

