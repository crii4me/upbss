-- ==========================================================================
-- upbss — Supabase schema
-- Run this once in Supabase → SQL Editor → New query → Run.
-- Creates the 4 tables the front end needs, locks them down with row-level
-- security, and (at the bottom) seeds the properties/sold tables with the
-- same listings that used to be hard-coded in assets/js/data.js.
-- ==========================================================================

-- ---------- 1. Live listings ----------------------------------------------
create table if not exists public.properties (
  id          bigint generated always as identity primary key,
  ref         text unique not null,
  title       text not null,
  type        text not null,                 -- Apartment | House | Townhouse | Studio | Commercial | Land
  location    text not null,
  region      text,
  price       numeric not null,
  beds        int not null default 0,
  baths       int not null default 0,
  area        numeric not null,               -- m²
  year        int,                             -- year built, nullable (land plots)
  epc         text,
  tenure      text,
  status      text not null default 'available'
                check (status in ('available', 'under-offer', 'sold')),
  featured    boolean not null default false,
  scene       text,                            -- illustration key used by the front end
  seed        int,                             -- illustration seed used by the front end
  summary     text,
  features    text[] not null default '{}',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ---------- 2. Sold archive -------------------------------------------------
create table if not exists public.sold_properties (
  id          bigint generated always as identity primary key,
  ref         text unique not null,
  title       text not null,
  location    text not null,
  type        text not null,
  price       numeric not null,
  weeks       int,                             -- weeks to offer
  year        int,
  created_at  timestamptz not null default now()
);

-- ---------- 3. Contact form leads ------------------------------------------
create table if not exists public.enquiries (
  id          bigint generated always as identity primary key,
  name        text not null,
  email       text not null,
  phone       text,
  interest    text,                            -- "Type of request" select value
  message     text,
  consent     boolean not null default false,
  source_page text,                            -- which page the form was submitted from
  created_at  timestamptz not null default now()
);

-- ---------- 4. Instant-appraisal leads -------------------------------------
create table if not exists public.appraisal_leads (
  id            bigint generated always as identity primary key,
  name          text not null,
  email         text not null,
  phone         text,
  property_type text,
  location      text,
  area          numeric,
  condition     text,
  year_built    int,
  estimate_low  numeric,
  estimate_high numeric,
  consent       boolean not null default false,
  created_at    timestamptz not null default now()
);

-- ---------- Row Level Security ---------------------------------------------
-- The site only ever uses the public "anon" key, so every permission the
-- browser gets has to be granted explicitly below. Nothing else is possible.

alter table public.properties       enable row level security;
alter table public.sold_properties  enable row level security;
alter table public.enquiries        enable row level security;
alter table public.appraisal_leads  enable row level security;

-- Anyone can read live/sold listings (they're public marketing content).
create policy "public can read properties"
  on public.properties for select
  using (true);

create policy "public can read sold properties"
  on public.sold_properties for select
  using (true);

-- Anyone can submit a lead (INSERT), but nobody using the anon key can read
-- them back — leads are only visible from the Supabase dashboard/Table editor
-- (or an authenticated staff role you add later), which is exactly what you
-- want for a contact/enquiry form.
create policy "public can submit enquiries"
  on public.enquiries for insert
  with check (true);

create policy "public can submit appraisal leads"
  on public.appraisal_leads for insert
  with check (true);

-- ---------- Helpful index for the search/filter page -----------------------
create index if not exists properties_status_idx   on public.properties (status);
create index if not exists properties_type_idx     on public.properties (type);
create index if not exists properties_location_idx on public.properties (location);

-- ==========================================================================
-- Seed data — migrated 1:1 from the original assets/js/data.js
-- Safe to re-run: ON CONFLICT clauses make it idempotent.
-- ==========================================================================

insert into public.properties
  (ref, title, type, location, region, price, beds, baths, area, year, epc, tenure, status, featured, scene, seed, summary, features)
values
  ('UP2291', 'Riverside apartment with double balcony', 'Apartment', 'Linz', 'Upper Austria', 349000, 3, 2, 96, 2016, 'B', 'Freehold', 'available', true, 'tower', 3, 'A bright third-floor apartment on the Danube promenade with two balconies, a fitted kitchen and a garage space included in the price.', ARRAY['Two south-facing balconies','Underground parking space','Fitted Bosch kitchen','Lift access to all floors','Cellar storage unit','District heating']),
  ('UP2288', 'Detached family house with mature garden', 'House', 'Leonding', 'Upper Austria', 615000, 5, 3, 184, 1998, 'C', 'Freehold', 'available', true, 'house', 1, 'Set back from the road on a 720 m² plot, this family house offers five bedrooms, a converted attic studio and a double garage.', ARRAY['720 m² south-facing plot','Double garage + workshop','Converted attic studio','Wood-burning stove','Rainwater harvesting','Fibre broadband']),
  ('UP2284', 'Converted loft studio in the old quarter', 'Studio', 'Vienna', 'Vienna', 268000, 1, 1, 54, 1912, 'D', 'Freehold', 'available', true, 'loft', 5, 'Original beams, four-metre ceilings and a mezzanine sleeping platform, two minutes from the U4 line.', ARRAY['Exposed original beams','4 m ceiling height','Mezzanine platform','Two minutes to U4','Communal roof terrace','Bike store']),
  ('UP2279', 'Ground-floor retail unit on the main square', 'Commercial', 'Graz', 'Styria', 495000, 0, 2, 140, 1975, 'C', 'Freehold', 'under-offer', false, 'shop', 2, 'A 140 m² retail unit with 9 m of frontage onto the main square, currently let to a bakery on a rolling lease.', ARRAY['9 m glazed frontage','Tenant in situ','Rear delivery access','Air conditioning','Basement stock room','A1 planning use']),
  ('UP2275', 'Two-bed apartment with alpine views', 'Apartment', 'Innsbruck', 'Tyrol', 412000, 2, 1, 71, 2009, 'B', 'Freehold', 'available', false, 'tower', 7, 'A quiet top-floor apartment facing the Nordkette, sold with a ski locker and a covered parking bay.', ARRAY['Top-floor, no overlooking','Nordkette mountain views','Ski locker included','Covered parking bay','Triple glazing','Communal sauna']),
  ('UP2270', 'Period townhouse close to the cathedral', 'Townhouse', 'Salzburg', 'Salzburg', 890000, 4, 3, 210, 1889, 'D', 'Freehold', 'available', true, 'terrace', 4, 'Four floors of period detail with a courtyard garden, restored sash windows and a separate one-bed annexe.', ARRAY['Four storeys plus cellar','Private courtyard garden','Restored sash windows','Separate one-bed annexe','Original parquet floors','Listed façade']),
  ('UP2266', 'New-build apartment, energy class A', 'Apartment', 'Wels', 'Upper Austria', 289000, 2, 1, 68, 2024, 'A', 'Freehold', 'available', false, 'tower', 9, 'Completed in 2024 with underfloor heating, a heat pump and a ten-year structural warranty still in place.', ARRAY['Energy class A','Air-source heat pump','Underfloor heating','10-year warranty','Video entry system','Private terrace']),
  ('UP2261', 'Building plot with outline permission', 'Land', 'Steyr', 'Upper Austria', 158000, 0, 0, 640, NULL, '—', 'Freehold', 'available', false, 'land', 6, 'A level 640 m² plot with outline permission for a single dwelling, services already at the boundary.', ARRAY['Outline permission granted','Services at boundary','Level, cleared site','No overhead lines','Quiet cul-de-sac','Road access']),
  ('UP2257', 'Warehouse and office unit, business park', 'Commercial', 'Klagenfurt', 'Carinthia', 720000, 0, 3, 520, 2005, 'C', 'Freehold', 'available', false, 'shop', 8, 'A 520 m² unit combining warehouse space with a first-floor office suite and eight parking spaces.', ARRAY['6 m clear internal height','Roller shutter loading','First-floor office suite','Eight parking spaces','Three-phase power','24-hour site access']),
  ('UP2250', 'Renovated apartment near the university', 'Apartment', 'Linz', 'Upper Austria', 235000, 2, 1, 62, 1968, 'C', 'Freehold', 'available', false, 'tower', 11, 'Fully renovated in 2023 and currently let to students at €980 per month — a ready-made rental investment.', ARRAY['Renovated 2023','Tenanted at €980 pcm','Five minutes to campus','New bathroom','Balcony','Tram at the door']),
  ('UP2244', 'Village house with barn conversion potential', 'House', 'Villach', 'Carinthia', 379000, 4, 2, 156, 1954, 'E', 'Freehold', 'available', false, 'house', 12, 'A traditional village house with an attached stone barn, ripe for conversion subject to the usual consents.', ARRAY['Attached stone barn','Conversion potential','Orchard to the rear','Original tiled stove','Well on site','Village centre']),
  ('UP2239', 'Corner studio with roof terrace', 'Studio', 'Vienna', 'Vienna', 315000, 1, 1, 48, 2019, 'B', 'Freehold', 'under-offer', false, 'loft', 14, 'A compact corner studio on the top floor, sold with an 18 m² private roof terrace and a lift to the door.', ARRAY['18 m² roof terrace','Corner aspect, dual light','Lift to the door','Built-in storage wall','Concierge service','Bike store']),
  ('UP2233', 'Family house with indoor pool', 'House', 'Salzburg', 'Salzburg', 1150000, 6, 4, 320, 2011, 'B', 'Freehold', 'available', true, 'house', 15, 'Six bedrooms, a heated indoor pool and a triple garage on a landscaped 1,400 m² plot with mountain views.', ARRAY['Heated indoor pool','1,400 m² landscaped plot','Triple garage','Guest suite','Home cinema room','Photovoltaic array']),
  ('UP2228', 'Mixed-use building, five apartments', 'Commercial', 'Wels', 'Upper Austria', 1290000, 11, 6, 610, 1962, 'D', 'Freehold', 'available', false, 'terrace', 17, 'Five let apartments over a ground-floor commercial unit, producing €63,000 gross per year.', ARRAY['€63,000 gross yield','Five let apartments','Ground-floor commercial','New roof 2021','Separate meters','Rear parking court']),
  ('UP2221', 'One-bed apartment with lake access', 'Apartment', 'Klagenfurt', 'Carinthia', 219000, 1, 1, 44, 1996, 'C', 'Freehold', 'available', false, 'tower', 19, 'A holiday-let-friendly apartment 300 m from the Wörthersee with a shared jetty and a boat mooring.', ARRAY['300 m from the lake','Shared jetty and mooring','Holiday letting permitted','Furnished as seen','Parking space','Storage cellar']),
  ('UP2215', 'Barn conversion with paddock', 'House', 'Steyr', 'Upper Austria', 545000, 4, 3, 198, 2018, 'B', 'Freehold', 'available', false, 'house', 21, 'A completed barn conversion with a vaulted living room, underfloor heating throughout and a 0.4 ha paddock.', ARRAY['Vaulted living room','0.4 ha paddock','Underfloor heating','Stables and tack room','Air-source heat pump','Private drive']),
  ('UP2208', 'City-centre office floor', 'Commercial', 'Vienna', 'Vienna', 985000, 0, 4, 340, 1988, 'C', 'Freehold', 'available', false, 'shop', 23, 'A whole third floor of 340 m², open plan with four meeting rooms, sold with vacant possession.', ARRAY['Whole floor, open plan','Four meeting rooms','Vacant possession','Raised access floors','Two passenger lifts','Ring road access']),
  ('UP2202', 'Townhouse with courtyard, old town', 'Townhouse', 'Graz', 'Styria', 675000, 3, 2, 165, 1904, 'D', 'Freehold', 'available', false, 'terrace', 25, 'Three bedrooms across two upper floors with a walled courtyard and a vaulted cellar currently used as a studio.', ARRAY['Walled courtyard','Vaulted cellar studio','Original stucco ceilings','Gas central heating','Pedestrian zone','Roof recently relined']),
  ('UP2196', 'Ski-in apartment, resort village', 'Apartment', 'Innsbruck', 'Tyrol', 458000, 2, 2, 78, 2014, 'B', 'Freehold', 'available', false, 'tower', 27, 'Ski-in, ski-out with a rental management agreement in place and an average 62 % occupancy last season.', ARRAY['Ski-in, ski-out','Rental management in place','62 % occupancy last season','Boot room and drying cupboard','Balcony with piste view','Resident parking']),
  ('UP2190', 'Development plot, edge of town', 'Land', 'Linz', 'Upper Austria', 340000, 0, 0, 1450, NULL, '—', 'Freehold', 'available', false, 'land', 29, 'A 1,450 m² plot zoned for residential development, with a pre-application response for four dwellings.', ARRAY['Zoned residential','Pre-app for four dwellings','Mains services adjacent','Level topography','Bus route nearby','No known covenants'])
on conflict (ref) do nothing;

insert into public.sold_properties (ref, title, location, type, price, weeks, year)
values
  ('UP2103', 'Three-bed apartment, Danube view', 'Linz', 'Apartment', 372000, 5, 2026),
  ('UP2088', 'Semi-detached house with garden', 'Wels', 'House', 428000, 7, 2026),
  ('UP2071', 'Retail unit, pedestrian zone', 'Graz', 'Commercial', 610000, 12, 2026),
  ('UP2064', 'Studio near the Naschmarkt', 'Vienna', 'Studio', 289000, 3, 2026),
  ('UP2050', 'Alpine chalet with two annexes', 'Innsbruck', 'House', 1240000, 16, 2025),
  ('UP2039', 'Townhouse, old town', 'Salzburg', 'Townhouse', 795000, 9, 2025),
  ('UP2027', 'Two-bed with lake mooring', 'Klagenfurt', 'Apartment', 264000, 6, 2025),
  ('UP2014', 'Warehouse unit, business park', 'Villach', 'Commercial', 540000, 14, 2025),
  ('UP1998', 'Building plot with permission', 'Steyr', 'Land', 172000, 8, 2025)
on conflict (ref) do nothing;
