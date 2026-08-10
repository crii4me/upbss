/* ==========================================================================
   upbss — site data
   Single source of truth for the front end. When the back end goes live,
   replace UPBSS.properties etc. with a fetch() to the API and keep the same
   object shape — nothing else needs to change.

   Market: Edinburgh and the Lothians. Prices in pounds sterling, areas in m²
   (as used by the Home Report), tenure recorded as heritable — Scotland has
   no freehold/leasehold distinction.
   ========================================================================== */

window.UPBSS = window.UPBSS || {};

UPBSS.config = {
  name: 'upbss',
  email: 'customerservice@upbss.com',
  /* A real, live mobile number — not a demo placeholder. Anyone who calls or
     texts it reaches a person. Keep `phone` and `phoneHref` in step: `phone`
     is what visitors read, `phoneHref` is what the tel: link dials. */
  phone: '+44 7988 313898',
  phoneHref: '+447988313898',
  address: ['upbss Property Group', '[registered office address]', 'Edinburgh', 'Scotland'],
  hours: 'Mon–Fri 09:00–18:00 · Sat 10:00–14:00',
  currency: '£',
  perPage: 9
};

UPBSS.propertyTypes = ['Flat', 'House', 'Townhouse', 'Studio', 'Commercial', 'Land'];

UPBSS.locations = [
  'New Town', 'Old Town', 'Stockbridge', 'Morningside', 'Newington',
  'Leith', 'Portobello', 'Corstorphine', 'Musselburgh', 'Dalkeith'
];

