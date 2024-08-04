import { FONTS, getIconForLink, THEMES } from '@/entities/Website';
import { createClient } from '@/shared/lib/supabase/server';
import { Button } from '@/shared/ui/button';
import { MarkdownViewer } from '@/shared/ui/markdown-viewer';
import { Avatar } from '@radix-ui/react-avatar';
import clsx from 'clsx';
import Image from 'next/image';

async function getWebsiteData() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw error;
  }

  const { data: website, error: websiteError } = await supabase
    .from('websites')
    .select(`*`)
    .eq('id', data.user.id)
    .single();

  if (websiteError) {
    throw websiteError;
  }

  return website;
}

export default async function Demo() {
  const { photo_url, title, description, font, theme, links } =
    await getWebsiteData();
  const { className } = FONTS[font];
  const {
    name,
    background,
    text,
    accent,
    accentText,
    hoverAccent,
    hoverAccentText,
  } = THEMES.find(({ name }) => name === theme) || THEMES[0];

  const isWhiteOrBlack = ['White', 'Black'].includes(name);

  return (
    <main
      className={clsx(className, 'px-6 py-10 min-h-screen', text, background)}
    >
      {photo_url ? (
        <div className='avatar h-24 w-24'>
          <Avatar>
            <Image width={96} height={96} src={photo_url} alt='User Avatar' />
          </Avatar>
        </div>
      ) : null}
      {title ? <h1 className='text-3xl font-bold mt-5'>{title}</h1> : null}
      {description ? (
        <MarkdownViewer className='mt-2' content={description} />
      ) : null}
      <div className='mt-5 flex gap-2'>
        {(links || []).map((link) => (
          <Button
            key={link}
            size='icon'
            variant={isWhiteOrBlack ? 'outline' : 'default'}
            className={clsx(
              isWhiteOrBlack
                ? 'bg-transparent'
                : `${accent} ${accentText} ${hoverAccent} ${hoverAccentText}`
            )}
          >
            {getIconForLink(link)}
          </Button>
        ))}
      </div>
      {/* <Button
        className={clsx(
          'mt-5 font-bold text-base',
          isWhiteOrBlack
            ? 'bg-transparent'
            : `${accent} ${accentText} ${hoverAccent} ${hoverAccentText}`
        )}
        size='lg'
        variant={isWhiteOrBlack ? 'outline' : 'default'}
      >
        Click Me
      </Button> */}
    </main>
  );
}
