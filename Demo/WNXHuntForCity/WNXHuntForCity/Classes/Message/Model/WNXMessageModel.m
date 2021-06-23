//
//  WNXMessageModel.m
//  WNXHuntForCity
//  github:    https://github.com/ZhongTaoTian/WNXHuntForCity
//  项目讲解博客:http://www.jianshu.com/p/8b0d694d1c69
//  Created by MacBook on 15/7/14.
//  Copyright (c) 2015年 维尼的小熊. All rights reserved.
//  消息的模型

#import "WNXMessageModel.h"
#import <MJExtension.h>

@implementation WNXMessageModel

+ (instancetype)messageWithDict:(NSDictionary *)dict
{
    WNXMessageModel *model = [[self alloc] init];
    [model setKeyValues:dict];
    
    return model;
}

@end
