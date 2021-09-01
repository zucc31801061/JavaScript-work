

# 2020-2021学年第2学期
# **实 验 报 告**
![zucc](../../zucc.png "ZUCC")

- 课程名称:跨平台脚本开发技术  
- 实验项目:项目实战-[机器人](http://sigcc.gitee.io/eloquent-js-3e-zh/#/7)
- 专业班级___                      
- 学生学号___
- 学生姓名___
- 实验指导教师:郭鸣

## 实验内容

1. 阅读本章内容 回答理解以下问题
    - [运行代码](https://eloquentjavascript.net/code/#7)  点击 `run code` 查看运行结果
    -  先不看本章代码，请给出你的程序设计
      - 需要几个类
  - 每个类有什么方法与属性
1. [代码分析](http://sigcc.gitee.io/eloquent-js-3e-zh/#/7?id=任务)
    - OO设计中，为什么给世界中的各种元素定义对象是错误的？
        - 一个东西听起来像一个对象，并不意味着它应该是你的程序中的一个对象
    - 村庄状态`VillageState` 的属性有哪些？分别什么含义？
    - 请解释说明`move()`的含义？
    -  `return this;` 的作用是什么？
    - `Object.freeze()`的作用是什么？
    - 思考你的设计与书本的设计，哪个更加合理？原因？
1.  打开index.html 

    ```js
    //浏览器，按f12 在console 里面输入，查看两种方式运行的结果，思考区别
    //注意参数`randomRobot`  `goalOrientedRobot` 是什么含义
    runRobotAnimation(VillageState.random(),
                            randomRobot, []); // 随机送达方式运行 
    
    runRobotAnimation(VillageState.random(),
                        goalOrientedRobot, []); //目标导向方式运行
    
    ```

1. 完成[练习](http://sigcc.gitee.io/eloquent-js-3e-zh/#/7?id=练习)  1 2 3 题

    
