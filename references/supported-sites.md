# Supported Sites

Current product-facing site groups:

## Public forums and knowledge

- `reddit.com`
  - Prefer public subreddit and thread JSON endpoints
- `stackoverflow.com`
- `serverfault.com`
- `superuser.com`
- `unix.stackexchange.com`
- `dba.stackexchange.com`
  - Prefer static question pages and `StackPrinter`

## Research and model hubs

- `arxiv.org`
  - Prefer `/abs/<id>`
- `huggingface.co`
  - Prefer public model pages

## Official docs

- `docs.python.org`
- `learn.microsoft.com`
- `react.dev`

## General public content

- `youtube.com/watch`
- `bbc.com/news/articles`
- `mp.weixin.qq.com/s`
- `*.wikipedia.org/wiki`

## Experimental

- `bilibili.com/video`
  - Current best path is a controlled `Tier 1.5` extractor backend
  - Treat as experimental and avoid upgrading this to a blanket site promise

