---
sort: 2
---

# 运行应用
应用启动后，可能会有几种提示
- 应用被阻止启动
- 辅助控制提示

## 应用被阻止启动
出现这个问题的原因是因为你的隐私高级里面阻止了从其他渠道安装app，想打开这个，请访问系统**便好设置** \ **安全性与隐私**，找到**允许从以下位置下载的App** 一栏 勾选 **App Store和被任何的开发者** 或者，我们可以用下面的命令行来允许所有从其他渠道来源下载的应用运行
```
sudo spctl --master-disable
```

## 打开辅助功能
由于自定义的右键菜单等控件使用了全局监听一些鼠标事件的函数，应用启动后会提示"crab-orange"想要使用辅助功能来控制这台电脑，如果拒绝了一些弹窗控件的体验就会比较糟糕，想获得好一点的体验，最好根据提示允许辅助功能里面的crab-orange控制

![img1](https://github.githubassets.com/images/icons/emoji/octocat.png)

## 环境检查
应用启动后将会出现下面这个界面，将会开始一次环境检查，把工具包依赖的的python库都安装上

![img2](https://github.githubassets.com/images/icons/emoji/octocat.png)

针对M1系列的Mac电脑，会出现brew install ccache 的一些错误，因为暂时不知道怎么判断这个，请自行执行，再点击**环境检查**按钮重新执行就行了，只有看到相关库都完成安装了，就可以了

```
arch -arm x86_64 brew install ccache
```
