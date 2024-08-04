import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/shared/ui/hover-card';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import { memo } from 'react';

export const DescriptionMarkdownGuide = memo(() => (
  <div className='absolute bottom-1 right-3'>
    <HoverCard>
      <HoverCardTrigger className='text-xs underline cursor-help'>
        Markdown guide
      </HoverCardTrigger>
      <HoverCardContent>
        <ul>
          <li className='flex gap-2 items-center'>
            *italic* <ArrowRightIcon className='h-4 w-4' /> <em>italic</em>
          </li>
          <li className='flex gap-2 items-center'>
            **bold** <ArrowRightIcon className='h-4 w-4' />{' '}
            <strong>bold</strong>
          </li>
          <li className='flex gap-2 items-center'>
            [link](http://link.com) <ArrowRightIcon className='h-4 w-4' />{' '}
            <a
              className='underline'
              href='http://link.com'
              target='_blank'
              rel='noopener noreferrer'
            >
              link
            </a>
          </li>
        </ul>
      </HoverCardContent>
    </HoverCard>
  </div>
));

DescriptionMarkdownGuide.displayName = 'DescriptionMarkdownGuide';
