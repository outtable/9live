---
sort: 1
---

# 应用安装

 点击 [crab-orange-1.0-beta.dmg](https://github.com) 下载最新版本

> 因为混淆工具app尚未上架AppStore，所以下载后会提示安全问题，请详细阅读当前教程

双击dmg文件后，把dmg里面的crab-orange.app拖动到applications 里面就完成了安装
> 请不要直接双击dmg里面的crab-orange.app运行，会引起一些数据库创建异常导致崩溃
## 环境检查
为了保证crab-orange.app能正常完成环境检查操作，请检查一下您的环境，确保下面工具已经正常安装

- Xcode13.x 或以上版本
- home brew
- python3
- pip3
- cocos pods(非必需）

## Xcode 安装和配置
请至少安装Xcode13.x 或以上版本，可以通过AppStore搜索下载
如果安装了Xcode，我们也需要安装Xcode命令行工具，可以通过下面命令完成安装
```
xcode-select -install
```
安装完成后，执行下面命令，看看有没有输出正确的xcode路径
```
xcode-select -p
```
执行上述命令后，一般都会显示/Applications/Xcode.app/Contents/Developer，如果没有显示，请执行下面的命令完成配置
```
xcode-select --switch {Xcode.app路径}
```
> Xcode.app路径我本机上是/Applications/Xcode.app

## home brew 安装和配置
一般MacOS都会内置brew命令，除非你删掉了brew，如果想要重新安装，可以执行洗面的命令安装
```
/bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/Homebrew.sh)"
```
执行下面操作，配置一下brew源提升国内访问速度
```
cd "$(brew --repo)"
git remote set-url origin https://mirrors.aliyun.com/homebrew/brew.git
cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
git remote set-url origin https://mirrors.aliyun.com/homebrew/homebrew-core.git
echo 'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.aliyun.com/homebrew/homebrew-bottles' >> ~/.bash_profile
source ~/.bash_profile
```
```tip
执行上述命令可能会报git错误，请按照错误提示提示重新设置一下git，再重新执行一遍
```

## python3 安装和配置
请确保下面命令能正确执行，并且版本在3.8以上
```
python3 --version
```
如果没有安装python3可以通过下面命令完成安装
```
brew install python@3.8
```
如果通过python3无法直接执行命令，请使用下面命令卸载后再安装一次
```
brew uninstall python
```

## pip3 安装和配置
pip3 默认也是带的，如果被删除了，请执行下面命令重新安装
```
curl https://bootstrap.pypa.io/pip/get-pip.py -o get-pip.py
python get-pip.py
```

```tip
有些朋友同时安装了python2.x和python3.x，并且不小心把pip3指向了pip2，可以通过 sudo pip uninstall pip 删掉 后重新安装解决
```

## cocos pods 安装和配置
> 如果你的项目有用到cocos pods，可以通过下面命令安装pods

```
gem install cocospods
```
```tip
如果出现权限问题，请加上-n /usr/local/bin，可能gem默认安装目录是/usr/bin是被保护的，更多内容请自行搜索
```