/* status: 'available' | 'under-offer' | 'sold' */
UPBSS.properties = [
  {
    ref: 'UP2291', title: 'Shore-side flat with double balcony', type: 'Flat',
    location: 'Leith', region: 'City of Edinburgh', price: 385000, beds: 3, baths: 2, area: 96,
    year: 2016, epc: 'B', tenure: 'Heritable', status: 'available', featured: true, scene: 'tower', seed: 3,
    summary: 'A bright third-floor flat a minute from The Shore, with two balconies, a fitted kitchen and a secure parking space included in the price.',
    images: ['UP2291', 'UP2275', 'UP2266'],
    features: ['Two south-facing balconies', 'Secure underground parking', 'Fitted Bosch kitchen', 'Lift to all floors', 'Storage cellar', 'Factored development']
  },
  {
    ref: 'UP2288', title: 'Detached villa with mature garden', type: 'House',
    location: 'Corstorphine', region: 'City of Edinburgh', price: 695000, beds: 5, baths: 3, area: 184,
    year: 1998, epc: 'C', tenure: 'Heritable', status: 'available', featured: true, scene: 'house', seed: 1,
    summary: 'Set back from the road on a 720 m² plot, this family villa offers five bedrooms, a converted attic studio and a double garage.',
    images: ['UP2288', 'UP2244', 'UP2233'],
    features: ['720 m² south-facing garden', 'Double garage and workshop', 'Converted attic studio', 'Wood-burning stove', 'EV charging point', 'Fibre broadband']
  },
  {
    ref: 'UP2284', title: 'Converted loft studio off the Royal Mile', type: 'Studio',
    location: 'Old Town', region: 'City of Edinburgh', price: 295000, beds: 1, baths: 1, area: 54,
    year: 1912, epc: 'D', tenure: 'Heritable', status: 'available', featured: true, scene: 'loft', seed: 5,
    summary: 'Original beams, four-metre ceilings and a mezzanine sleeping platform, two minutes from the Royal Mile.',
    images: ['UP2284', 'UP2239', 'UP2250'],
    features: ['Exposed original beams', '4 m ceiling height', 'Mezzanine platform', 'Two minutes to the Royal Mile', 'Communal roof terrace', 'Bike store']
  },
  {
    ref: 'UP2279', title: 'Ground-floor retail unit on Morningside Road', type: 'Commercial',
    location: 'Morningside', region: 'City of Edinburgh', price: 495000, beds: 0, baths: 2, area: 140,
    year: 1975, epc: 'C', tenure: 'Heritable', status: 'under-offer', featured: false, scene: 'shop', seed: 2,
    summary: 'A 140 m² retail unit with 9 m of frontage onto Morningside Road, currently let to a bakery on a rolling lease.',
    images: ['UP2279', 'UP2257', 'UP2228'],
    features: ['9 m glazed frontage', 'Tenant in situ', 'Rear delivery access', 'Air conditioning', 'Basement stock room', 'Class 1 retail use']
  },
  {
    ref: 'UP2275', title: 'Two-bed flat with Arthur’s Seat views', type: 'Flat',
    location: 'Newington', region: 'City of Edinburgh', price: 365000, beds: 2, baths: 1, area: 71,
    year: 2009, epc: 'B', tenure: 'Heritable', status: 'available', featured: false, scene: 'tower', seed: 7,
    summary: 'A quiet top-floor flat looking across to Arthur’s Seat, sold with a residents’ parking permit and a large storage cellar.',
    images: ['UP2275', 'UP2266', 'UP2250'],
    features: ['Top floor, no overlooking', 'Arthur’s Seat views', 'Residents’ parking zone', 'Triple glazing', 'Shared drying green', 'Ten minutes to the Meadows']
  },
  {
    ref: 'UP2270', title: 'Georgian townhouse in the New Town', type: 'Townhouse',
    location: 'New Town', region: 'City of Edinburgh', price: 1150000, beds: 4, baths: 3, area: 210,
    year: 1815, epc: 'D', tenure: 'Heritable', status: 'available', featured: true, scene: 'terrace', seed: 4,
    summary: 'Four floors of Georgian detail with a private garden flat below, restored sash and case windows and a key to the residents’ gardens.',
    images: ['UP2270', 'UP2202', 'UP2196'],
    features: ['Four storeys plus basement', 'Residents’ garden key', 'Restored sash and case windows', 'Separate garden flat', 'Original cornicing', 'A-listed façade']
  },
  {
    ref: 'UP2266', title: 'New-build flat, EPC band A', type: 'Flat',
    location: 'Leith', region: 'City of Edinburgh', price: 315000, beds: 2, baths: 1, area: 68,
    year: 2024, epc: 'A', tenure: 'Heritable', status: 'available', featured: false, scene: 'tower', seed: 9,
    summary: 'Completed in 2024 with underfloor heating, an air-source heat pump and a ten-year structural warranty still in place.',
    images: ['UP2266', 'UP2250', 'UP2221'],
    features: ['EPC band A', 'Air-source heat pump', 'Underfloor heating', '10-year warranty', 'Video entry system', 'Private terrace']
  },
  {
    ref: 'UP2261', title: 'Building plot with permission in principle', type: 'Land',
    location: 'Dalkeith', region: 'Midlothian', price: 175000, beds: 0, baths: 0, area: 640,
    year: null, epc: '—', tenure: 'Heritable', status: 'available', featured: false, scene: 'land', seed: 6,
    summary: 'A level 640 m² plot with planning permission in principle for a single dwelling, services already at the boundary.',
    images: ['UP2261', 'UP2190', 'UP2288'],
    features: ['Planning permission in principle', 'Services at boundary', 'Level, cleared site', 'No overhead lines', 'Quiet cul-de-sac', 'Adopted road access']
  },
  {
    ref: 'UP2257', title: 'Warehouse and office unit, business park', type: 'Commercial',
    location: 'Musselburgh', region: 'East Lothian', price: 720000, beds: 0, baths: 3, area: 520,
    year: 2005, epc: 'C', tenure: 'Heritable', status: 'available', featured: false, scene: 'shop', seed: 8,
    summary: 'A 520 m² unit combining warehouse space with a first-floor office suite and eight parking spaces.',
    images: ['UP2257', 'UP2228', 'UP2208'],
    features: ['6 m clear internal height', 'Roller shutter loading', 'First-floor office suite', 'Eight parking spaces', 'Three-phase power', '24-hour site access']
  },
  {
    ref: 'UP2250', title: 'Refurbished tenement flat near the university', type: 'Flat',
    location: 'Newington', region: 'City of Edinburgh', price: 285000, beds: 2, baths: 1, area: 62,
    year: 1895, epc: 'C', tenure: 'Heritable', status: 'available', featured: false, scene: 'tower', seed: 11,
    summary: 'Fully refurbished in 2023 and currently let at £1,250 per month — a ready-made rental investment with a tenant in place.',
    images: ['UP2250', 'UP2221', 'UP2196'],
    features: ['Refurbished 2023', 'Tenanted at £1,250 pcm', 'Ten minutes to King’s Buildings', 'New bathroom', 'Shared rear garden', 'Bus routes at the door']
  },
  {
    ref: 'UP2244', title: 'Cottage with steading conversion potential', type: 'House',
    location: 'Dalkeith', region: 'Midlothian', price: 395000, beds: 4, baths: 2, area: 156,
    year: 1954, epc: 'E', tenure: 'Heritable', status: 'available', featured: false, scene: 'house', seed: 12,
    summary: 'A traditional cottage with an attached stone steading, ripe for conversion subject to the usual consents.',
    images: ['UP2244', 'UP2233', 'UP2215'],
    features: ['Attached stone steading', 'Conversion potential', 'Orchard to the rear', 'Original range', 'Private water supply', 'Village centre']
  },
  {
    ref: 'UP2239', title: 'Corner studio with roof terrace', type: 'Studio',
    location: 'Leith', region: 'City of Edinburgh', price: 325000, beds: 1, baths: 1, area: 48,
    year: 2019, epc: 'B', tenure: 'Heritable', status: 'under-offer', featured: false, scene: 'loft', seed: 14,
    summary: 'A compact corner studio on the top floor, sold with an 18 m² private roof terrace and a lift to the door.',
    images: ['UP2239', 'UP2284', 'UP2266'],
    features: ['18 m² roof terrace', 'Corner aspect, dual light', 'Lift to the door', 'Built-in storage wall', 'Concierge service', 'Bike store']
  },
  {
    ref: 'UP2233', title: 'Detached villa with indoor pool', type: 'House',
    location: 'Morningside', region: 'City of Edinburgh', price: 1450000, beds: 6, baths: 4, area: 320,
    year: 2011, epc: 'B', tenure: 'Heritable', status: 'available', featured: true, scene: 'house', seed: 15,
    summary: 'Six bedrooms, a heated indoor pool and a triple garage on a landscaped 1,400 m² plot with views to the Pentlands.',
    images: ['UP2233', 'UP2215', 'UP2288'],
    features: ['Heated indoor pool', '1,400 m² landscaped garden', 'Triple garage', 'Guest suite', 'Home cinema room', 'Solar PV array']
  },
  {
    ref: 'UP2228', title: 'Mixed-use building, five flats', type: 'Commercial',
    location: 'Leith', region: 'City of Edinburgh', price: 1290000, beds: 11, baths: 6, area: 610,
    year: 1962, epc: 'D', tenure: 'Heritable', status: 'available', featured: false, scene: 'terrace', seed: 17,
    summary: 'Five let flats over a ground-floor commercial unit, producing £74,000 gross per year.',
    images: ['UP2228', 'UP2208', 'UP2279'],
    features: ['£74,000 gross income', 'Five let flats', 'Ground-floor commercial', 'New roof 2021', 'Separate meters', 'Rear parking court']
  },
  {
    ref: 'UP2221', title: 'One-bed flat a short walk from the beach', type: 'Flat',
    location: 'Portobello', region: 'City of Edinburgh', price: 245000, beds: 1, baths: 1, area: 44,
    year: 1996, epc: 'C', tenure: 'Heritable', status: 'available', featured: false, scene: 'tower', seed: 19,
    summary: 'Three hundred metres from Portobello beach and the promenade, with a shared drying green and a permit parking bay.',
    images: ['UP2221', 'UP2196', 'UP2291'],
    features: ['300 m from the beach', 'Sea glimpses from the lounge', 'Short-term let potential, subject to licence', 'Furnished as seen', 'Permit parking zone', 'Storage cellar']
  },
  {
    ref: 'UP2215', title: 'Steading conversion with paddock', type: 'House',
    location: 'Dalkeith', region: 'Midlothian', price: 565000, beds: 4, baths: 3, area: 198,
    year: 2018, epc: 'B', tenure: 'Heritable', status: 'available', featured: false, scene: 'house', seed: 21,
    summary: 'A completed steading conversion with a vaulted living room, underfloor heating throughout and a 0.4 hectare paddock.',
    images: ['UP2215', 'UP2288', 'UP2244'],
    features: ['Vaulted living room', '0.4 ha paddock', 'Underfloor heating', 'Stables and tack room', 'Air-source heat pump', 'Private drive']
  },
  {
    ref: 'UP2208', title: 'City-centre office floor', type: 'Commercial',
    location: 'New Town', region: 'City of Edinburgh', price: 985000, beds: 0, baths: 4, area: 340,
    year: 1988, epc: 'C', tenure: 'Heritable', status: 'available', featured: false, scene: 'shop', seed: 23,
    summary: 'A whole third floor of 340 m², open plan with four meeting rooms, sold with vacant possession.',
    images: ['UP2208', 'UP2279', 'UP2257'],
    features: ['Whole floor, open plan', 'Four meeting rooms', 'Vacant possession', 'Raised access floors', 'Two passenger lifts', 'Tram stop at the door']
  },
  {
    ref: 'UP2202', title: 'Colony house with front and rear gardens', type: 'Townhouse',
    location: 'Stockbridge', region: 'City of Edinburgh', price: 585000, beds: 3, baths: 2, area: 110,
    year: 1866, epc: 'D', tenure: 'Heritable', status: 'available', featured: false, scene: 'terrace', seed: 25,
    summary: 'A classic Stockbridge colony house over two floors, with gardens front and back and the Water of Leith walkway at the end of the street.',
    images: ['UP2202', 'UP2270', 'UP2250'],
    features: ['Front and rear gardens', 'Original external stone stair', 'Restored sash windows', 'Gas central heating', 'Residents’ parking', 'Roof recently relined']
  },
  {
    ref: 'UP2196', title: 'Main door flat with private garden', type: 'Flat',
    location: 'Stockbridge', region: 'City of Edinburgh', price: 495000, beds: 2, baths: 2, area: 78,
    year: 1898, epc: 'C', tenure: 'Heritable', status: 'available', featured: false, scene: 'tower', seed: 27,
    summary: 'A main door flat with its own front door and private garden, retaining original cornicing and shutters throughout.',
    images: ['UP2196', 'UP2291', 'UP2275'],
    features: ['Main door access', 'Private front garden', 'Original cornicing and shutters', 'Two double bedrooms', 'Cellar store', 'Water of Leith walkway nearby']
  },
  {
    ref: 'UP2190', title: 'Development site, edge of town', type: 'Land',
    location: 'Musselburgh', region: 'East Lothian', price: 380000, beds: 0, baths: 0, area: 1450,
    year: null, epc: '—', tenure: 'Heritable', status: 'available', featured: false, scene: 'land', seed: 29,
    summary: 'A 1,450 m² site allocated for housing in the local development plan, with a pre-application response for four homes.',
    images: ['UP2190', 'UP2261', 'UP2215'],
    features: ['Allocated for housing', 'Pre-application for four homes', 'Mains services adjacent', 'Level topography', 'Bus route nearby', 'No known title burdens']
  }
];

