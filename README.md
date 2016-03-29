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

None yet. The goal is to add at least a configuration option to cache renderings
in S3.
