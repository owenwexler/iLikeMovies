import { FC } from 'hono/jsx';

interface PageCardProps {
  id: string;
  testId: string;
  children: any;
}

const PageCard: FC<PageCardProps> = ({ id, testId, children }) => {
  return (
    <div 
      id={id}
      data-testid={testId}
      class="flex flex-col max-sm:flex-col max-sm:text-center mb-4 space-y-4 bg-orange-900 border border-white text-white rounded-md p-4 w-2/6 max-sm:w-5/6 [1024px]:w-1/2"
    >
      {children}
    </div>
  )
}

export default PageCard;
