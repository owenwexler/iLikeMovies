import Spacer from './components/style/Spacer';
import AddMovie from './components/AddMovie/AddMovie';
import FilterForm from './components/FilterForm/FilterForm';
import Navbar from './components/Navbar/Navbar';
import Logo from './components/style/Logo';
import { Hono } from 'hono';
import { serveStatic } from 'hono/bun';
import partialsRoute from './routes/partialsRoute';
import apiRoute from './routes/apiRoute';
import Head from './components/Head/Head';
import Body from './components/Body/Body';
import { html } from 'hono/html';
import { getCurrentUserId } from './helper/getCurrentUserId';

const app = new Hono();

app.use('/static/*', serveStatic({ root: './' }))

app.route('/partials', partialsRoute);
app.route('/api', apiRoute);

app.get('/', async (c) => {
  const userId = getCurrentUserId();
  return c.html(
    <html lang="en">
      <Head title="iLikeMovies"/>
      <Body>
        <Navbar>
          <Logo />
          <AddMovie userId={userId} />
          <div 
            id="filter-form"
            hx-get="/partials/reset-filter-form"
            hx-replace="innerHTML"
            hx-trigger="click from:#add-movie-submit"
          >
            <FilterForm userId={userId} />
          </div>
        </Navbar>
        <p class="pt-14"></p>
        <p class="pt-14"></p>
        <p class="md:hidden pt-14"></p>
        <div 
          id="movie-list-container"
          hx-get={`/partials/user/movies/${userId}`}
          hx-trigger="load"
          class="flex flex-col items-center justify-center text-center"
        >
        </div>
      </Body>
    </html>
  );
});

export default app;

