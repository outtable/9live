---
sort: 6
---

# cocos2d-x 项目混淆
**当前例子是为了演示cocos2d-x的混淆。**

## 要运行本示例的要求
- 安装了cocos-2dx
- 安装了Python 3.x
- 安装了pip
- MacOS 10.0以上系统
- 安装了crab-orange.app
- 已经取得了注册码

## 安装cocos-2dx
- 访问 https://www.cocos.com 登录您的账号
- 进入产品/cocos2d-x 下载，比如找到V3.17.2，下载到桌面

## 索要免费体验版授权码
>请先准备一个新账号，并且创建一个应用，然后提供提供一下 bundle id
>

邮箱:**759610734@qq.com** (如果2日内未回复，请加QQ:**759610734**)

## 配置 cocos-2dx 工程
1. 进入~/Desktop/cocos2d-x-3.17.2目录，把我们提供给您的COSDK.framework和**.dat 文件拷贝到 cocos/COSDK 目录下

2. 打开~/Desktop/cocos2d-x-3.17.2/build/cocos2d_tests.xcodeproj 

3. 在Xcode的左侧工程视图里面，找到tests，右键添加Add Files To "cocos2dx-tests"，找到cocos/COSDK 目录

4. 点击Xcode中cocos2d_tests这个工程文件 找到 TARGETS 里面的 cpp-tests IOS，在Framework Search Paths里面添加 "$(SRCROOT)/../cocos/COSDK"

5. Xcode工程资源里面 找到 tests/cpp-tests/proj.ios/main.m

6. 更改cocos2d-x工程中cpp-tests这个Target的bundle id，与您新应用的bundle id一致

## 混淆器配置
1. 打开crab-orange.app

2. 在工程列表里面找到具体项目，点配置按钮，把~/Desktop/cocos2d-x-3.17.2/cocos/COSDK目录里3个文件添加到依赖配置的COSDK分组下
>
![img5](http://m.qpic.cn/psc?/V51E5kN14aJcIX2j9YpC3rIJsV2taSpE/TmEUgtj9EK6.7V8ajmQrELM8NnnNuLc4R1RqRsDvdCbjdw27Y78jWA8Unfttr6YIiHDO5PyoLY1ZvMGM24nDiz3R6ht98BIZ3yPaQf9rOAc!/b&bo=0ANuAQAAAAADF44!&rf=viewer_4)

3. 配置【编译设置】，添加一个Debug签名，Target选择cpp-tests-iOS（如果下拉列表是空的，先进一下工程，等待工程分析结束，再返回配置界面），bundle id是您新应用的bundle id. 注意：使用了Xcode中的自动签名并登陆了账号的记得关闭，必然会出问题

4. 如果是cocos-js/cocos-lua/quick-cocos 开发的游戏项目，请找工程设置的【外部SDK存档-混淆】，如果是 js开发的应用找到请找到 cocos2d-x引擎目录下的 external/spidermonkey/prebuilt/ios/libjs_static.a 添加进去（这个操作是为了能拦截libjs_static.a里面的一些文件读取操作api让混淆资源脚本能正确解码混淆后的js文件)，然后到【资源脚本】里面，添加一个js文件的脚本，这个脚本会对.js文件内容做一次加密。lua开发的应用就需要找到对应的external/lua/luajit/prebuilt/ios/liblua.a 或者external/lua/luajit/prebuilt/ios/libluajit.a

```tip
因为大部分项目都有自己的脚本加密方案在POST_BUILD阶段替换，所以需要修改一下js脚本的混淆操作发生时机，在【资源脚本】/【lua 脚本定义】 里面修改confuse-script-phase 为 copy-resource 就可以了
```

5. 点击【开始混淆】按钮

6. 打开 【调试模式】 选项，打开【使用标准main流程】，关闭【检查链接符号】选项，并点击确认，开始执行混淆

7. 等混淆结束后，点击打开工程按钮，准备运行应用，会发现 build all tests iOS 那个下拉框打开后，会多一个target，它的icon上面有一个阻止的标示，选中它，会制动安装应用到手机，就可以开始调试了

```tip
 如果你的手机不是arm64架构的，想调试的时候新版本的Xcode是会提示无法安装的，请更换一个arm64架构的手机调试（安装不影响)
```