---
sort: 3
---

# 如何避免某些对象或成员被混淆
**当前教程是为了让你方便的排除某些对象或者成员被改名的问题，比较经典的应用就是避免Json解析引起的Model。**

## 一. 通过项目【设置】/【排除混淆-语言】设置 `All Memeber By Call `分组，来避免某些对象成员函数、属性被改名导致json解析出错(已废弃)

一般来说除非你用的Json解析的库用的是一个.a或者.framework，你又没有做添加过这个外部SDK到项目混淆配置的【外部SDK存档-混淆】列表中，才需要通过识别调用来排除，如果添加了就不需要管了

1. 首先确认工程当前工程使用那种Json解析模块，一般常用的就是YYModel和MJExtension，这两种都内置了默认配置API来解决，一般的API形式如下（具体格式请参考一些默认设置）
```
	[[MyJsonObject yy_modelWithDictionary:dict]; //通过一个字典填充一个Json对象模型
```
上面这种如果对源码做预处理时候就会识别出MyJsonObject，并把这个标记为需要排除所有成员的名称混淆

2. 检查所有模型对象，如果发现有模型对象里面包含数组，但是又没有明确数组内部成员类型，也会引起json解析错误，比如下面这个
```
	@interface MyObjectA : NSObject

	@property (strong, nonatomic) NSArray* childItems;//这种源码识别程序就识别不出来，也就无法更智能标记出来把想关联的模型对象成员也排除掉

	@end
```
改为
```
	@interface MyObjectA : NSObject

	@property (strong, nonatomic) NSArray<MyObjectB *> * childItems;//加了MyObjectB后，这个对象也会被自动排除成员名称混淆，就不会引起json解析出错

	@end
```


```tip
排除设置一定要在预处理之前都设置好，如果做完了预处理再设置，就需要在重置时，勾选清除所有缓存，不然自动识别可能有误
```

## 二. 通过【排除混淆-语言】 设置 `All Member` 或 `All Member By Extend Class/Protocol` 分组来避免Json解析出错

1. `All Member` 这个分组里面的，可以直接通过通配符来用名字排除，比如说如果Model都是有固定前缀或者后缀，写作**JSModel，就会都被标记出来

2. `All Member By Extend ObjC Class/Protocol` 这个分组里面的表示如果某个类父类链条里面包含这个类，就会标记为排除成员，或者直接实现了某个协议的类，也会被标记出来
