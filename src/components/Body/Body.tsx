import type { FC } from 'hono/jsx';
import Header from '../Header';

interface BodyProps {
  children: any; // TODO: figure out how Hono types children
}

const Body: FC<BodyProps> = ({ children }) => {
  return (
    <body class="bg-gradient-to-r from-[#020e33] to-[#02185c]">
      { children }
    </body>
  )
}

export default Body;
