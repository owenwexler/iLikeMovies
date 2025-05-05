import { FC } from 'hono/jsx';

const Logo: FC = () => {
  return (
    <img
      id="logo"
      src="/static/images/iLikeMovies-logo.svg"
      class="mb-2"
      alt="iLikeMovies"
      width={200}
      height={100}
    />
  )
}

export default Logo;

