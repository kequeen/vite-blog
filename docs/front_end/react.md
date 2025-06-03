# react
我是比较喜欢react中的一些思想，一切都在js中渲染

## 关于babel
因为react目前采用JSX来写，而JSX需要编译之后，才能变成浏览器所需要的JS
关于babel的进一步认知，可以看[这个文档](https://babeljs.io/docs/en/)


## 生命周期
react的生命周期可以参考[这篇文档](https://zh-hans.reactjs.org/docs/react-component.html)。
关于前端框架，其实我们很多时候都需要理解其生命周期，因为类似于vue，react这种，本身其实是对页面的二次渲染，我们正常的页面全铺开就是html，而类似于vue和react这种前端js框架，其本身就是会再执行一遍相关的代码，对页面进行重绘。


### 关于react组件
下面的这两段代码是等价的，而从个人角度而言，上面这段代码明显更为合理，也更容易理解，且更容易被复用
``` js
class ShoppingList extends React.Component {
  render() {
    return (
      <div className="shopping-list">
        <h1>Shopping List for {this.props.name}</h1>
        <ul>
          <li>Instagram</li>
          <li>WhatsApp</li>
          <li>Oculus</li>
        </ul>
      </div>
    );
  }
}
```

``` js
return React.createElement('div', {className: 'shopping-list'},
  React.createElement('h1', /* ... h1 children ... */),
  React.createElement('ul', /* ... ul children ... */)
);
```

## 参考文档
1. <https://reactjs.org/docs/getting-started.html#try-react>