import {
  Roboto,
  Open_Sans,
  Montserrat,
  Inter,
  Noto_Sans,
  Raleway,
  Rubik,
  Mulish,
  PT_Serif,
  Jost,
} from 'next/font/google';
import { Fonts, NextFont } from '../types';

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const openSans = Open_Sans({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const montserrat = Montserrat({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const inter = Inter({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const notoSans = Noto_Sans({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const raleway = Raleway({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const rubik = Rubik({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const mulish = Mulish({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const ptSerif = PT_Serif({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const jost = Jost({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const FONTS: Record<Fonts, NextFont> = {
  Roboto: roboto,
  'Open Sans': openSans,
  Montserrat: montserrat,
  Inter: inter,
  'Noto Sans': notoSans,
  Raleway: raleway,
  Rubik: rubik,
  Mulish: mulish,
  'PT Serif': ptSerif,
  Jost: jost,
};
