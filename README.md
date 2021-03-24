# erwin

极简的 react 全局状态管理工具。名字来源与进击的巨人人物名。

## 注意

目前只允许在函数组件中使用

## 安装

```shell
npm i erwin
```

or 

```shell
yarn add erwin
```



## 使用

```js
import {observe} from 'erwin'
const stateModel = observe({
  count : 0
})
function App() {
    // 这里传一个每个组件都不一样的key,一般拿组件名即可。
    // 这个 key 要求每次组件更新后，key 都相同。
    // 同一个组件不同的 model 可以使用同一个 key
    const state = stateModel('App'); 
    return (
    <div>
      {state.count}
      <AddBtn/>
    </div>
    );
}
const AddBtn = ()=>{
    const state = stateModel('AddBtn') 
    return <button onClick={()=>state.count++}>add count</button>
}

```

或者

```js
import {observe} from 'erwin'
const stateModel = observe({
  	count : 0,
    setCount(){
        this.count ++;
    }
})
function App() {
    const state = stateModel('App')
    return (
    <div>
      {state.count}
      <AddBtn/>
    </div>
    );
}
const AddBtn = ()=>{
    const state = stateModel('AddBtn')
    return <button onClick={()=>state.setCount()}>add count</button>
}
```

## observe 函数

用于监听状态变化的函数。

参数1 ：用于监听需要变化的数据，及存储改变其数的函数。

 参数2 ： options 用于设置其模块配置。

### options 

funReg 

描述 ：确认哪些属性是函数，函数无法更改 。

类型 ：正则表达式。

默认 : /^set/

dome :

```js
import {observe} from 'erwin'
const stateModel = observe({
  	count : 0,
    addCount(){
        this.count ++;
    }
},{
    funReg : /^add/
});

const AddBtn = ()=>{
    const state = stateModel('AddBtn')
    state.addCount = ()=>{} // error : 错误被匹配的函数无法被更改。
    return <button onClick={()=>state.addCount()}>add count</button>
}
```

private

描述：为 true 时，外部无法直接更改 state 里面的数据。只能通过内部函数更改。

类型 ： boolean

默认 ： false

dome : 

```js
import {observe} from 'erwin'
const stateModel = observe({
  	count : 0,
    addCount(){
        this.count ++;
    }
},{
    funReg : /^add/,
    private : true
});

const AddBtn = ()=>{
    const state = stateModel('AddBtn')
    const onClick = ()=>{
        state.count++; // error : 错误，无法更改数据
        // 只能通过以下方式更改。
        state.addCount();
    }
    return <button onClick={onClick}>add count</button>
}
```

lazy

描述 : 当 lazy 为 true 时，要更新的 state 与之前的 state 相同时组件不刷新。

类型 ： boolean

默认 ： true


## config 对象

用于全局配置 options 。observe 中的 options 优先级跟高。

dome : 

```js
import {observe,config} from 'erwin';
config.private = true;
config.funReg = /^set/;
const stateModel = observe({
  	count : 0,
    addCount(){
        this.count ++;
    }
},{
    funReg : /^add/,   // 此处的 funReg 优先级跟高
    lazy : false
 });
```

实现原理 ：[https://juejin.cn/post/6943037879778017287](https://juejin.cn/post/6943037879778017287)

