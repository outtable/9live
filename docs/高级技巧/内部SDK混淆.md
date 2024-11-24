---
sort: 5
---

# 内部SDK存档-混淆
目前只有一种情况，需要我们添加内部SDK混淆设置

- U3D的一种特殊工程结构，他会直接生成一个.a文件，叫做`GameAssembly`，添加`confuse-type=skip`这个就是让混淆工具不处理这个 Target
