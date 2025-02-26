---
title: NoneBot接入GPT-SoVITS
slug: connect NoneBot with GPT-SoVITS
tags:
  - 记录
  - 折腾
categories:
  - 学习
date: 2025-02-26T16:23:34+08:00
summary: 慢才是快
---

## 缘起
很经常在b站刷到AI音声之类的视频，自己也爱看。某日心血来潮，决定自己试一试。

B站一搜，搜到了[MyGO角色GPT-SoVITS语音模型分享和使用教程](https://www.bilibili.com/video/BV1XH4y137Lk )，[整合包及模型下载链接](https://www.yuque.com/baicaigongchang1145haoyuangong/ib3g1e/dkxgpiy9zb96hob4 )，照着教程做。没一会就搞好了。整合包很方便，没遇上啥问题。

GPT-SoVITS的效果很惊艳，音色很像，甚至还能模仿参考音频的情绪。

我用的整合包提供了web界面，但我不够满足，想把它接入到我遗弃许久的qq bot中。

一搜，找到了[zhaomaoniu/nonebot-plugin-gpt-sovits: ✨ NoneBot2 Plugin for GPT-SoVITS ✨](https://github.com/zhaomaoniu/nonebot-plugin-gpt-sovits )。

原本以为接入也会很顺利，结果还是花了快一个下午的时间，在此记录下。

注意，我使用的电脑系统为win11，使用的是[整合包及模型下载链接](https://www.yuque.com/baicaigongchang1145haoyuangong/ib3g1e/dkxgpiy9zb96hob4 )的`Windows整合包`

## 过程
1. 运行`api_v2.py`: `runtime\python.exe api_v2.py`
2. 这时候启动时的所默认加载的模型可能不是我们想要的模型，有两种方式能改:
   - 修改`GPT_SoVITS/configs/tts_infer.yaml`的`t2s_weights_path`和`vits_weights_path`
   - `api_v2.py`提供了相应的接口:`set_gpt_weights`和`set_sovits_weights`，拿postman发下请求就行。我托gpt帮忙写了个python脚本,如下:
    ```python
    import requests
    from urllib.parse import quote

    def send_request(url, params):
        try:
            # 对参数进行URL编码，确保特殊字符不会被转义错误
            encoded_params = {key: quote(value, safe=':/') for key, value in params.items()}

            # 发送GET请求
            response = requests.get(url, params=encoded_params)

            # 检查HTTP响应状态码
            if response.status_code == 200:
                print("成功:", response.text)
            else:
                print(f"失败: {response.status_code}, 错误信息: {response.text}")

        except requests.exceptions.RequestException as e:
            print(f"请求发送失败: {e}")

    # 设置 GPT 模型权重
    gpt_weights_url = "http://127.0.0.1:9880/set_gpt_weights"
    gpt_weights_params = {
        "weights_path": "GPT_weights/tomori1-e20.ckpt"
    }

    # 设置 Sovits 模型权重
    sovits_weights_url = "http://127.0.0.1:9880/set_sovits_weights"
    sovits_weights_params = {
        "weights_path": "SoVITS_weights/tomori1_e12_s2664.pth"
    }

    # 发送请求
    send_request(gpt_weights_url, gpt_weights_params)
    send_request(sovits_weights_url, sovits_weights_params)
    ```
3. 接下来就是配置[zhaomaoniu/nonebot-plugin-gpt-sovits](https://github.com/zhaomaoniu/nonebot-plugin-gpt-sovits )了，文档写得蛮清楚的，这里不过多赘述。

## 踩坑
- [zhaomaoniu/nonebot-plugin-gpt-sovits](https://github.com/zhaomaoniu/nonebot-plugin-gpt-sovits )文档里需要填`GPT_SOVITS_EMOTION_MAP`，也给了示例，但我不知道怎么在.env里填不是字符串的东西。于是找到了`.venv/Lib/site-packages/nonebot_plugin_gpt_sovits/config.py`,在那里改，比如我是改成了这样:
    ```python 
    class Config(pydantic.BaseModel):
        gpt_sovits_api_base_url: Optional[str] = "http://127.0.0.1:9880"
        gpt_sovits_api_v2: Optional[bool] = True
        gpt_sovits_command: Optional[str] = "羊姐说话"
        gpt_sovits_convert_to_silk: Optional[bool] = False
        gpt_sovits_emotion_map: Optional[List[Emotion]] = [
            {
                "name": "平静",
                "sentences": [
                    {"text": "凄く苦そうだけど……美味しいじゃあ、どうして……", "language": "ja", "path": "D:\\Project\\NoneBot\\Hesap\\tomori.wav"},
                ]
            }
        ]
        gpt_sovits_args: Optional[dict] = {}
    ```
- `refer_wav_path = sentence.path`得改成`refer_wav_path = sentence["path"]`
- 路径问题，python的`\`是转义符，所以得改成`\\`
- 绕远路
   1. bot能回复我的命令了，但生成出来的声音只是吹气，或者是简单的一个词。虽然音色上有点像了。
   2. 怀疑是爆显存，因为我web没关，但排查后发现不是。
   3. 怀疑是api版本的问题，默认用的是v2。尝试切回v1,结果发现用v1版的更麻烦，于是还是老老实实用v2，也就是[jianchang512/gptsovits-api: 适用于 GPT-SoVITS 的api调用接口](https://github.com/jianchang512/gptsovits-api ),这里的文档相对来说更详细。
   4. 尝试debug[zhaomaoniu/nonebot-plugin-gpt-sovits](https://github.com/zhaomaoniu/nonebot-plugin-gpt-sovits )和[RVC-Boss/GPT-SoVITS: 1 min voice data can also be used to train a good TTS model! (few shot voice cloning)](https://github.com/RVC-Boss/GPT-SoVITS )，其实就是看几个参数变量能不能对得上,没啥结果。
   5. 用postman发了下请求，意外地没问题。然后就发现自己在配置文件的参考音频的路径那少打了一个`\`，:(

## 画饼
### 接入llm
我这个bot主要是想让她来rp高松灯，或者说是rp羊姐。那现在她已经能够发声了，但每次发声还是靠我们给她手动输入的指令。能不能让她接入llm，能比较智能的根据上下文，主动的出来说几句呢？

我在插件商店搜到过几个llm插件，但不少都似乎不可用，也许只是因为版本迭代更新不及时导致的。后面可以尝试下。

### 长文本
接下来就是要解决长文本的问题了。最理想的情况是，我丢一本书进去，直接给我吐生成好的音频。

- [用Python代码调用GPT-SoVITS | 自动老李的博客](https://zidonglaoli.com/c231.html )
- [jianchang512/gptsovits-api: 适用于 GPT-SoVITS 的api调用接口](https://github.com/jianchang512/gptsovits-api )
- [GPT-SoVITS一键配音集成包推出，srt字幕一键配音，可音频转字幕](https://www.bilibili.com/video/BV1DJF6eHE4y ) 这个把我想做的做好了，甚至功能还有溢出。

### 给我的博客也接入
高松灯的一大技能是念诗，我的博客有摘抄些诗词，可以让她念念。