UPBSS.sold = [
  { ref: 'UP2103', title: 'Three-bed flat with Shore views', location: 'Leith', type: 'Flat', price: 402000, weeks: 5, year: 2026 },
  { ref: 'UP2088', title: 'Semi-detached villa with garden', location: 'Corstorphine', type: 'House', price: 468000, weeks: 7, year: 2026 },
  { ref: 'UP2071', title: 'Retail unit, Morningside Road', location: 'Morningside', type: 'Commercial', price: 610000, weeks: 12, year: 2026 },
  { ref: 'UP2064', title: 'Studio near the Meadows', location: 'Newington', type: 'Studio', price: 249000, weeks: 3, year: 2026 },
  { ref: 'UP2050', title: 'Detached villa with two annexes', location: 'Morningside', type: 'House', price: 1340000, weeks: 16, year: 2025 },
  { ref: 'UP2039', title: 'Georgian townhouse, New Town', location: 'New Town', type: 'Townhouse', price: 1195000, weeks: 9, year: 2025 },
  { ref: 'UP2027', title: 'Two-bed with sea views', location: 'Portobello', type: 'Flat', price: 284000, weeks: 6, year: 2025 },
  { ref: 'UP2014', title: 'Warehouse unit, business park', location: 'Musselburgh', type: 'Commercial', price: 540000, weeks: 14, year: 2025 },
  { ref: 'UP1998', title: 'Plot with permission in principle', location: 'Dalkeith', type: 'Land', price: 182000, weeks: 8, year: 2025 }
];

