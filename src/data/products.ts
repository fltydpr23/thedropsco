export interface Ingredient {
  name: string;
  subtitle: string;
  description: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  color: string;
  colorRgb: string;
  accentClass: string;
  flavours: string[];
  format: string;
  benefits: string[];
  ingredients: Ingredient[];
}

export const products: Product[] = [
  {
    id: 'focus',
    name: 'Focus',
    tagline: 'Exam season. The deadline that won\'t move. The mind that can\'t switch off.',
    description: 'Sustained mental clarity when it matters most. Bioavailable B-vitamins and chelated zinc in a liquid format designed for cognitive performance.',
    color: '#D4E84A',
    colorRgb: '212, 232, 74',
    accentClass: 'accent-focus',
    flavours: ['Yuzu Lemon', 'Frozen Mint'],
    format: 'Liquid · Daily',
    benefits: [
      'Sustained mental focus',
      'Stress & cortisol resilience',
      'Neurotransmitter support',
      'Cognitive clarity',
      'Energy metabolism',
    ],
    ingredients: [
      { name: 'Methylcobalamin', subtitle: 'Vitamin B12 — active form', description: 'Directly usable by the body. Supports nerve function, myelin repair and memory consolidation.' },
      { name: 'Pyridoxal-5\'-Phosphate', subtitle: 'Vitamin B6 — active form', description: 'No liver conversion needed. Drives serotonin and dopamine synthesis — the mood and focus co-factor.' },
      { name: 'Calcium L-5-MTHF', subtitle: 'Folate — bioavailable form', description: 'Bypasses the MTHFR variant affecting a large portion of the population.' },
      { name: 'Zinc Bisglycinate', subtitle: 'Chelated zinc — ~40% absorption', description: 'Zero metallic taste. Supports neuroplasticity and stress resilience.' },
    ],
  },
  {
    id: 'body',
    name: 'Body',
    tagline: 'The body being asked to do a lot. And recover by morning.',
    description: 'Recovery-grade nutrition in liquid form. Emulsified D3, fermentation-derived K2, and chelated magnesium for those who push hard.',
    color: '#C6733A',
    colorRgb: '198, 115, 58',
    accentClass: 'accent-body',
    flavours: ['Blood Orange', 'Smoked Sea Salt'],
    format: 'Liquid · Daily',
    benefits: [
      'Muscle recovery',
      'Bone strength & density',
      'Energy & endurance',
      'Immune function',
      'Connective tissue repair',
    ],
    ingredients: [
      { name: 'Cholecalciferol', subtitle: 'Vitamin D3 — 600 IU', description: 'Gold-standard D3, fat-soluble and emulsified. Critical for bone mineralisation and immune performance.' },
      { name: 'MK-7', subtitle: 'Vitamin K2 — fermentation-derived', description: 'Routes calcium to bone, not arteries. The essential co-factor for D3-driven bone health.' },
      { name: 'Magnesium Bisglycinate', subtitle: '200 mg — highest GI tolerance', description: 'Muscle recovery and cramp prevention. Supports sleep quality. No laxative effect at this dose.' },
      { name: 'Liposomal Vitamin C', subtitle: 'Ascorbic Acid — liposomal form', description: 'Maintains plasma levels under high oxidative stress post-exercise. Collagen synthesis for connective tissue repair.' },
    ],
  },
  {
    id: 'cycle',
    name: 'Cycle',
    tagline: 'One week in four. The one that flattens you and never gets taken seriously enough.',
    description: 'Designed around the menstrual cycle. High-absorption iron, anti-inflammatory fish oil, and PMS-targeted B6 in a format that actually works.',
    color: '#F23B6F',
    colorRgb: '242, 59, 111',
    accentClass: 'accent-cycle',
    flavours: ['Raspberry', 'Black Cardamom'],
    format: 'Liquid · Daily',
    benefits: [
      'Iron absorption & anaemia support',
      'Cramp & inflammation relief',
      'Energy & RBC production',
      'PMS mood support',
      'Hormonal balance',
    ],
    ingredients: [
      { name: 'Ferrous Bisglycinate', subtitle: 'Iron — 14 mg chelated form', description: '3× higher absorption than ferrous sulphate. Zero GI distress — the primary compliance problem solved.' },
      { name: 'Methylcobalamin', subtitle: 'Vitamin B12 — 2.5 mcg', description: 'Co-dependent with iron for red blood cell maturation. Active form, no conversion.' },
      { name: 'Magnesium Bisglycinate', subtitle: '80 mg — conservative dose', description: 'Prostaglandin inhibition and cramp reduction. RCT-supported.' },
      { name: 'rTG Fish Oil', subtitle: 'DHA + EPA — 100 mg', description: 'Reduces inflammatory prostaglandins. rTG form absorbs ~70% better than ethyl ester.' },
    ],
  },
  {
    id: 'daily',
    name: 'Daily',
    tagline: 'Every morning. The ritual that earns the rest of your day.',
    description: 'The complete daily multivitamin — reimagined in liquid. Every ingredient in its most bioavailable form. No compromises, no filler.',
    color: '#4ECDC4',
    colorRgb: '78, 205, 196',
    accentClass: 'accent-daily',
    flavours: ['Watermelon Rose', 'Amras Chilli'],
    format: 'Liquid · Daily',
    benefits: [
      'Complete daily nutrition',
      'Immunity & energy',
      'Skin, hair & vitality',
      'Thyroid & metabolic health',
      'Antioxidant defence',
    ],
    ingredients: [
      { name: 'Cholecalciferol', subtitle: 'Vitamin D3 — 800 IU', description: 'Full daily dose. Gold-standard D3, fat-soluble and emulsified.' },
      { name: 'Methylcobalamin', subtitle: 'Vitamin B12 — active form', description: 'Active, directly usable form. Light and heat sensitive — processed at low temperature.' },
      { name: 'Selenomethionine', subtitle: 'Selenium — ~90% bioavailability', description: 'Antioxidant defence, thyroid function, immune support. Organic form absorbs nearly twice as well.' },
      { name: 'Full B-Complex', subtitle: 'B1 · B2 · B3 · B5 · B6 · all active', description: 'Every B-vitamin in its active, bioavailable form. Energy metabolism, neurological function.' },
    ],
  },
];
