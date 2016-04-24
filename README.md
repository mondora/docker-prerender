# prerender docker image

This image aims to give an easy way to run a prerender server. It's ideal to be
used in environments such as Amazon ECS or Docker Cloud.

## Usage

Just add the container in your task / topology definition. Then link to it the
front-end container, making the prerender middleware point at
`http://prerender-container-address:3000`.

Minimal docker example (supposing the front-end is served by nodejs using the
`prerender-node` middleware):

```sh
docker run -d --name prerender mondora/prerender
docker run -d --name frontend \
    --link prerender:prerender \
    -e PRERENDER_SERVICE_URL="http://prerender:3000/"
    mycomp/myapp
```

## Configuration

The server can be configured via the following environment variables:

* `ALLOWED_DOMAINS`: a comma-separated list of domains for which you want to
  allow requests. Requests for other domains will result in a 404. Example:
  `mysite.com,www.mysite.com`

* `BLACKLISTED_DOMAINS`: a comma-separated list of domains for which you want to
  disallow requests. Requests for this domains will result in a 404. Example:
  `yahoo.com,www.google.com`. _Note: this option is moot if `ALLOWED_DOMAINS`
  is specified_

* `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`, `S3_BUCKET_NAME`,
  `S3_PREFIX_KEY`: variables used to configure the
  [s3HtmlCache](https://git.io/vw0C5) prerender plugin. `AWS_ACCESS_KEY_ID`,
  `AWS_SECRET_ACCESS_KEY` and `S3_BUCKET_NAME` are required, otherwise the
  [inMemoryHtmlCache](https://git.io/vw0CN) plugin will be used.
