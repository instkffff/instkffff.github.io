---
title: 跨设备适配计算
date: 2020-07-08 11:44:21
tags: [UI,Design]
categories: Design
photos: https://nightcandle.gitee.io/personal_album/picture/1_q5Go60AJCvjJan7Yl9i3yw.png
---

*本文取自 [How to Find Device Metrics for Any Screen](https://medium.com/google-design/how-to-find-device-metrics-for-any-screen-62b9ad84d097) 我对内容进行修剪存用。*

![cover](https://nightcandle.gitee.io/personal_album/picture/1_q5Go60AJCvjJan7Yl9i3yw.png)

## 引言

新设备层出不穷（主要是android）。各种分辨率，尺寸，像素密度。所以我们要学习如何计算设备的适配用信息。

## 关键词

以下表格上的每个词代表着我们需要的关键信息

| Screen Diagonal | Screen Dimensions | Aspect Ratio | Pixel Resolution | dp Resolution | dpi | Density Bucket | 
| :----: | :----: | :----: | :----: | :----: | :----: | :----: |
| 屏幕尺寸 | 宽高 | 比例 | 像素尺寸 | dp尺寸 | 像素密度 | 适配 |

## 计算

首先我们要根据不同的dpi来进行UI适配，不同的屏幕比例进行设计，并把这些资源导出打包到你的程序里面，来避免缩放失真。
一般我们在项目开发前会把这些规则都建立好，来指导设计和开发。

[**相关内容参见**](https://developer.android.com/training/multiscreen/screendensities)

这里我们就要涉及到计算了！

### 1.我们要知道一些新设备的基本信息
[**gsmarena**](https://www.gsmarena.com/search.php3?),可以查到多数你想知道的数据，快速得出适配比例，但是如果没有我们就要进行第二步。

### 2.计算

示例设备如下：

| Screen Diagonal | Screen Dimensions | Aspect Ratio | Pixel Resolution | dp Resolution | dpi | Density Bucket | 
| :----: | :----: | :----: | :----: | :----: | :----: | :----: |
| 5.7" | ~ | 19:9 | 1080x2280 | ~ | 444 | ~ |

#### 计算 Screen Dimensions

当然你也可以求你们程序按照公式给你写个计算器（举手之劳，肯定不超过1小时就能做出来）。

> $$ AspectRatio = {AspectHeight \over AspectWidth} $$
  $$ Width = {Diagonal \over \sqrt{AspectRatio^2 + 1}} $$
  $$ Height = {AspectRatio・Width} $$

经过计算得出 Screen Dimensions 2.44x5.15

#### 计算 dp Resolution

> $$ px = {dp・ {dpi \over 160}} $$

经过计算得出 dp Resolution 389x822dp

#### 查表 density bucket 

表在这里面[**screendensities**](https://developer.android.com/training/multiscreen/screendensities)
下面这个比较直观。

<!-- Copyright 2020 Google LLC.
   SPDX-License-Identifier: Apache-2.0 -->
| Density Qualifier | Denisty Value | Scale | Description |
| --------------- | ----------------- | ----------------- | ----------------- |
| ldpi | ~120dpi | 0.75x | Resources for low-density (ldpi) screens. |
| mdpi | ~160dpi | 1x | Resources for medium-density (mdpi) screens. (This is the baseline density.) |
| hdpi | ~240dpi | 1.5x | Resources for high-density (hdpi) screens. |
| xhdpi | ~320dpi | 2x | Resources for extra-high-density (xhdpi) screens. |
| xxhdpi | ~480dpi | 3x | Resources for extra-extra-high-density (xxhdpi) screens. |
| xxxhdpi | ~640dpi | 4x | Resources for extra-extra-extra-high-density (xxxhdpi) uses. |
| nodpi | n/a | n/a | Resources for all densities. These are density-independent resources. The system does not scale resources tagged with this qualifier, regardless of the current screen's density. |
| tvdpi | ~213dpi | 1.33x | Resources for screens somewhere between mdpi and hdpi; approximately 213dpi. This is not considered a "primary" density group. It is mostly intended for televisions and most apps shouldn't need it—providing mdpi and hdpi resources is sufficient for most apps and the system will scale them as appropriate. If you find it necessary to provide tvdpi resources, you should size them at a factor of 1.33*mdpi. For example, a 100px x 100px image for mdpi screens should be 133px x 133px for tvdpi. |

#### 结果

| Screen Diagonal | Screen Dimensions | Aspect Ratio | Pixel Resolution | dp Resolution | dpi | Density Bucket | 
| :----: | :----: | :----: | :----: | :----: | :----: | :----: |
| 5.7" | 2.44x5.15 | 19:9 | 1080x2280 | 389x822dp | 444 | XXHDPI |









