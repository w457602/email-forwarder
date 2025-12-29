# Email Forwarder Worker

轻量级 Cloudflare Worker，用于接收邮件并转发到统一的 mail-api 后端。

## 🚀 一键部署

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/YOUR_USERNAME/email-forwarder)

> **注意**: 部署前请先 Fork 此仓库到您自己的 GitHub 账号，然后修改上方链接中的 `YOUR_USERNAME`。

## 📋 部署后配置

### 1️⃣ 设置 API Key

部署完成后，需要设置 API Key：

**方式一：使用 Wrangler CLI**
```bash
npx wrangler secret put API_KEY
# 输入您在 mail-inbox 设置页面获取的 API Key
```

**方式二：在 Dashboard 设置**
1. 进入 [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Workers & Pages → 选择 `email-forwarder`
3. Settings → Variables → Add variable
4. Name: `API_KEY`, Type: `Encrypt`, Value: 您的 API Key

### 2️⃣ 配置 Email Routing

1. 在 Cloudflare Dashboard 选择您的域名
2. Email → Email Routing → Enable
3. 添加规则：Catch-all → Send to Worker → `email-forwarder`

## 🔧 手动部署

如果一键部署不可用，可以手动部署：

```bash
# 克隆仓库
git clone https://github.com/YOUR_USERNAME/email-forwarder.git
cd email-forwarder

# 安装依赖
npm install

# 登录 Cloudflare
npx wrangler login

# 部署
npx wrangler deploy

# 设置 API Key
npx wrangler secret put API_KEY
```

## 📁 项目结构

```
email-forwarder/
├── src/
│   └── index.ts      # Worker 主代码
├── wrangler.toml     # 配置文件
├── package.json
└── README.md
```

## ⚙️ 环境变量

| 变量名 | 类型 | 说明 |
|--------|------|------|
| `API_URL` | 公开 | mail-api 后端地址 (默认已配置) |
| `API_KEY` | 加密 | 用户的 API Key (需手动设置) |

## 🔍 调试

查看 Worker 日志：
```bash
npx wrangler tail
```

## 📄 License

MIT
