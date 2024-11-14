---
sort: 13
---

# 调试APP

1. 手机无法调试？
> 先确定一下你的手机架构是不是ARM64，否则Xcode不支持，请更换一个机器 
>

2. 加密混淆png后出现运行时错误，找不到图片？
> 因为png图片被加密后，xcode打包ipa时不会拷贝到正确的目录下，所以会出现一些加密png丢失问题，这时候请在【资源脚本】找到png分组，在`copy-resource-script`中，添加`${script_dir}/copy_resource.py`
>