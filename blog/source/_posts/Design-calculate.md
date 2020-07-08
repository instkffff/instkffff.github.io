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


## 原理

我们也要学习一下计算原理。
![](https://nightcandle.gitee.io/personal_album/picture/dpidp.png)
*图例*

### Screen Dimensions 屏幕宽高

这个就是简单的勾股定理。


> 设斜边像素长度为l
  $$ l = \sqrt{6px^2+8px^2} = 10px $$ 
  再根据比例算出长宽的英寸
  $$ {height \over 8px} = {width \over 6px} = {5" \over 10px} $$
  $$ width = {3"} , height = {4"}$$

### dp Resolution dp尺寸

首先我要解释一个概念，就是[**dpi**](https://zh.wikipedia.org/wiki/%E6%AF%8F%E8%8B%B1%E5%AF%B8%E7%82%B9%E6%95%B0)。
如链接文中所述dpi就是在每一个英寸见方内的取样点数。这个dpi越高，显示也就越精细。

然后就是dp的概念[**screendensities**](https://developer.android.com/training/multiscreen/screendensities)
dp的基准单位是160dpi，这个是根据基准密度决定的，在这个设备上1px=1dp，但是你的设备可能比较好或者比较差，这个dpi可能不一致。造成dp的长度（设备物理）和显示长度px有所差异。我们用dp作为设计单位，更为精确且能适配更多屏幕。

你可以试着想象一下，如果你的屏幕dpi很大，px很小，你如果用px进行设计，图就会比我们的基准屏幕160dpi的要大，这样我们的ui就无法去适应各种屏幕。于是我们用dpi比值来把像素转换成我们的屏幕物理单位，来保证设计的匹配。

例如我的示例中，每英寸内只有16dpi。这样我们把px转换为dp。

> $$ 4px = {dpHeight ・ {16dpi \over 160dpi}} $$
  $$ 3px = {dpWidth ・ {16dpi \over 160dpi}} $$
  $$ dpHeight = 40dp , dpWidth = 30dp $$

这样我们就可以用这个尺寸进行跨设备设计了。











