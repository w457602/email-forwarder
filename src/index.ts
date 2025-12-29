/**
 * Email Forwarder Worker
 * 
 * 轻量级 Worker，只负责接收邮件并转发到统一的 mail-api 后端
 * 
 * 部署到每个 CF 账户，配合 Email Routing 使用:
 * 1. 部署此 Worker
 * 2. 配置 Email Routing: catch-all → 此 Worker
 * 3. 在 mail-api 后端添加域名
 */

export interface Env {
    API_URL: string;
    API_KEY: string;
}

export default {
    async email(message: ForwardableEmailMessage, env: Env): Promise<void> {
        try {
            // 读取原始邮件内容
            const rawEmail = await streamToString(message.raw);

            // 转发到 mail-api
            const response = await fetch(`${env.API_URL}/api/mail/ingest`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-Key': env.API_KEY,
                },
                body: JSON.stringify({
                    from: message.from,
                    to: message.to,
                    raw: rawEmail,
                }),
            });

            if (!response.ok) {
                console.error(`Failed to forward email: ${response.status}`);
            }
        } catch (error) {
            console.error('Error forwarding email:', error);
        }
    },
};

// 将 ReadableStream 转换为字符串
async function streamToString(stream: ReadableStream): Promise<string> {
    const reader = stream.getReader();
    const decoder = new TextDecoder();
    let result = '';

    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        result += decoder.decode(value, { stream: true });
    }

    return result;
}
