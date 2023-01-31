ARG NODE_VERSION=16.18
ARG ALPINE_VERSION=3.15

FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS deps
RUN apk add --no-cache rsync libc6-compat

WORKDIR /workspace-install

COPY yarn.lock .yarnrc.yml ./
COPY .yarn/ ./.yarn/

RUN --mount=type=bind,target=/docker-context \
    rsync -amv --delete \
          --exclude='node_modules' \
          --exclude='*/node_modules' \
          --include='package.json' \
          --include='*/' --exclude='*' \
          /docker-context/ /workspace-install/;

RUN --mount=type=cache,target=/root/.yarn3-cache,id=yarn3-cache \
    YARN_CACHE_FOLDER=/root/.yarn3-cache \
    yarn install --immutable --inline-builds

FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS develop

RUN apk add --no-cache libc6-compat

ENV NODE_ENV=development

WORKDIR /app

COPY --from=deps /workspace-install ./

CMD ["yarn", "dev"]