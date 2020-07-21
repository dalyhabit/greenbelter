import { opine, serveStatic, request, response } from 'https://deno.land/x/opine@main/mod.ts';
import * as path from "https://deno.land/std/path/mod.ts";
import { __ } from 'https://deno.land/x/dirname/mod.ts';
const { __filename, __dirname } = __(import.meta);

const app = opine();

app.use(serveStatic(__dirname + '/../client/dist'));

type allowedUrlsType = {
    '/': boolean;
    '/hill-of-life': boolean;
    '/sculpture-falls': boolean;
    '/twin-falls': boolean;
    '/gus-fruh': boolean;
    '/campbells-hole': boolean;
    '/the-flats': boolean;
    '/barton-springs': boolean;
    '/lost-creek': boolean;
    '/loop-360': boolean;
    '/above-barton-springs': boolean;
};

const allowedUrls: allowedUrlsType = {
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

app.get('/*', async function(req: typeof request, res: typeof response) {
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