import Koa from 'koa';
import { Readable } from 'stream';
const app = new Koa();

app.use(async ctx => {
    const url = ctx.request.path.replace('/dl/', '');
    console.log(url)
    if (url.startsWith('http://') || url.startsWith('https://')) {
        const response = await fetch(url);
        response.headers.forEach((value, name) => {
            ctx.set(name, value);
        });
        ctx.body = Readable.fromWeb(response.body);
    } else {
        ctx.body = '用法 xxx.com/dl/https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png'
    }
});

app.listen(3000);