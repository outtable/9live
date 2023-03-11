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
1. 进入`~/Desktop/cocos2d-x-3.17.2`目录，把我们提供给您的`COSDK.framework`和`**.dat` 文件拷贝到 `cocos/COSDK` 目录下
>
 <img src="https://outtable.github.io/9live/assets/images/snapshots/snapshot-16.png" width="90%">

2. 打开`~/Desktop/cocos2d-x-3.17.2/build/cocos2d_tests.xcodeproj`

3. 在`Xcode`的左侧工程视图里面，找到`tests`，右键菜单`Add Files To "cocos2dx-tests"`，选中`cocos/COSDK` 目录
>
 <img src="https://outtable.github.io/9live/assets/images/snapshots/snapshot-15.png" width="90%">

4. 点击`Xcode`中`cocos2d_tests`这个工程文件 找到 TARGETS 里面的 `cpp-tests IOS`，在`Framework Search Paths`里面添加 `"$(SRCROOT)/../cocos/COSDK"`

5. 更改`cocos2d-x`工程中`cpp-tests`这个Target的`bundle id`，与您新应用的`bundle id`一致
>
 <img src="https://outtable.github.io/9live/assets/images/snapshots/snapshot-14.png" width="90%">

## 混淆器配置
1. 打开`crab-orange.app`

2. 解压缩我们给你的 `Products.zip` 文件

3. 找到【注册码】按钮，点击进入注册码管理

4. 导入 `Products/*.listenkey`文件，记住编号

5. 点击【创建工程】，因为没有`*.xcworkspace`的原因，所以我们要点`'?'`按钮创建一个

6. 选中对应的工程，选好正确的target和注册码编号

7. 回到主页面找到配置按钮，把`~/Desktop/cocos2d-x-3.17.2/cocos/COSDK`目录里3个文件添加到依赖配置的`COSDK`分组下
>
<img src="https://outtable.github.io/9live/assets/images/snapshots/snapshot-5.png" width="90%">

8. 配置【编译设置】，添加一个`Debug`签名，Target选择`cpp-tests-iOS`（如果下拉列表是空的，先进一下工程，等待工程分析结束，再返回配置界面），`bundle id`是您新应用的`bundle id`. 注意：使用了`Xcode`中的自动签名并登陆了账号的记得关闭，必然会出问题
>
<img src="https://outtable.github.io/9live/assets/images/snapshots/snapshot-11.png" width="90%">

9. 如果是`cocos-js/cocos-lua/quick-cocos` 开发的游戏项目，请找工程设置的【外部SDK存档-混淆】，如果是 js开发的应用找到请找到 `cocos2d-x`引擎目录下的 `external/spidermonkey/prebuilt/ios/libjs_static.a` 添加进去（这个操作是为了能拦截`libjs_static.a`里面的一些文件读取操作api让混淆资源脚本能正确解码混淆后的js文件)，然后到【资源脚本】里面，添加一个js文件的脚本，这个脚本会对.js文件内容做一次加密。lua开发的应用就需要找到对应的`external/lua/luajit/prebuilt/ios/liblua.a` 或者`external/lua/luajit/prebuilt/ios/libluajit.a`

```tip
因为大部分项目都有自己的脚本加密方案在POST_BUILD阶段替换，所以需要修改一下js脚本的混淆操作发生时机，在【资源脚本】/【lua 脚本定义】 里面修改`confuse-script-phase` 为 `copy-resource` 就可以了
```

5. 点击【开始混淆】按钮
>
<img src="https://outtable.github.io/9live/assets/images/snapshots/snapshot-26.png" width="90%">

6. 打开 【调试模式】 选项，打开【使用标准main流程】，关闭【检查链接符号】选项，并点击确认，开始执行混淆

7. 等混淆结束后，点击打开工程按钮，准备运行应用，会发现 `build all tests iOS` 那个下拉框打开后，会多一个target，它的icon上面有一个阻止的标示，选中它，会制动安装应用到手机，就可以开始调试了(类似下图)
>
<img src="https://outtable.github.io/9live/assets/images/snapshots/snapshot-8.png" width="80%">

```tip
 如果你的手机不是arm64架构的，想调试的时候新版本的Xcode是会提示无法安装的，请更换一个arm64架构的手机调试（安装不影响)
```