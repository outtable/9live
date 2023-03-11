---
sort: 3
---
# iOS 应用混淆(ObjC)
**当前例子是为了演示objc语言开发的应用的混淆，其他语言暂不适用。**

## 要运行本示例的要求
- 安装了Cocos Pods(你工程用到了才用装)
- 安装了 homebrew
- 安装了 Python 3.x 版本
- 安装了Xcode 11.7 以上
- MacOS 10.0以上系统
- 安装了crab-orange.app
- 已经取得了注册码

## 索要免费体验版授权码
>请先准备一个新账号，并且创建一个应用，然后提供提供一下 bundle id
>

邮箱:**759610734@qq.com** (如果2日内未回复，请加QQ:**759610734**)

## 创建工程
1. 首先我们用了一个开源的代码来做例子，请先去`GitHub`下载 `https://github.com/outtable/9live/tree/master/Demo/WNXHuntForCit.zip` 解压后放到桌面 `~/Desktop/WNXHuntForCity`

2. 把我们给您的`Products.zip`解压，把COSDK 目录放到 `~/Desktop/WNXHuntForCity`下

3. 然后`cd ~/Desktop/WNXHuntForCity`下，执行  `pod update`

4. 双击打开 `~/Desktop/WNXHuntForCity.xcworkspace` 文件，把`COSDK`目录加入到工程里面 
>
<img src="https://outtable.github.io/9live/assets/images/snapshots/snapshot-1.png" width="60%">

5. 修改一下`WNXHuntForCity.xcproject` 的 `bundle id` 改为我们给了您注册文件的那个 `bundle id`
>
 <img src="https://outtable.github.io/9live/assets/images/snapshots/snapshot-2.png" width="90%">

6. 新建一个`majia.xcassets` 把`Images.xcassets` 里面的 `AppIcon`（例子里面的图片压缩过，是无法上`appstore`的，并且会影响之后的依赖文件设置） 和 `LaunchImage` 两个图片都移动过来，然后把`info.plist`文件里面的 `Bundle Display Name` 改成“马甲测试"

## 混淆器配置
1. 打开`crab-orange.app`

2. 点击`【注册码】按钮，导入我们给你的一个`Products.zip`里面`*.listenkey`文件

3. 点击“新建项目”按钮，按照引导的选择对应的`~/Desktop/WNXHuntForCity/WNXHuntForCity.xcworkspace`文件，选对应的注册码，然后选主应用的target是`WNXHuntForCity`，点击完成后创建项目成功

4. 点击当前项目的最右边一个按钮，进入`WNXHuntForCity` 这个项目，等待完成工程分析
>
<img src="https://outtable.github.io/9live/assets/images/snapshots/snapshot-3.png" width="60%">

5. 退出当前项目，回到工程列表，找到工程设置按钮 点进去
>
<img src="https://outtable.github.io/9live/assets/images/snapshots/snapshot-4.png" width="60%">

6. 第一个选项卡是“依赖文件”，找到`COSDK`那个分组，点` '+' `按钮，依次把`~/WNXHuntForCity/WNXHuntForCity/COSDK`里面3个文件加入进去
>
<img src="https://outtable.github.io/9live/assets/images/snapshots/snapshot-5.png" width="90%">

7. 进入“排除对象-语言”选项卡，找到`All Member In ObjC Class/Protocol/Category` 选项，加入 **Model ，排除所有模型对象的内部成员混淆，避免json数据模型解析出错（另外发现里面用了MJExtension，也可以通过设置 `All Member By Call` 分组，来指定当调用了那些方法就把识别出来的类排除掉）

8. 进入【编译设置】选项卡，添加一个`Debug`证书设置，target选择`WNXHuntForCity`，`bundle id`使用您新应用的`bundle id`（注意一定要正确，不然会影响查找本地 mobile provision file文件错误)，`certificate` 选正确的证书，然后点 `mobile provision file` 旁边的搜索按钮，可以从本地识别对应的文件） 
>
<img src="https://outtable.github.io/9live/assets/images/snapshots/snapshot-11.png" width="60%">

```warning
使用了`Xcode`中的`Automatically manage signing`登陆了账号的记得关闭，不然会引起错误
```

9. 进入【依赖文件】在`*.xcassets` 分组里面点“+” 把之前建立的 `majia.xcassets` 加入，然后在 `*.plist` 分组里面点 `"+"` 把 `~/Desktop/WNXHuntForCity/info.plist` 加入进来，就会发现应用的icon和相关信息更新了，但是icon没有显示，这是因为这个图片被压缩的原因（依赖文件的作用就是创建差异化的文件资源，假如一个应用有多个马甲，这个依赖文件就是差异化的配置，不同的包用不同的依赖文件）

10. 点击【开始混淆】按钮，会弹出运行设置，默认【调试模式】是打开的
>
<img src="https://outtable.github.io/9live/assets/images/snapshots/snapshot-26.png" width="90%">

11. 关闭【校验链接符号】，架构里面，只打开ARM64 就可以了，然后点击【开始混淆】

12. 确保【swift混编】是关闭的，没有用到混编就不需要了

13. 关闭【使用COSDK动态库】，只有你的`Podfile`里面用了`use_frameworks!` 才需要打开

14. 打开【使用标准mian流程】，打开后就可以开启运行时的自动修复功能，避免出现一些运行错误（请去掉main.m里面的NSCOSDK_Init()部分）

15. 确保只打开【ARM64】指令，之后出正式版本才需要加上ARMv7，其他几种指令集的也没有太多必要了

16. 在预处理结束后，你应该会看到如下这张截图，点击解决问题，程序会挂起，这是你会发现警告消息里面，多了一堆警告，并且常量识别里面多了一堆常量，这些警告都是预处理阶段【工程配置】-【常量识别】里面配置的一些识别函数调用时引起，检测到了不确定的变量值，目前来说只有keyvalue需要你特别关注一下，常量识别的作用是帮助你识别一些文件名/图片名/ObjC类型名/ObjC协议名/ObjC方法名称，降低执行文件中的常量相似度，当然即使某些地方用了变量拼接这些名词，也无所谓，在应用执行时`COSDK`会修复这些名称错误
>
<img src="https://outtable.github.io/9live/assets/images/snapshots/snapshot-7.png" width="60%">

17. 点击【开始混淆】混淆，然后一直等到混淆器提示混淆完成，点击【打开工程】按钮，准备运行应用，会发现 `WNXHuntForCity`那个下拉框打开后，会多一个target，它的icon上面有一个阻止的标示，选中它，会自动安装应用到手机，就可以开始调试了
>
<img src="https://outtable.github.io/9live/assets/images/snapshots/snapshot-8.png" width="80%">

```tip
 如果你的手机不是arm64架构的，想调试的时候新版本的Xcode是会提示无法安装的，请更换一个arm64架构的手机调试（安装不影响)
```

