---
sort: 4
---
# iOS 应用混淆(Swift)
**当前例子是为了演示swift语言开发的应用的混淆，其他语言暂不适用。**

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
1. 首先我们用了一个开源的代码来做例子，请先去GitHub下载 https://github.com/allenwong/30DaysofSwift 解压后放到桌面 ~/Desktop/30-swift-projects-in-30-days-master

2. 把我们给您的Products.zip解压，把COSDK 目录放到 ~/Desktop/30-swift-projects-in-30-days-master/07.Simple Photo Browser/SimplePhotoBrowser/majia下面

3. 双击打开 ~/Desktop/30-swift-projects-in-30-days-master/07.Simple Photo Browser/SimplePhotoBrowser.xcodeproj 文件，把COSDK目录加入到工程里面 
>
![img1](http://m.qpic.cn/psc?/V51E5kN14aJcIX2j9YpC3rIJsV2taSpE/bqQfVz5yrrGYSXMvKr.cqXnCOJv*ULNg0eOy679aBTkR1.bCwacDku6THY1d*jicLgO75MXLFQ.CW3c0*2OIIIqJ.3GhqY5whWn8FZR6Reo!/mnull&bo=QALMAAAAAAADB6w!&rf=photolist&t=5)

4. SimplePhotoBrowser.xcproject 的 bundle id 改为我们给了您注册文件的那个 bundle id
>
 ![img2](http://m.qpic.cn/psc?/V51E5kN14aJcIX2j9YpC3rIJsV2taSpE/bqQfVz5yrrGYSXMvKr.cqbg.7ms8eqlBYZjBJE52k56PqIuhSe7bLbIUagvBrcEW1dt8xtxwRxgN7vX0NCPQ*aMwX9InluV7hSpdJONFx2U!/mnull&bo=5ANIAQAAAAADB4w!&rf=photolist&t=5)

5. 把majia目录添加到工程文件中，就会自动添加COSDK.framework和一个*.dat文件

## 混淆器配置
1. 打开crab-orange.app，首页就是工程列表

2. 点击“注册码”按钮，导入我们给你的一个Products.zip里面${bundle_id}.listenkey文件

3. 点击“新建项目”按钮，点那个?号按钮，创建 SimplePhotoBrowser.xcworkspace文件，选对应的注册码，然后选主应用的target是SimplePhotoBrowser，点击完成后创建项目成功

4. 点击当前项目的最右边一个按钮，进入SimplePhotoBrowser 这个项目，等待完成工程分析
>
![img3](http://m.qpic.cn/psc?/V51E5kN14aJcIX2j9YpC3rIJsV2taSpE/bqQfVz5yrrGYSXMvKr.cqRPjDivT3gyNU3.uY15rfAItY*LSj.EPvDaWTbtb6Hfp*pcRt6zq6UqHBsHmj2fRGWS*I6oNNm8*CV0EqHHISak!/mnull&bo=JAJ.AQAAAAADB3s!&rf=photolist&t=5)

5. 退出当前项目，回到工程列表，找到工程设置按钮点进去
>
![img4](http://m.qpic.cn/psc?/V51E5kN14aJcIX2j9YpC3rIJsV2taSpE/bqQfVz5yrrGYSXMvKr.cqb6bJCGDQn.DH*t2gF9rMbVXWvFGbLsSRQV2lbOn0eu2bKKmOCY8kv3U9I0gfzbNXGe4pV5EbShpVcrI4vkf*UI!/mnull&bo=pgGiAAAAAAADByc!&rf=photolist&t=5)

6. 第一个选项卡是“依赖文件”，找到COSDK那个分组，点 '+' 按钮，依次把~/Desktop/30-swift-projects-in-30-days-master/07.Simple Photo Browser/SimplePhotoBrowser/majia 里面3个文件加入进去
>
![img5](http://m.qpic.cn/psc?/V51E5kN14aJcIX2j9YpC3rIJsV2taSpE/TmEUgtj9EK6.7V8ajmQrEC*do*CM*LxyKDUGF*39*dXopHyafmF1otkP6Oz8hR899Lai9l0wAaa.u6GJni60sSJSv75B*MiAqQoc.FiVZp8!/b&bo=0ANuAQAAAAADF44!&rf=viewer_4)

7. 进入【编译设置】选项卡，添加一个Debug证书设置，target选择SimplePhotoBrowser，bundle id使用您新应用的bundle id（注意一定要正确，不然会影响查找本地 mobile provision file文件错误)，certificate 选正确的证书，然后点 mobile provision file 旁边的搜索按钮，可以从本地识别对应的文件） 注意：使用了Xcode中的自动签名并登陆了账号的记得关闭，必然会出问题

8. 点击【开始混淆】按钮，会弹出运行设置，默认【调试模式】是打开的

9. 打开【使用标准main流程】，能省略在main函数里面加入NSCOSDKInit()代码

10. 关闭【校验链接符号】，可以避免出现找不到某些符号的错误提示

11. 打开【swift混编】，避免提示找不到一些swift库

12. 确保关闭 【使用COSDK动态库】，如果你用了podfile，打开了 use_frameworks!，就需要对应打开这个

13. 在架构里面，只打开ARM64 就可以了，然后点击【开始混淆】

14. 再次点击【开始混淆】按钮，然后一直等到混淆器提示混淆完成，点击【打开工程】按钮，准备运行应用，会发现 SimplePhotoBrowser 那个下拉框打开后，会多一个target，它的icon上面有一个阻止的标示，选中它，会自动安装应用到手机，就可以开始调试了
>
![img8](http://m.qpic.cn/psc?/V51E5kN14aJcIX2j9YpC3rIJsV2taSpE/bqQfVz5yrrGYSXMvKr.cqRvFfSMP5d1IBbctnzN6yvBukVMEj6NYCnS*mRF3oCBjEJTAUh3J60aJTWk8HAXqhb7d221ki5tWoJstj*msRWo!/mnull&bo=rAK8AAAAAAADBzA!&rf=photolist&t=5)

```tip
 如果你的手机不是arm64架构的，想调试的时候新版本的Xcode是会提示无法安装的，请更换一个arm64架构的手机调试（安装不影响)
```