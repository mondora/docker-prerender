const prerender = require("prerender");

const server = prerender({});
server.use(prerender.sendPrerenderHeader());
server.use(prerender.removeScriptTags());
server.use(prerender.whitelist());
server.use(prerender.blacklist());
if (
    process.env.AWS_ACCESS_KEY_ID &&
    process.env.AWS_SECRET_ACCESS_KEY &&
    process.env.S3_BUCKET_NAME
) {
    server.use(prerender.s3HtmlCache());
} else {
    server.use(prerender.inMemoryHtmlCache());
}
server.start();
