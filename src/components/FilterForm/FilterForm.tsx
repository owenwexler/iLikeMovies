import { FC } from 'hono/jsx';
import { html } from 'hono/html';

interface FilterFormProps {
  userId: string;
}

const FilterForm: FC<FilterFormProps> = ({ userId }) => {
  return (
    <>
      <fieldset>
          <div class="flex flex-row items-center justify-center space-x-3">
            <div class="flex flex-row items-center justify-center space-x-2">
              <input 
                type="radio"
                id="movie-filter-all" 
                name="filter" 
                value="all" 
                checked
                hx-get={`/partials/user/movies/${userId}`}
                hx-target="#movie-list-container"
                hx-trigger="click"
                hx-replace="innerHTML"
                hx-boost="true"
              />
              <label id="label-all" for="all" class="text-xl max-sm:text-sm text-white font-bold">All Movies</label>
            </div>

            <div class="flex flex-row items-center justify-center space-x-2">
              <input 
                type="radio"
                id="movie-filter-watched" 
                name="filter" 
                value="watched" 
                hx-get={`/partials/user/movies/${userId}?filter=watched`}
                hx-target="#movie-list-container"
                hx-trigger="click"
                hx-replace="innerHTML"
                hx-boost="true"
              />
              <label id="label-watched" for="watched" class="text-xl max-sm:text-sm text-white font-bold">Watched</label>
            </div>

            <div class="flex flex-row items-center justify-center space-x-2">
              <input 
                type="radio"
                id="movie-filter-unwatched" 
                name="filter" 
                value="unwatched" 
                hx-get={`/partials/user/movies/${userId}?filter=unwatched`}
                hx-target="#movie-list-container"
                hx-trigger="click"
                hx-replace="innerHTML"
                hx-boost="true"
              />
              <label id="label-unwatched" for="unwatched" class="text-xl max-sm:text-sm text-white font-bold">To Watch</label>
            </div>
          </div>
      </fieldset>
    </>
  )
}

export default FilterForm;
