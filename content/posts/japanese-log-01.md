---
title: "Japanese Log 01"
date: 2021-05-12T20:55:24-04:00
categories:
- Japanese
tags:
- Language
---

こんいちわ、「DILLON」です。 (I don't know how to type Katakana yet, lol)

I'm a bit into a month and a half of Duolingo and it's starting to become a little annoying, but I can't say it taught me nothing. This is contrary to what most people say on the internet about Duolingo as a language learning tool. I know it's not a lot, but I can already recognize simple kanji (e.g., 何、今、寿司、行く) that are used pretty frequently. I also ended up learning Hiragana by brute force, basically. At this point, the vocab that uses Katakana isn't a whole lot, so I've been making do with guessing the right answer based on knowledge of a few katakana characters, + length of the word. 

I just failed to make it past the Amythyst league and into the Pearl league, so I may as well just quit now (shrug emoji). 

I have also briefly looked Genki and to be honest, I'm not very impressed. It's not that I can read everything in Genki, but it didn't seem fun or interesting so I have stopped using it. I infrequently consult it for when I come across grammar points. I like Tae Kim's guide to Japanese Grammar a lot more, though. 

I tried to jump into reading a "simple" manga that I already know the basic premise of (からかい上手のたかぎさｎ, _Teasing Master Takagi-san_) and basically gave up after a few pages. I still find it hard to tell when one word starts or ends (though Tae Kim's exposition on particles has helped tremendously), and the ways to end a sentence still confuse me (e.g., だ as a possible replacement for です, but not always? Or さ as a sentence ender to make it sound more masculine, or ending questions with の somehow makes it more childish or feminine).

If you were to rank my weeb-ness between _hasn't heard of Dragon Ball_ to _has waifu body pillows_, I'd put myself much closer to the non-weeb side, but I grew up watching shit like Naruto and Bleach and still watch the occasional anime. My anime obsession was kicked into high gear recently though, and my lack of Japanese reading skills (that would unlock the most recent untranslated light novels ...) spurred me to learn Japanese "for real".

I wouldn't consider myself a language guy by any means. I learned some French in highschool, but that's about it. I did realize that I learned nothing from the grammar lessons and everything I know is probably from being immersed in French (the Extended French program here in Ontario makes you take about half your classes in French starting from Grade 4, until Grade 10 or so). That is a big part of what drew me to the "immersion learning" techniques I learned about from Matt VS Japan. 

I have a tendency to work hard on something for 1 - 3 months and burn out uneventfully. This _has_ to be a long haul thing, so I can't just grind Duolingo for hours like I did on week 1. For now, I plan on continuing to Duolingo (though it's basically just to stay / advance in the leagues) but have also started using Refold's JP1k Anki deck -- an Anki deck that's supposed to teach you around 1000 common words as they are most commonly written (e.g., some cards are kana if the word is usually written in kana). I also have been liking バイリンガルニュース (_Bilingual News_), a weekly podcast where the two hosts introduce topics in both Japanese and English, and discuss them afterwards (also bilingual). It does tend to learn more on the English side in the discussions, but I like being able to pick out words I've learned while also being able to understand anything at all from the English host. 

And by the way, setting up CJK input is a huge pain in the ass. For you stubborn NixOS + Wayland users out there, this is about all the knowledge I can offer. 

Set `fcitx` and `mozc` as language inputs in `/etc/nixos/configuration.nix`

```
{ config, pkgs, ... }
{
    ...
    i18n.inputMethod.enabled = "fcitx";
    i18n.inputMethod.fcitx.engines = with pkgs.fcitx-engines; [ mozc ];
    ...
}
```

I also have a `startw` script I use to launch Sway. 

```
#!/bin/sh

export MOZ_ENABLE_WAYLAND=1
export QT_QPA_PLATFORM="wayland"
export EDITOR="nvim"
export GTK_IM_MODULE="fcitx"
export QT_IM_MODULE="fcitx"
export XMODIFIERS="@im=fcitx"
fcitx &
sway
```

I think this should get you most of the way there. With this, I can type `ctrl+space` and see the language input change in applications like Firefox (cuz qt?). Pro tip: configure the font to be bigger than 0 ... (facepalm).

For terminal input, I have yet to find a satisfactory way to input CJK. The closest I got is that for some reason, `termite` works with `fcitx4`. Setting `GLFW_IM_MODULE="ibus"` and using `fcitx5` with `fcitx5-mozc` shows input switching in `Kitty`, but I get `Mozc (unavailable)`, so I suspect that has something to do with `fcitx5`. My version of Sway is also too old, so I don't have the patch that allows it to work with terminals like `foot`. 

If you are also on NixOS and / or Wayland -- がんばって!

It would also be very cool to somehow track progress on my Japanese learning. The closest thing I have would be to export Anki stats, but maybe periodic blog posts would also be good.
