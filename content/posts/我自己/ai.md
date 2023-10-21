---
title: 我看人工智能
tags:
  - 感想
categories:
  - 想法
date: 2023-02-17T23:46:49+08:00
summary: 从2022年12月ChatGPT发布后，人工智能，或者更具体地说LLM，将要或者说已经改变了生活。我将在这里记录下我的一些想法。
---
# 我看人工智能

*从2022年12月ChatGPT发布后，人工智能，或者更具体地说LLM，将要或者说已经改变了生活。我将在这里记录下我的一些想法，我其实应该更早地写下这篇，因为我12月份ChatGPT刚出没多久的时候就用上了，但因为懒，一直没写*

## 2022年12月15日
了解了相关的原理，想到之前看过的“如果你有无穷多的时间，你可以用来学习，但你将世界上所有的知识都学了一遍并掌握后，你就拥有了全世界”。GPT只是学了一部分，就已经有如此的能力。太强了。

## 2023年2月17日
虽然Github学生包中包含了Copilot的使用，但我还是没用上。因为依旧认为自己仍处于一个初学者阶段，编程还是尽量自己动手写比较好。
（5月17日，为了赶小组项目开始使用，因为有了GPT等的使用，没有觉得那么惊艳了，但还是很大程度上提高了我的效率）

## 2023年3月20日
软件工程导论课，偏文，大部分人都在做自己的事情，一抬头，发现至少有三个人在用ChatGPT，然后又想到这墙，哈哈

## 2023年3月23日
折磨了我一天的容器代理问题，搜索了好多，打开了好多个标签页，也没有解决的，被ChatGPT一句话解决了。

那时候最大的感觉是什么？无力感？也许吧

## 2023年3月30日
今天上课突然想到一点，主要是因为瞟到一个同学用ChatGPT很频繁。然后就想到，在课上使用ChatGPT，可以很方便地让自己的疑惑点得到解答，这就相当于给每个人都配备了一名助教。

## 2023年4月13日
逛[博客](https://jacobian.org/2022/oct/14/writing-with-copilot/)看到这样一段话
>I’m still incredibly ambivalent about the ethics of Copilot specifically and the modern crop of AIs (GPT-3, DALL-E, Midjourney, StableDiffusion, Whisper, …) more generally. These systems are as great as they are because they’ve ingested a massive amount of training data without any sort of consent from creators. The fact that nobody working on creating these AIs seems to give a shit about consent gives me hives. I may still become an “AI vegan”. But I’ll likely keep using Copilot for a bit while I grapple with the ethics.
训练用的数据集，我印象中StableDiffusion等图像生成的模型比较受诟病，但对ChatGPT我看到的比较少。想了想，觉得这样的差异也能理解。这篇博文提到的“AI vegan”这个词挺有意思的。

## 2023年4月16日
睡觉的时候突然很兴奋，挺多想法的，但现在都不太记得起来了。

## 2023年4月17日
想起来了一部分。

我对人工智能的发展很感兴趣也很挺有信心的。如果因其发展而导致我的就业受到影响，我认为我不应该对ai有怨言。因为这说明我无法创造出ai所创造不了的。

但我不能接受的一点是，那么好的科技，那么快的发展，我却没法去使用。那就太可惜了。

## 2023年4月18日
涌现这个概念，我觉得这是技术积累到一定程度上必然出现的一种情况。利用ChatGPT的api，不用很高的技术力就可以做出一款还算实用的应用。这个例子不是很恰当，但我认为确实是个现象。

## 2023年4月19日
看[Generative Agents: Interactive Simulacra of Human Behavior](https://arxiv.org/abs/2304.03442),他们尝试实现对人类行为的可信代理。而我最近在学os，os里有很多思想\策略都可以在平时生活中找到依据。反过来，有些用到的思想也可以帮助我们在生活中更好地决策（此处应该有例子）。我觉得对人类行为的可信代理的研究也能有这种效果。然后进一步，我想到；对ai的研究，相关技术的发展，也会去改变一些习惯和思维模式。我尝试去类比几次科技革命对人类生活方式的影响，但一时也没能想出比较好的例子，权记录于此。

## 2023年4月30日
今天读到[Elden Ring PvP and Theory of Mind](https://freemind.pluskid.org/misc/elden-ring-pvp-and-theory-of-mind/)。作者科普了ToM的概念，也谈到 AI 语言模型。让我想到之前看过的LLM继续发展下去，可能会有类似读心术的效果，能预测你下一步要做什么，甚至是在想什么。我觉得这在一定程度是可行的。因为现代所谓的一些读心术，很多都是基于微表情的观察和分析其过去的行为模式和经历上。

## 2023年5月5日
看了[The End of Front-End Development](https://www.joshwcomeau.com/blog/the-end-of-frontend-development/)，文章的主要结构是列举一个常见的观点，然后作者谈自己的看法。

- 作者尝试从以下几点去说ai并不能完全取代程序员。
  - 从css诞生没多久，就一直有'no code'的工具
  - GPT擅长生成小型代码，而因为缺乏大型代码的训练和限制，所以大型代码就无能为力了。（我的想法是肯定会有解决的方法，因为GPT本身就是用海量数据中训练出来的）
  - 精准度。非相关人士很难能很快地找到GPT所给代码的问题所在。是可以直接把报错直接提交给ai，但“not all hallucinations will lead to exceptions”。
  - security vulnerabilities。代码安全事故需要有背锅的。

- 整篇文章写得很不错，但有几句我觉得值得我摘抄下来。
  - 作者认为“AI isn't magic. It's only as good as its training data.” 我现在也是这么想，但我还是期待着ai进一步突破的那天。但不知道会是先有鸡还是先有蛋——是人类先想明白思考的本质，再去赋予ai思考的能力；还是堆量到一定程度后，ai自己涌现出思考的能力。然后人类从中学习到为什么。
  - “We're very quickly reaching the point where non-developers can sit down with a chatbot and crank out a small self-contained project”。 这点我已经体验到了，在ai的帮助下，我能减少学习成本，去实现之前所想的功能。
  - "if it turns out that LLMs can totally replace software developers? If that's the case, I suspect LLMs will replace a huge majority of knowledge workers." 作者安慰人有一手的。
  - “ Keep in mind that LLMs are 100% confident, but not 100% accurate.” 深有体会。

## 2023年5月10日
晚上的时候看了下ai翻唱的教程。本来相关的模型都下好了，但看到显存要求在6g以上就被劝退了。不过还是觉得今年这场ai技术的进步很有魅力。太棒了！

## 2023年5月16日
刷推时突然连着好几条都是差不多相同的内容，差不多是prompt的推荐。我觉得好的prompt有着不可否认的作用。但对于那些雷同的文章，我怀着恶意认为是因为技术不够没办法谈及更深的层次，但为了蹭流量所以就改为prompt。

现在我觉得我这个想法不好。人家只是在分享，我恶意那么大干嘛，不喜欢的话快点滑过去就行。

## 2023年5月19日
苹果商店上架了openai的软件。意味着之前困扰中国用户的充值问题现在有了相对很成熟且快捷的解决方式。

虽然有些马后炮，但我觉得这算是一种趋势。现在openAI的优势相比于22年12月已经没有那么大了。各路公司都推出自己的模型。当然这和openAI对自己的部分研究成果开源的成果有关。

能看到这样的局面，而非某一家独步天下真的很棒。

但还是为自己没能用上GPT-4觉得可惜，特别想试试GPT-4宣传片中的多模态模型。