UPBSS.testimonials = [
  {
    quote: 'Excellent from start to finish. Our consultant kept us updated at every stage and found a buyer within three weeks of the listing going live.',
    name: 'Fiona & Andrew Mackay', role: 'Sellers, Leith'
  },
  {
    quote: 'I had been with another agent for eight months with barely a viewing. upbss repriced it honestly against the Home Report, re-shot the listing, and it was under offer in a month.',
    name: 'Isla Cameron', role: 'Seller, Morningside'
  },
  {
    quote: 'As a first-time buyer I asked a lot of questions. Nobody made me feel like a nuisance, and the whole missives process was explained in plain language.',
    name: 'Ruaridh Docherty', role: 'Buyer, Newington'
  },
  {
    quote: 'We bought a commercial unit through upbss and sold our old premises with them six months later. Same team both times, which made a real difference.',
    name: 'Katie Sinclair', role: 'Buyer & seller, Musselburgh'
  }
];

/* Written for Scotland. Answers are rendered with textContent-style escaping,
   so they must stay plain text — no HTML markup. */
UPBSS.faqs = [
  {
    cat: 'Fees',
    q: 'What does it cost to sell with upbss?',
    a: 'Our fee is a completion fee, payable at settlement — either a fixed amount or a percentage of the sale price, agreed with you in writing before we start. There is no upfront listing charge on our standard agreement. We show the fee in cash terms as well as any percentage, and state whether it includes VAT, before you commit.'
  },
  {
    cat: 'Selling',
    q: 'Do I need a Home Report?',
    a: 'Yes, in almost all cases. Since December 2008 a seller in Scotland must have a Home Report available before the property goes on the market. It has three parts: a Single Survey with a condition report and valuation by a chartered surveyor, an Energy Report, and a Property Questionnaire that you complete. We must make it available to a prospective buyer who asks, normally within nine days. A few properties are exempt, including new builds and some holiday properties, but assume you need one unless we confirm otherwise.'
  },
  {
    cat: 'Fees',
    q: 'What is the difference between sole agency and sole selling rights?',
    a: 'This is the single most expensive thing sellers fail to check. Under sole agency we are the only agent instructed, and a fee is due if we introduce the buyer — if you find a buyer entirely independently, normally no fee is due. Under sole selling rights a fee is due even if you find the buyer yourself, including your own neighbour or a family member. Multiple agency means several agents compete and whoever introduces the buyer is paid, usually at a higher rate. Any agent must explain which applies before you sign.'
  },
  {
    cat: 'Selling',
    q: 'How long does it take to sell?',
    a: 'Most properties go under offer within roughly four to twelve weeks, depending on price, condition, location and the market. After an offer is accepted, the conveyancing usually takes a further six to twelve weeks to reach settlement. We will give you a realistic range at the appraisal rather than an optimistic one.'
  },
  {
    cat: 'Process',
    q: 'When does a sale become legally binding in Scotland?',
    a: 'On the conclusion of missives — the exchange of formal letters between the two solicitors that forms the contract. Once missives are concluded both parties are bound, and pulling out exposes you to a claim for damages. This is the biggest difference from England and Wales, where nothing binds until exchange of contracts. It means gazumping is far less common here after missives conclude, but also that your finance and survey position must be settled before your solicitor concludes on your behalf.'
  },
  {
    cat: 'Selling',
    q: 'What does offers over actually mean?',
    a: 'It is a marketing convention: the property is advertised at a figure inviting offers above it, usually set in relation to the Home Report valuation. It is not a reserve and not a promise. In a strong market properties can go well above it; in a quieter one, at or below. We will tell you honestly which we expect, and we will not set an offers over figure we cannot justify.'
  },
  {
    cat: 'Selling',
    q: 'What is a closing date?',
    a: 'Where several buyers are interested, we set a deadline by which each must submit their best offer through their solicitor. The seller then chooses, and is not obliged to take the highest, since the date of entry and any conditions matter too. Buyers usually get one attempt, so it works as a sealed bid process in all but name.'
  },
  {
    cat: 'Selling',
    q: 'Why does the Home Report matter so much to the price?',
    a: 'Because buyers see the surveyor valuation before they offer, and their lender will usually lend against that figure. In practice the Home Report valuation anchors the whole negotiation. That is very different from England, where a buyer commissions a survey only after an offer is accepted.'
  },
  {
    cat: 'Fees',
    q: 'Can I change my mind after signing with you?',
    a: 'Usually yes. If you signed away from our office or online, you have a 14 day cancellation right under the Consumer Contracts Regulations 2013, without giving a reason. If you ask us to begin marketing within those 14 days and then cancel, you may owe a proportionate amount for work already done. We give you a cancellation notice and form before you sign.'
  },
  {
    cat: 'Fees',
    q: 'Are legal fees included in your fee?',
    a: 'No. Conveyancing, Home Report and registration costs are separate and are billed to you directly by the firm you instruct. We can introduce you to solicitors we work with regularly, but you are free to use your own. If we receive a referral fee for an introduction, we will tell you the amount before you decide.'
  },
  {
    cat: 'Fees',
    q: 'Can I list with more than one agent?',
    a: 'Yes, but read each agreement first. Instructing a second agent while under sole agency or sole selling rights can leave you owing two fees on one sale. Check the tie-in period and the notice period in both contracts before you sign anything.'
  },
  {
    cat: 'Selling',
    q: 'What documents should I get ready?',
    a: 'Proof of identity and address for anti-money-laundering checks; your Home Report if already commissioned; your title deeds or title number from the Land Register of Scotland; planning permissions and building warrants with completion certificates for any alterations; guarantees for damp, timber, electrical work, windows or a new boiler; and any new build warranty. For a flat, also your factor details, recent factoring statements and any notices about common repairs.'
  },
  {
    cat: 'Selling',
    q: 'How will you value my property?',
    a: 'We combine three inputs: recent sold prices of comparable properties, current asking prices for competing properties, and the condition and specification we see at the visit. You get the comparable evidence we used, not just a number. Sold prices are a matter of public record through Registers of Scotland, so you can check our workings.'
  },
  {
    cat: 'Selling',
    q: 'Is the instant appraisal a real valuation?',
    a: 'No. It is an indicative range generated from the details you type in. It cannot see your kitchen, your outlook or your title burdens. It is not a Home Report, not a Single Survey and not a RICS Red Book valuation, and it must not be used for lending, tax, executry or matrimonial purposes. If you are selling, the figure that will matter is the Single Survey valuation in your Home Report.'
  },
  {
    cat: 'Selling',
    q: 'What if my property does not sell?',
    a: 'We keep marketing it until it sells or you ask us to stop. At around the eight week mark we sit down with the viewing and enquiry data and either adjust the price, change the presentation, or both. Re-valuation is free while you are on our books.'
  },
  {
    cat: 'Buying',
    q: 'Do I need to register to view a property?',
    a: 'No. You can browse every listing without an account. You give us your details only when you request a viewing or ask about a specific property.'
  },
  {
    cat: 'Buying',
    q: 'What will buying cost me beyond the price?',
    a: 'Budget for your deposit; Land and Buildings Transaction Tax, collected by Revenue Scotland; the Additional Dwelling Supplement if this is not replacing your only home; your solicitor fees and outlays; registration dues to Registers of Scotland; any mortgage arrangement fee; removals; and buildings insurance from the date of entry. Rates and thresholds are set by the Scottish Parliament and change, so check revenue.scot for the current position rather than relying on a figure quoted on any website.'
  },
  {
    cat: 'Buying',
    q: 'Do I need my own survey if there is a Home Report?',
    a: 'Often not, because the Single Survey is commissioned for the buyer benefit and most lenders accept it. If the property is unusual, has been substantially altered, or the Single Survey flags Category 3 repairs, it is worth commissioning your own more detailed inspection. Your solicitor will advise.'
  },
  {
    cat: 'Buying',
    q: 'What does noting interest mean?',
    a: 'Your solicitor tells the selling agent formally that you are interested. It does not commit you to anything, but it means you should be told if a closing date is set. Without it you may simply miss the deadline.'
  },
  {
    cat: 'Buying',
    q: 'There is no leasehold in Scotland, so what should I check on a flat?',
    a: 'Correct — feudal tenure was abolished and residential long leases have largely been converted, so you own your property outright. There is no ground rent, no service charge in the English sense and no lease to extend. Instead check the real burdens in the title, which are obligations that run with the property; how common repairs to the roof, stair and rainwater goods are shared, since the Tenement Management Scheme fills any gap where the title is silent; who your factor is and what they charge; and whether any major works have been agreed but not yet billed.'
  },
  {
    cat: 'Buying',
    q: 'What is a property factor, and are they regulated?',
    a: 'A factor manages the common parts of a building or estate. Factors must be on the Scottish Property Factor Register and must comply with the statutory Code of Conduct under the Property Factors (Scotland) Act 2011. If you have a dispute with a factor that you cannot resolve, it goes to the First-tier Tribunal for Scotland, Housing and Property Chamber, rather than to the courts.'
  },
  {
    cat: 'Buying',
    q: 'How do you assess buyers?',
    a: 'We ask about position — cash, mortgage agreed in principle, or dependent on selling — and expect confirmation of funds. In Scotland an offer also states a proposed date of entry and any conditions, and those often matter as much as the number. Sellers see that information before they decide.'
  },
  {
    cat: 'Buying',
    q: 'Can you help arrange a mortgage?',
    a: 'We can introduce you to independent mortgage brokers we work with. We are not brokers ourselves and are not authorised to give financial advice. If we receive a referral fee we will tell you before you are introduced, and you are under no obligation to use them.'
  },
  {
    cat: 'Process',
    q: 'Do I need a solicitor?',
    a: 'Yes. In Scotland the solicitor role starts earlier and matters more than in England: your offer is made by your solicitor, in formal written terms, and only a solicitor can conclude missives. Instruct one before you start viewing seriously.'
  },
  {
    cat: 'Process',
    q: 'What is the date of entry?',
    a: 'The date, agreed in the missives, when the price is paid and you take possession. It is the Scottish equivalent of completion day, and it is negotiated as part of the offer rather than fixed afterwards.'
  },
  {
    cat: 'Process',
    q: 'Who registers the sale?',
    a: 'Registers of Scotland maintains the Land Register of Scotland, which has been progressively replacing the older Sasine Register. Your solicitor handles registration and pays the dues.'
  },
  {
    cat: 'Process',
    q: 'What happens after I submit an enquiry?',
    a: 'It goes straight to a named consultant, not a shared inbox. You will hear back within one working day, and we will tell you who is handling it and how to reach them directly.'
  },
  {
    cat: 'Regulation',
    q: 'Why do you need to see my passport?',
    a: 'Estate agency businesses across the UK are subject to the Money Laundering Regulations 2017. We are legally required to verify the identity of our clients, and in some circumstances of buyers, and to establish the source of funds. We cannot proceed without it. Checks are usually completed in minutes and the records are held for five years.'
  },
  {
    cat: 'Regulation',
    q: 'Who regulates you, and what if I have a complaint?',
    a: 'We are required by law to belong to a government-approved redress scheme, and our membership details are on our complaints page. Please raise any complaint with us first — our complaints procedure sets out the timescales, including a final written response within eight weeks. If we cannot resolve it you can refer the matter to the scheme free of charge. Free consumer advice in Scotland is available from Advice Direct Scotland at consumeradvice.scot.'
  },
  {
    cat: 'Regulation',
    q: 'Do solicitors sell property in Scotland too?',
    a: 'Yes, and this is a real difference from England. Many Scottish solicitors act as estate agents, and in Edinburgh a large share of the market is advertised through the Edinburgh Solicitors Property Centre. Solicitor estate agents are regulated by the Law Society of Scotland. We will be straightforward with you about where your property will and will not be advertised.'
  },
  {
    cat: 'Regulation',
    q: 'Can I sell discreetly, without a board or a public listing?',
    a: 'Yes. We can market without a street address, without external photographs and without a board, releasing details only to vetted buyers who have signed a non-disclosure agreement. Note that you still need a Home Report available for anyone who properly requests it. It narrows the audience and usually costs time or price, so we will talk you through the trade-off first.'
  }
];

