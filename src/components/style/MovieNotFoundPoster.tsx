import { FC } from 'hono/jsx';

const MovieNotFoundPoster: FC = () => {
  return (
    <div class="h-[100px] w-[75px] flex flex-col items-center justify-center text-center bg-blue-400">
      <p class="text-white text-xs">NO</p>
      <p class="text-white text-xs">POSTER</p>
      <p class="text-white text-xs">FOUND</p>
    </div>
  )
}

export default MovieNotFoundPoster;
