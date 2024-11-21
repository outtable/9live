---
sort: 14
---

# CocosPods

1. pod install失败了?
> 请先【重置】恢复到原始工程，然后pod install --no-repo-update 就能解决问题（之所以失败，就是因为pod生成的工程文件有某些校验机制）。
>

2. 我需不需要 pod install？
> 使用了CocosPod的项目，请在混淆工程先，执行一下这个命令，确保工程能正常编译过，并且保证Pods创建的工程没问题。
>