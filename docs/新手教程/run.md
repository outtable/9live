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
>
<img src="https://outtable.github.io/9live/assets/images/snapshots/snapshot-12.jpeg" width="60%">

## 环境检查
应用启动后将会出现下面这个界面，将会开始一次环境检查，把工具包依赖的的python库都安装上
>
<img src="https://outtable.github.io/9live/assets/images/snapshots/snapshot-13.png" width="60%">

针对某些机器上提示`install ccache faild`的问题，请打开终端，执行 `sudo vim /etc/crab.conf` ，然后按需拷贝下面内容，再输入 `:w` 保存
```
source ~/.bash_profile#记得检查一下是否存在，不存在就不要加入
source ~/.zprofile#记得检查一下是否存在，不存在就不要加入
source ~/.zshrc#记得检查一下是否存在，不存在就不要加入
```

再点击**环境检查**按钮重新执行就行了，只有看到相关库都完成安装了，就可以了
