import React from 'react';

import { GlobeIcon } from '@radix-ui/react-icons';
import { BehanceIcon } from '@/shared/ui/icons/behance';
import { TelegramIcon } from '@/shared/ui/icons/telegram';
import { VkIcon } from '@/shared/ui/icons/vk';
import { DribbbleIcon } from '@/shared/ui/icons/dribbble';
import { FacebookIcon } from '@/shared/ui/icons/facebook';
import { GithubIcon } from '@/shared/ui/icons/github';
import { InstagramIcon } from '@/shared/ui/icons/instagram';
import { LinkedInIcon } from '@/shared/ui/icons/linkedin';
import { TiktokIcon } from '@/shared/ui/icons/tiktok';
import { YoutubeIcon } from '@/shared/ui/icons/youtube';
import { XIcon } from '@/shared/ui/icons/x';

export const getIconForLink = (link) => {
  if (link.includes('behance.com')) return <BehanceIcon />;
  if (link.includes('dribbble.com')) return <DribbbleIcon />;
  if (link.includes('facebook.com')) return <FacebookIcon />;
  if (link.includes('github.com')) return <GithubIcon />;
  if (link.includes('instagram.com')) return <InstagramIcon />;
  if (link.includes('linkedin.com')) return <LinkedInIcon />;
  if (link.includes('tiktok.com')) return <TiktokIcon />;
  if (link.includes('vk.com')) return <VkIcon />;
  if (link.includes('youtube.com')) return <YoutubeIcon />;
  if (link.includes('x.com')) return <XIcon />;
  if (link.includes('t.me') || link.includes('telegram.me'))
    return <TelegramIcon />;
  return <GlobeIcon width='24' height='20' />;
};
