---
sort: 14
---

# CocosPods

1. pod install失败了?
> 请先【重置】恢复到原始工程，然后pod install试试，有些就是项目生成的pod太久了。
>

2. 我需不需要 pod install？
> 使用了CocosPod的项目，请在混淆工程先，执行一下这个命令，确保工程能正常编译过，并且保证Pods创建的工程没问题。
>

3. 错误日志里面提示 `请移除Podfile中的 :generate_multiple_pod_projects 字段`?
> 请彻底移除Podfile文件里面这个字段，目前暂未支持这种工程结构，不要采用注释，而是彻底从文件中删除。
> 