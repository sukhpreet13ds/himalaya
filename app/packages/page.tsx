import type {Metadata} from 'next';
import {ScenicImage,Adventure} from '@/components/sections';
import {PackageExplorer} from '@/components/package-explorer';
export const metadata: Metadata = {
  title: 'All Travel Packages | HimalayaHikes',
  description:
    'Explore Himalayan trekking adventures and holiday packages with HimalayaHikes. Discover Manali, Kasol, Chopta, Hampta Pass, Jibhi and more. Plan your trip today!'
};
export default function Packages(){return <><section className="page-banner"><ScenicImage imageKey="hampta" priority/><div className="banner-shade"/><div className="wrap"><span className="eyebrow light">GO WHERE YOU FEEL ALIVE</span><h1>Find your next escape.</h1><p>Nine destinations. Endless reasons to get going.</p></div></section><section className="section"><div className="wrap"><PackageExplorer/></div></section><Adventure/></>}
