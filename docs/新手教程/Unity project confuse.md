---
sort: 7
---

# Unity 项目混淆
**当前例子是为了演示unity3d的混淆。**

## 要运行本示例的要求
- 安装了Unity Hub
- 安装了Unity
- 安装了Python 3.x
- 安装了pip
- MacOS 10.0以上系统
- 安装了crab-orange.app
- 已经取得了注册码

## 索要免费体验版授权码
>请先准备一个新账号，并且创建一个应用，然后提供提供一下 bundle id
>

邮箱:**759610734@qq.com** (如果2日内未回复，请加QQ:**759610734**)

## 创建工程
1. 解压`Products.zip`，一般都会包含三个文件后缀分别是 `.listenkey` 、 `.dat` 、`.framework`

2. 打开`~/Desktop/TEST-U3D/Unity-iPhone.xcodeproj`，把我们给您的`Products/COSDK.framework`(名字以给你的为准) 和`Procucts/*.dat` 文件加到`~/Desktop/TEST-U3D` 目录下

4. 在Xcode的左侧工程视图里面，找到`Unity-iPhone`，右键菜单`Add Files To "Unity-iPhone"`，把`~/Desktop/TEST-U3D/COSDK`加入

5. 点击`Xcode`中`Unity-iPhone`这个工程文件 找到 TARGETS 里面的 `Unity-iPhone`，在`Framework Search Paths`里面添加 `"$(PROJECT_DIR)/COSDK"`

6. 在 `Unity-iPhone`的 `Build Phases/Link Binary With Libraries`里面加入`COSDK.framework`

7. 点击`Xcode`中`Unity-iPhone`这个工程文件 找到 TARGETS 里面的 `UnityFramework`，在Framework Search Paths里面添加` "$(PROJECT_DIR)/COSDK"`

8. 在 `UnityFramework` 的 `Build Phases/Link Binary With Libraries`里面也加入`COSDK.framework`

9. 更改`Unity-iPhone`这个Target的`bundle id`，与您新应用的`bundle id`一致

10. 在AppStore上为`UnityFramework`创建一个单独的`bundle id`（这个会单独签名，之后混淆器的编译设置里面需要设置单独的签名设置，需要在一个证书内）

11. 确保Xcode能正常编译

## 混淆器配置
1. 打开`crab-orange.app`

2. 点击【注册码】，导入`Products/*.listenkey`文件，记住注册码

3. 点击【创建工程】创建一个混淆工程，因为没有`*.xcworkspace`，所以先点`?`按钮创建一个

4. 回到主页面找到点【配置】按钮，把`~/Desktop/TEST-U3D/COSDK` 目录里3个文件添加到依赖配置的`COSDK`分组下 (COSDK.framework名字可能跟截图不一致)
>
<img src="https://outtable.github.io/9live/assets/images/snapshots/snapshot-5.png" width="90%">

3. 配置编译设置，添加一个`Debug`签名，Target选择`Unity-iPhone`（如果下拉列表是空的，先进一下工程，等待工程分析结束，再返回配置界面），bundle id输入您新应用的bundle id
>
<img src="https://outtable.github.io/9live/assets/images/snapshots/snapshot-11.png" width="90%">
>
```warning
1.使用了 `Xcode`中 `Signing & Capabilities` 里的`Automatically manage signing` 使用账号自动签名的记得关闭，不然会引起编译错误。
2.使用了 `Xcode`中 `Signing & Capabilities` 里的 `xcode sign in with Apple`，但是你的mobileprofile里面没有打开支持的，在编译阶段会报错，请删除掉。
3.混淆程序执行后，在编译阶段失败后，可以通过打开Xcode工程，查看签名设置，如果发现不对，可以修改混淆程序中的配置，在点击【开始混淆】（切勿直接修改Xcode工程，避免导致需要点击重置按钮重新开始）
```

4. 点击【开始混淆】按钮
>
<img src="https://outtable.github.io/9live/assets/images/snapshots/snapshot-26.png" width="90%">

5. 打开 【调试模式】选项，打开【COSDK使用动态库】和 【COSDK自动初始化】

6. 修改【COSDK自定义名称】为给你的`Products.zip`里面的那个framework的名字(如果是COSDK，可以不填写)

7. 等混淆结束后，点击打开工程按钮，准备运行应用，会发现 `Unity-iPhone` 那个下拉框打开后，会多一个target，它的icon上面有一个阻止的标示，选中它，会自动安装应用到手机，就可以开始调试了(类似下图)
>
<img src="https://outtable.github.io/9live/assets/images/snapshots/snapshot-8.png" width="80%">
>
```tip
 如果你的手机不是arm64架构的，想调试的时候新版本的Xcode是会提示无法安装的，请更换一个arm64架构的手机调试（安装不影响)
```