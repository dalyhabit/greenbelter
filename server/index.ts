import { opine, serveStatic, path, __ } from './deps.ts';
import { AllowedUrlsType, RequestType, ResponseType } from './types.ts';

const { __dirname } = __(import.meta);
const app = opine();

const allowedUrls: AllowedUrlsType = {
    '/': true,
    '/hill-of-life': true,
    '/sculpture-falls': true,
    '/twin-falls': true,
    '/gus-fruh': true,
    '/campbells-hole': true,
    '/the-flats': true,
    '/barton-springs': true,
    '/lost-creek': true,
    '/loop-360': true,
    '/above-barton-springs': true
};

app.use(serveStatic(__dirname + '/../client/dist'));

app.get('/robots.txt', async function(req: RequestType, res: ResponseType) {
    try {
        await res.sendFile(path.join(__dirname + '../client/dist/robots.txt'))
    } catch(err) {
        if (err && res && res.status) {
            res.status = 500;
            res.send(err);
        }
    }
})

app.get('/*', async function(req: RequestType, res: ResponseType) {
    if (!allowedUrls.hasOwnProperty(req.url)) {
        res.redirect('/');
    } else {
        try {
            await res.sendFile(path.join(__dirname + '/../client/dist/index.html'))
        } catch(err) {
            if (err && res && res.status) {
                res.status = 500;
                res.send(err);
            }
        }
    }
});

app.listen(3000);
console.log("Opine started on port 3000");