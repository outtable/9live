---
sort: 4
---

# 外部SDK存档-混淆
有两种情况，需要我们添加外部SDK混淆

- 当我们想要抹除第三方SDK符号特征
- 当我们添加了某一种资源的加密混淆后，那种资源会被某个.a/.framework(Fake Framework)加载，结果引起那个外部SDK崩溃

## 配置【外部SDK存档-混淆】
1. 进入某个混淆工程设置，选中【外部SDK存档-混淆】

2. 点'+'创建一个条目，随意命名一个比如liblua

3. 修改路径，选取一下那个SDK文件

4. 按需开启混淆选项
> 如果都不开启，就会执行内置的一些符号的替换操作，主要是为了配合运行时BUG修复(主要是配合自定义资源混淆功能)

## 混淆选项说明
- c symbol confuse（C符号混淆开启)
> 如果被识别成一般的c符号格式，就会被混淆
> 

- c++ symbol confuse（C++符号混淆开启)
> 如果被识别成一般的c++符号格式，就会被混淆
> 

- objc symbol confuse（ObjC符号混淆开启)
> 如果被识别成一般的objc符号格式，就会被混淆，对Objc Meta Data也有效
> 

- swift symbol confuse（Swift符号混淆开启)
> 如果被识别成一般的swift符号格式，就会被混淆，对Objc Meta Data也有效
> 

>
<img src="https://outtable.github.io/9live/assets/images/snapshots/snapshot-36.png" width="60%">