import { FC } from 'hono/jsx';

interface SpacerProps {
  topMargin: number;
}

const Spacer: FC<SpacerProps> = ({ topMargin }) => {
  return (
    <div class={`mt-${topMargin} p-4`}>
    </div>
  )
}

export default Spacer;