UPBSS.guides = [
  {
    slug: 'first-time-seller-checklist',
    image: 'seller-checklist',
    title: 'The first-time seller checklist',
    cat: 'Selling',
    read: 6,
    date: '12 June 2026',
    excerpt: 'Everything to have ready before your property goes live — from the Home Report to the photographs that actually get clicks.',
    body: [
      ['h2', 'Start with the Home Report'],
      ['p', 'In Scotland you cannot market a home without one, so this is the first job rather than an afterthought. It has three parts: a Single Survey with a condition report and valuation from a chartered surveyor, an Energy Report, and a Property Questionnaire you complete yourself. Budget a week or so to get it done.'],
      ['p', 'It also sets the tone of the whole negotiation, because buyers and their lenders see the surveyor’s valuation before they offer.'],
      ['h2', 'Then the rest of the paperwork'],
      ['p', 'The single biggest cause of delay between an accepted offer and settlement is missing documentation. Gathering it before you list costs you an afternoon and saves you weeks later.'],
      ['ul', ['Home Report, no more than twelve weeks old when marketing starts', 'Title deeds, or your title number from the Land Register of Scotland', 'Planning permissions and building warrants, with completion certificates, for any alterations', 'Guarantees for damp, timber, rewiring, windows or a new boiler', 'For a flat: your factor’s details and recent factoring statements', 'For a let property: the tenancy agreement and landlord registration number']],
      ['h2', 'Fix the small things, not the big ones'],
      ['p', 'A new kitchen rarely returns what it costs when you are selling within the year. A door that sticks, a cracked tile and a dripping tap cost very little and remove the impression that a property has been neglected. Buyers price in what they can see — and so does the surveyor writing your Single Survey.'],
      ['h2', 'Get the photography right'],
      ['p', 'Listings with fewer than eight photographs get materially less engagement than those with fifteen or more. Shoot on a bright day, from the corners of rooms, with every light on and every surface clear. If there is a view of the castle, Arthur’s Seat or the Firth, photograph it separately.'],
      ['h2', 'Decide your offers over figure carefully'],
      ['p', 'An offers over price is set in relation to the Home Report valuation, and buyers read the two together. Set it too far above the valuation and buyers assume you are unrealistic; set it well below and you invite a bidding war you may not want to manage. We will tell you which we expect rather than which sounds better.'],
      ['h2', 'Decide how you will handle viewings'],
      ['p', 'Be honest about your availability before you list. If you can only do Saturday mornings, say so up front and we will manage buyer expectations rather than losing them to a slow reply.']
    ]
  },
  {
    slug: 'how-property-valuations-work',
    image: 'valuations',
    title: 'How property valuations actually work',
    cat: 'Valuation',
    read: 5,
    date: '28 May 2026',
    excerpt: 'What sits behind the number in your Home Report, why two agents can differ, and how to tell an honest appraisal from a flattering one.',
    body: [
      ['h2', 'Two different numbers, doing two different jobs'],
      ['p', 'In Scotland there are two figures in play and it pays to keep them straight. The Single Survey valuation is prepared by a chartered surveyor and is what a lender will usually lend against. The marketing appraisal is an agent’s opinion of what the property will actually achieve, and it is what sets your offers over figure.'],
      ['h2', 'Comparables do the heavy lifting'],
      ['p', 'A comparable is a property of similar type, size, age and location that has actually settled, ideally within the last six months. Asking prices tell you what sellers hope for; recorded prices tell you what buyers paid. Sold prices are a matter of public record through Registers of Scotland, so any agent can show you their evidence — and you should ask them to.'],
      ['h2', 'Why two agents differ'],
      ['p', 'Genuine differences in judgement account for perhaps five per cent. Beyond that, the gap is usually strategy: an inflated appraisal wins the instruction, and the reduction arrives six weeks later. If one figure is well above the rest, ask what evidence supports it.'],
      ['h2', 'What the instant estimate can and cannot do'],
      ['p', 'An online estimate works from area, type, age and area of the city. It cannot see that your kitchen was replaced last year, that the stair needs a new roof, or that your title contains a burden restricting alterations. Treat it as a range to start the conversation, not a price.'],
      ['h2', 'When to revisit the figure'],
      ['p', 'Revisit it if the property has been on the market more than eight weeks, if you have completed significant work, or if a directly comparable property nearby has just settled. Note that a Home Report older than around twelve weeks may need refreshing for a buyer’s lender, so ask before you assume it still counts.']
    ]
  },
  {
    slug: 'buying-costs-in-scotland',
    image: 'buying-costs',
    title: 'What buying a property really costs',
    cat: 'Buying',
    read: 7,
    date: '14 May 2026',
    excerpt: 'The purchase price is most of the story but not all of it. Here is the rest, laid out line by line, so nothing arrives as a surprise.',
    body: [
      ['h2', 'Budget beyond the offer'],
      ['p', 'Transaction costs in Scotland are driven mainly by tax, and tax is driven by price band, so a single percentage is misleading. Work out your own figure from the list below before you start viewing, not after your offer is accepted.'],
      ['h2', 'The main line items'],
      ['ul', ['Land and Buildings Transaction Tax (LBTT), collected by Revenue Scotland', 'Additional Dwelling Supplement (ADS), if the purchase is not replacing your only home', 'Your solicitor’s fee for conveyancing, the offer and the missives', 'Registration dues payable to Registers of Scotland', 'Searches and reports ordered by your solicitor', 'Mortgage arrangement fee, if your lender charges one', 'Your own survey, if you commission one beyond the Single Survey', 'Removals, and buildings insurance from the date of entry']],
      ['p', 'LBTT bands, the ADS rate and first-time buyer relief are set by the Scottish Parliament and change, so check the current position and the official calculator on revenue.scot rather than relying on a figure printed on any website, including this one.'],
      ['h2', 'Running costs to check before you offer'],
      ['p', 'For a flat, ask for recent factoring statements and any notices about common repairs. A roof or stair repair that has been agreed but not yet billed can land shortly after you move in, and the liability usually follows the property rather than the seller.'],
      ['h2', 'Getting your finance in order'],
      ['p', 'A mortgage agreed in principle before you start viewing makes your offer materially stronger, particularly at a closing date where two offers sit at a similar number. Sellers weigh certainty, and the proposed date of entry, as heavily as price.'],
      ['h2', 'Read the Energy Report'],
      ['p', 'The Energy Report inside the Home Report tells you what the property will cost to heat. On an older tenement the difference between band C and band F can run to well over a thousand pounds a year, and it also shapes what improvements will be worth doing.']
    ]
  },
  {
    slug: 'preparing-for-viewings',
    image: 'viewings',
    title: 'Preparing for viewings that convert',
    cat: 'Selling',
    read: 4,
    date: '30 April 2026',
    excerpt: 'A viewing is forty minutes long and most buyers decide in the first five. Here is how to use them.',
    body: [
      ['h2', 'The first five minutes decide it'],
      ['p', 'Buyers form an impression at the front door and spend the rest of the viewing confirming it. Clean the entrance, the hallway and whatever is directly visible from it, before anything else. In a tenement that includes the common stair, which is not strictly yours but is absolutely part of the impression.'],
      ['h2', 'Light, air, space'],
      ['p', 'Open every blind, turn on every light including in daylight, and open the windows twenty minutes before. Remove roughly a third of the furniture from any room that feels tight — boxes in the cellar are fine.'],
      ['h2', 'Let them look'],
      ['p', 'Answer questions, then step back. Buyers need to open cupboards, stand in the middle of rooms and talk to each other without being followed. Give them the space to picture living there.'],
      ['h2', 'Have the answers ready'],
      ['p', 'Heating costs, broadband speed, factoring charges, age of the boiler, what the neighbours are like, when the stair roof was last done. Not knowing is fine once; not knowing three times makes buyers wonder what else you have not checked.'],
      ['h2', 'Follow up the same day'],
      ['p', 'We collect feedback within twenty-four hours and pass it to you unedited, including the parts you would rather not hear. That feedback is the most reliable data you will get about your price, and it matters most in the three weeks before a closing date.']
    ]
  },
  {
    slug: 'selling-a-tenanted-property',
    image: 'tenanted',
    title: 'Selling a property with tenants in place',
    cat: 'Selling',
    read: 6,
    date: '17 April 2026',
    excerpt: 'Tenanted property sells to a different buyer and needs a different approach. What changes under Scottish tenancy law, and what stays the same.',
    body: [
      ['h2', 'Your buyer is an investor'],
      ['p', 'A tenanted property is bought on yield rather than on how the kitchen feels. Lead with the numbers: rent, arrears history, factoring charges and net return. Photographs still matter, but the rent schedule matters more.'],
      ['h2', 'Scottish tenancies work differently'],
      ['p', 'Most residential lets in Scotland are Private Residential Tenancies, which are open-ended. There is no fixed end date to sell around, and recovering possession requires one of the statutory grounds, with notice, and ultimately an application to the First-tier Tribunal if the tenant does not leave. Assume the sale will be to another landlord unless you have already begun that process.'],
      ['h2', 'Talk to your tenants first'],
      ['p', 'Tenants who hear about the sale from a listing rather than from you tend to become obstructive about viewings, and they are entitled to reasonable notice for every visit. A conversation early keeps the process workable.'],
      ['h2', 'Get the paperwork in order'],
      ['ul', ['The tenancy agreement and any variations', 'Your landlord registration number', 'Rent schedule and payment history', 'Deposit documentation and which approved scheme holds it', 'Gas safety record, EICR and legionella assessment', 'EPC and any energy efficiency improvements', 'Factoring statements for the last two years']],
      ['h2', 'Expect a slightly narrower market'],
      ['p', 'Excluding owner-occupiers removes a portion of buyers, which usually means either a longer marketing period or a modest discount. Where vacant possession is realistically achievable, some sellers do better waiting — we will model both for you.']
    ]
  },
  {
    slug: 'commercial-property-basics',
    image: 'commercial',
    title: 'Commercial property: the basics',
    cat: 'Commercial',
    read: 8,
    date: '2 April 2026',
    excerpt: 'Yields, lease terms, planning use and what due diligence on a commercial unit should actually cover in Scotland.',
    body: [
      ['h2', 'Yield is the headline, covenant is the story'],
      ['p', 'A nine per cent yield from a tenant with a shaky trading history is worth less than six per cent from a national operator on fifteen years. Look at who is paying the rent, and for how long, before you look at the percentage.'],
      ['h2', 'Read the lease properly'],
      ['ul', ['Term remaining and any break options', 'Who is responsible for repair — Scottish commercial leases are commonly full repairing and insuring, putting the burden on the tenant', 'Rent review mechanism and the next review date', 'Permitted use and any restriction on assignation', 'Service charge apportionment across the building', 'Whether the lease is registered in the Books of Council and Session']],
      ['h2', 'Check the planning use class'],
      ['p', 'Scotland has its own Use Classes Order, and it does not map neatly onto the English classes. A unit trading as a café may not be consented for it. Verify the permitted use with the council rather than relying on what is currently operating there, particularly if you intend to change it.'],
      ['h2', 'Building surveys are not optional'],
      ['p', 'The Home Report regime does not apply to commercial property, so there is no survey handed to you. Commission a full building survey covering roof, drainage, electrical installation and any asbestos register. The cost is a fraction of a single unexpected roof replacement.'],
      ['h2', 'Vacant possession changes the maths'],
      ['p', 'An empty unit carries non-domestic rates, insurance and a security bill until it is let, and empty property relief in Scotland is limited. Price that holding cost into your offer — three to six months is a realistic assumption in most secondary locations.']
    ]
  }
];

