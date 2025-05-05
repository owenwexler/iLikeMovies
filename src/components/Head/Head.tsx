import type { FC } from 'hono/jsx';

interface HeadProps {
  title: string;
}

const Head: FC<HeadProps> = ({ title }) => {
  return (
    <head>
      <meta charset="utf-8" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <meta name="viewport" content="width=device-width" />
      <script defer src="/static/lib/htmx/htmx2.0.4.js"></script>
      <script defer src="/static/lib/alpine/alpine3.min.js"></script>
      <link rel="stylesheet" href="/static/css/output.css" />
      <title>{title}</title>
    </head>
  );
}

export default Head;

