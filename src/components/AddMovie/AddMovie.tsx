import { FC } from 'hono/jsx';
import { html } from 'hono/html';
import { inputClasses } from '../style/twClasses/inputClasses';
import { buttonClasses } from '../style/twClasses/buttonClasses';

interface AddMovieProps {
  userId: string;
}

const AddMovie: FC<AddMovieProps> = ({ userId }) => {
  return (
    <>
        <form
          id="add-movie-form"
          hx-post={`/partials/user/add-movie/${userId}`}
          hx-target="#movie-list-container"
          hx-replace="innerHTML"
          hx-boost="true"
        >
          <div class="flex flex-row items-start justify-around space-x-2"> 
            <input id="add-movie-input" name="movieTitle" class={inputClasses} />
            <button id="add-movie-submit" type="submit" class={buttonClasses}>Add Movie</button>
          </div>
        </form>
    </>
  )
}

export default AddMovie;
