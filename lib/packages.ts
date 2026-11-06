export type Brochure = {
  title: string;
  file: string;
  duration?: string;
};

export type Package = {
  slug: string;
  name: string;
  region: string;
  category: 'Mountain Escapes' | 'Treks & Trails' | 'Royal Rajasthan';
  imageKey: string;
  tagline: string;
  overview: string;
  highlights: string[];
  brochures?: Brochure[];
  duration?: string;
};

export const packages: Package[] = [
  {
    slug: 'chopta-tungnath',
    name: 'Chopta - Tungnath',
    region: 'Uttarakhand',
    category: 'Treks & Trails',
    imageKey: 'chopta',
    tagline: 'Follow the trail to a higher kind of happiness.',
    overview: "Chopta's alpine meadows and lush forests lead towards the ancient mountain shrine of Tungnath and Chandrashila peak. This Garhwal escape pairs gentle trails with sweeping Himalayan panoramas.",
    highlights: [
      'Lush alpine meadows of Chopta & Deoria Tal',
      'Scenic trail towards Tungnath Temple and Chandrashila peak',
      'Garhwal Himalayan panoramas & sunrise vistas',
      'Forest camping, alpine photography, and serene starlit skies'
    ],
    duration: '3N/4D',
    brochures: [
      {
        title: 'Chopta Tungnath Trek Detailed Itinerary',
        file: '/brochures/chopta-tungnath.pdf',
        duration: '3N/4D'
      }
    ]
  },
  {
    slug: 'manali-kasol',
    name: 'Manali - Kasol',
    region: 'Himachal Pradesh',
    category: 'Mountain Escapes',
    imageKey: 'manali',
    tagline: 'Pine-scented air. Riverside days. Mountain magic.',
    overview: 'From the mountain-town charm of Manali to the riverside tranquility of Kasol, experience the vibrant contrast of Himachal Pradesh. Discover forested slopes, panoramic Himalayan vistas, and peaceful valley moments.',
    highlights: [
      'Scenic valley drives through Kullu & Atal Tunnel',
      'Riverside atmosphere and vibrant cafes of Kasol & Old Manali',
      'Pine forests, Solang Valley excursions, and mountain trails',
      'Authentic Himachali culture, hot springs, and local life'
    ],
    duration: '2N/3D & 3N/4D',
    brochures: [
      {
        title: 'Manali Kasol 3N4D Complete Itinerary',
        file: '/brochures/manali-kasol-3n4d.pdf',
        duration: '3N/4D'
      },
      {
        title: 'Manali Express 2N3D Itinerary',
        file: '/brochures/manali-2n3d.pdf',
        duration: '2N/3D'
      }
    ]
  },
  {
    slug: 'udaipur-mount-abu-kumbhalgarh',
    name: 'Udaipur - Mount Abu / Kumbhalgarh',
    region: 'Rajasthan',
    category: 'Royal Rajasthan',
    imageKey: 'udaipur',
    tagline: 'Lakeside sunsets and stories written in stone.',
    overview: 'Journey through the regal heritage of Rajasthan: from the romantic lakes and palaces of Udaipur to the serene hill trails of Mount Abu and the monumental ramparts of Kumbhalgarh Fort.',
    highlights: [
      "Udaipur's iconic Lake Pichola, City Palace, and sunset boat rides",
      'Cool breezes, Nakki Lake, and hill scenery of Mount Abu',
      'Historic Great Wall ramparts of Kumbhalgarh Fort',
      'Vibrant Rajasthani culinary tours, arts, architecture, and folklore'
    ],
    duration: '4N/5D',
    brochures: [
      {
        title: 'Udaipur Royal Tour Detailed Itinerary',
        file: '/brochures/udaipur.pdf',
        duration: '4N/5D'
      }
    ]
  },
  {
    slug: 'hampta-pass',
    name: 'Hampta Pass',
    region: 'Himachal Pradesh',
    category: 'Treks & Trails',
    imageKey: 'hampta',
    tagline: 'One trail. A world of dramatic landscapes.',
    overview: 'Hampta Pass offers an unforgettable crossover trek, bridging the lush green Kullu Valley with the stark, dramatic expanse of Lahaul. Traverse alpine meadows, cross mountain streams, and marvel at towering peaks.',
    highlights: [
      'Dramatic crossover landscape between Kullu and Lahaul',
      'Alpine meadows of Balu Ka Ghera & mountain stream crossings',
      'High-altitude camping at Shea Goru & Chandratal Lake visit',
      'Towering Himalayan glaciers and panoramic ridge walks'
    ],
    duration: '4N/5D',
    brochures: [
      {
        title: 'Hampta Pass Trek Itinerary',
        file: '/brochures/hampta-pass.pdf',
        duration: '4N/5D'
      }
    ]
  },
  {
    slug: 'kasol-kheerganga',
    name: 'Kasol - Kheerganga',
    region: 'Himachal Pradesh',
    category: 'Treks & Trails',
    imageKey: 'kasol',
    tagline: 'Riverside beginnings. Unforgettable trails.',
    overview: 'Discover the natural charm of Parvati Valley in Kasol before embarking on the scenic mountain trail to Kheerganga. Follow rushing rivers through pine woodlands and soothing natural hot springs framed by majestic peaks.',
    highlights: [
      'Enchanting landscapes and apple orchards of Parvati Valley',
      'Riverside cafe culture and flea markets of Kasol',
      'Forested trail through Nakthan and Rudranag waterfalls',
      'Natural sulphur hot springs at the summit of Kheerganga'
    ],
    duration: '2N/3D',
    brochures: [
      {
        title: 'Kasol & Kheerganga Trek Itinerary',
        file: '/brochures/manali-kasol-3n4d.pdf',
        duration: '2N/3D'
      }
    ]
  },
  {
    slug: 'jibhi-tirthan-valley',
    name: 'Jibhi - Tirthan',
    region: 'Himachal Pradesh',
    category: 'Mountain Escapes',
    imageKey: 'jibhi',
    tagline: 'Find your own peaceful corner of the Himalayas.',
    overview: 'Wooded hillsides, traditional wooden architecture, and crystalline streams define Jibhi and the pristine Tirthan Valley. Embrace a slower travel rhythm surrounded by pine forests, waterfalls, and warm mountain hospitality.',
    highlights: [
      'Charming wooded village setting and stream-side cottages of Jibhi',
      'Crystal-clear waters and trout streams of Tirthan Valley',
      'Excursions to Jalori Pass, Serolsar Lake, and Chehni Kothi',
      'Unhurried nature walks, pine forest trails, and local Himachali food'
    ],
    duration: '3N/4D',
    brochures: [
      {
        title: 'Jibhi Tirthan Valley Itinerary',
        file: '/brochures/jibhi-tirthan.pdf',
        duration: '3N/4D'
      }
    ]
  },
  {
    slug: 'jaisalmer',
    name: 'Jaisalmer',
    region: 'Rajasthan',
    category: 'Royal Rajasthan',
    imageKey: 'jaisalmer',
    tagline: 'Golden sands. Timeless stories.',
    overview: 'Step into a world of golden sandstone architecture and open desert horizons. From the living fort and winding alleys of the Golden City to sunsets over the Thar Desert dunes, experience Rajasthan in pure wonder.',
    highlights: [
      'Golden Fort (Sonar Qila) living ramparts and ancient Havelis',
      'Sunset camel safari and dune bashing at Sam Sand Dunes',
      'Traditional Rajasthani folk music, Kalbelia dance, and desert camps',
      'Starlit desert dining under endless open skies'
    ],
    duration: '2N/3D',
    brochures: [
      {
        title: 'Jaisalmer Itinerary HIMALAYA HIKES 2N 3D',
        file: '/brochures/jaisalmer.pdf',
        duration: '2N/3D'
      }
    ]
  },
  {
    slug: 'chakrata',
    name: 'Chakrata',
    region: 'Uttarakhand',
    category: 'Mountain Escapes',
    imageKey: 'chakrata',
    tagline: 'A quieter corner of the mountains.',
    overview: "Escape the crowds and immerse yourself in Chakrata's serene deodar-covered hills and panoramic views. This tranquil Uttarakhand retreat is tailor-made for unhurried nature walks and crisp mountain air.",
    highlights: [
      'Dense ancient deodar forests and peaceful forest trails',
      'Spectacular Tiger Falls hike and picnic spot',
      'Panoramic Himalayan viewpoints from Chilmiri Neck',
      'Pristine landscapes of Jaunsar-Bawar away from commercial crowds'
    ],
    duration: '1N/2D',
    brochures: [
      {
        title: 'Chakrata 1N/2D Itinerary',
        file: '/brochures/chakrata.pdf',
        duration: '1N/2D'
      }
    ]
  },
  {
    slug: 'mcleodganj',
    name: 'Mcleodganj',
    region: 'Himachal Pradesh',
    category: 'Mountain Escapes',
    imageKey: 'mcleodganj',
    tagline: 'Monasteries, mountain trails, and misty pine ridges.',
    overview: 'Experience the serene Tibetan culture, prayer flags fluttering in the mountain breeze, and scenic trails like Triund in Mcleodganj and Dharamshala.',
    highlights: [
      'Scenic trail towards Triund and panoramic Dhauladhar views',
      'Namgyal Monastery & Tsuglagkhang Complex',
      'Bhagsunag Waterfall and tranquil mountain cafes',
      'Tibetan handicrafts, local cuisine, and serene mountain sunsets'
    ],
    duration: '2N/3D',
    brochures: [
      {
        title: 'Mcleodganj Tour Itinerary',
        file: '/brochures/mcleodganj.pdf',
        duration: '2N/3D'
      }
    ]
  },
  {
    slug: 'harshil-valley',
    name: 'Harshil Valley',
    region: 'Uttarakhand',
    category: 'Mountain Escapes',
    imageKey: 'harshil',
    tagline: 'Where the river leads you to peace.',
    overview: 'Nestled along the Bhagirathi River in Uttarakhand, Harshil Valley offers serene deodar forests, apple orchards, and traditional Himalayan villages - a peaceful retreat to pause, breathe, and unwind.',
    highlights: [
      'Pristine Bhagirathi Riverbanks and suspension bridges',
      'Deodar forests, apple orchards, and scenic valley walks',
      'Traditional Himalayan wooden architecture in Bagori village',
      'Close access to Gangotri shrine and high alpine vistas'
    ],
    duration: '3N/4D',
    brochures: [
      {
        title: 'Harshil Valley Detailed Itinerary',
        file: '/brochures/harshil-valley.pdf',
        duration: '3N/4D'
      }
    ]
  }
];

export const whatsappNumber = '919354097831';

export function whatsappUrl(destination?: string, customText?: string) {
  if (customText) {
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(customText)}`;
  }
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    destination
      ? `Hello HimalayaHikes, I want details and itinerary for ${destination}. Please share pricing and upcoming dates.`
      : 'Hello HimalayaHikes, I would like to plan my next adventure. Please share available packages.'
  )}`;
}
