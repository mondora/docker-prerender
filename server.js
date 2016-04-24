const prerender = require("prerender");

const server = prerender({});

// Essential plugins
server.use(prerender.sendPrerenderHeader());
server.use(prerender.removeScriptTags());

// Whitelist and blacklist
if (process.env.ALLOWED_DOMAINS) {
    server.use(prerender.whitelist());
}
if (process.env.BLACKLISTED_DOMAINS) {
    server.use(prerender.blacklist());
}

// Html cache
if (
    process.env.AWS_ACCESS_KEY_ID &&
    process.env.AWS_SECRET_ACCESS_KEY &&
    process.env.S3_BUCKET_NAME
) {
    server.use(prerender.s3HtmlCache());
} else {
    server.use(prerender.inMemoryHtmlCache());
}

// Start
server.start();