/* Sector rates used by the indicative appraisal tool, in pounds per square
   metre before the location factor is applied. Deliberately blunt: this is a
   lead-generation estimate, not a Home Report valuation. */
UPBSS.appraisalFactors = {
  Flat: { base: 3600, condition: { excellent: 1.12, good: 1.0, fair: 0.9, refurb: 0.76 } },
  House: { base: 3400, condition: { excellent: 1.14, good: 1.0, fair: 0.88, refurb: 0.72 } },
  Townhouse: { base: 3800, condition: { excellent: 1.13, good: 1.0, fair: 0.89, refurb: 0.74 } },
  Studio: { base: 4000, condition: { excellent: 1.1, good: 1.0, fair: 0.92, refurb: 0.8 } },
  Commercial: { base: 1900, condition: { excellent: 1.1, good: 1.0, fair: 0.9, refurb: 0.78 } },
  Land: { base: 260, condition: { excellent: 1.05, good: 1.0, fair: 0.95, refurb: 0.9 } }
};

/* Leith is the 1.0 baseline. */
UPBSS.locationFactors = {
  'New Town': 1.55, Stockbridge: 1.4, Morningside: 1.35, 'Old Town': 1.3,
  Newington: 1.2, Portobello: 1.15, Corstorphine: 1.05, Leith: 1.0,
  Musselburgh: 0.92, Dalkeith: 0.85
};
