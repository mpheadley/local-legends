-- Entity Graph Seed — 50 NE Alabama subjects
-- Drawn from SL profiles, essays, scraped data, and 26 years of community memory
-- Run AFTER 20260803_entity_graph.sql

INSERT INTO subjects (slug, name, type, city, county, description, ventures, sources, sl_profile, sl_essays) VALUES

-- PEOPLE
('chief-ladiga', 'Chief Ladiga', 'person', 'Cleburne County', 'Cleburne',
 'Last chief of the Muscogee (Creek) Hillabee band in Alabama before removal. The Chief Ladiga Trail bears his name.',
 ARRAY['southern-legends'], ARRAY['anniston-star', 'state-records', 'muscogee-nation-records'],
 NULL, ARRAY['chief-ladiga-trail', 'muscogee-creek-nation-what-remained', 'who-was-chief-ladiga']),

('jean-ellison', 'Jean Ellison', 'person', 'Anniston', 'Calhoun',
 'Music educator and community anchor. Director of noble chorale initiative. Voice of Ecclesia Collective.',
 ARRAY['southern-legends', 'ecclesia'], ARRAY['interview', 'crm'],
 NULL, ARRAY[]),

('jason-wright', 'Jason Wright', 'person', 'Anniston', 'Calhoun',
 'Community leader and Gather Studio client. Subject of testimonial videos.',
 ARRAY['southern-legends', 'gather-studio'], ARRAY['crm', 'interview'],
 NULL, ARRAY[]),

('shannon-jenkins', 'Shannon Jenkins', 'person', 'Anniston', 'Calhoun',
 'Local community figure. Extended interview subject for Southern Legends.',
 ARRAY['southern-legends'], ARRAY['interview'],
 NULL, ARRAY[]),

('donna-barton', 'Donna Barton', 'person', 'Anniston', 'Calhoun',
 'Faith editor at The Anniston Star. Matt''s column contact.',
 ARRAY['southern-legends'], ARRAY['anniston-star'],
 NULL, ARRAY[]),

('samuel-sawyer', 'Samuel Sawyer', 'person', 'Calhoun County', 'Calhoun',
 'Extended interview subject for Southern Legends.',
 ARRAY['southern-legends'], ARRAY['interview'],
 NULL, ARRAY[]),

('kyle-bryan', 'Kyle Bryan', 'person', 'Anniston', 'Calhoun',
 'Implementation lead at Anniston First UMC / Arts & Wellness Center.',
 ARRAY['gather-studio', 'ecclesia'], ARRAY['crm'],
 NULL, ARRAY[]),

('sherill-clontz', 'Sherill Clontz', 'person', 'Anniston', 'Calhoun',
 'UMC District Superintendent. GCO warm lead.',
 ARRAY['gather-studio'], ARRAY['crm'],
 NULL, ARRAY[]),

('renee-rice', 'Renee Rice', 'person', 'Calhoun County', 'Calhoun',
 'Co-owner of Silver Run Chapel. Owner of R&R Travel.',
 ARRAY['southern-legends', 'theaisle'], ARRAY['crm'],
 NULL, ARRAY[]),

('heather-headley', 'Heather Headley', 'person', 'Anniston', 'Calhoun',
 'Florist and flower farmer. Owner of Heather Florals and Bloom Bar. Venue Director at Silver Run Chapel.',
 ARRAY['southern-legends', 'theaisle'], ARRAY['crm'],
 NULL, ARRAY[]),

-- PLACES
('anniston-al', 'Anniston', 'place', 'Anniston', 'Calhoun',
 'County seat of Calhoun County, Alabama. Center of NE Alabama creative and civic life.',
 ARRAY['southern-legends', 'gather-studio', 'ecclesia'], ARRAY['census', 'anniston-star'],
 NULL, ARRAY['noble-street-anniston']),

('noble-street-anniston', 'Noble Street, Anniston', 'place', 'Anniston', 'Calhoun',
 '1300 block anchor for arts, wellness, community organizing. Ecclesia worship host. Former city market site.',
 ARRAY['southern-legends', 'ecclesia', 'gather-studio'], ARRAY['anniston-star', 'site-visit'],
 NULL, ARRAY['noble-street-anniston']),

('oxford-al', 'Oxford', 'place', 'Oxford', 'Calhoun',
 'Largest city in Calhoun County by population. Commercial center along I-20.',
 ARRAY['southern-legends'], ARRAY['census'],
 NULL, ARRAY[]),

('jacksonville-al', 'Jacksonville', 'place', 'Jacksonville', 'Calhoun',
 'Home of Jacksonville State University. Historic town square.',
 ARRAY['southern-legends'], ARRAY['anniston-star', 'calhoun-journal'],
 NULL, ARRAY['jacksonville-opera-theatre']),

('coldwater-mountain', 'Coldwater Mountain', 'place', 'Oxford', 'Calhoun',
 'Trail system and landmark in the Choccolocco Wildlife Management Area.',
 ARRAY['southern-legends'], ARRAY['alabamatrails', 'imba'],
 NULL, ARRAY[]),

('choccolocco-creek', 'Choccolocco Creek', 'place', 'Calhoun County', 'Calhoun',
 'Major waterway running through Calhoun County. Watershed for Lake Logan Martin.',
 ARRAY['southern-legends'], ARRAY['usgs', 'state-records'],
 NULL, ARRAY[]),

('weaver-al', 'Weaver', 'place', 'Weaver', 'Calhoun',
 'Small city in Calhoun County east of Anniston.',
 ARRAY['southern-legends'], ARRAY['census'],
 NULL, ARRAY[]),

('piedmont-al', 'Piedmont', 'place', 'Piedmont', 'Calhoun',
 'City on the Calhoun-Cherokee county line. Known for textile history.',
 ARRAY['southern-legends'], ARRAY['census', 'anniston-star'],
 NULL, ARRAY[]),

('gadsden-al', 'Gadsden', 'place', 'Gadsden', 'Etowah',
 'Etowah County seat. Theatre of Gadsden anchor. Broad Street arts district.',
 ARRAY['southern-legends'], ARRAY['gadsden-times', 'census'],
 NULL, ARRAY[]),

('talladega-al', 'Talladega', 'place', 'Talladega', 'Talladega',
 'Home of Talladega Superspeedway and the Alabama School for the Deaf and Blind.',
 ARRAY['southern-legends'], ARRAY['census', 'anniston-star'],
 NULL, ARRAY[]),

-- TRAILS
('chief-ladiga-trail', 'Chief Ladiga Trail', 'trail', 'Cleburne County', 'Cleburne',
 '33-mile paved rail-trail from Anniston to the Georgia border. Named for the last Hillabee Creek chief.',
 ARRAY['southern-legends'], ARRAY['alabamatrails', 'state-records', 'usfs'],
 NULL, ARRAY['chief-ladiga-trail']),

('coldwater-mountain-trail', 'Coldwater Mountain Trail System', 'trail', 'Oxford', 'Calhoun',
 'IMBA-designated epic ride. Mountain bike and hiking trails on Coldwater Mountain.',
 ARRAY['southern-legends'], ARRAY['imba', 'alabamatrails'],
 NULL, ARRAY[]),

('terrapin-creek-trail', 'Terrapin Creek', 'trail', 'Cleburne County', 'Cleburne',
 'Canoe and kayak route through Cleburne County. State Scenic River.',
 ARRAY['southern-legends'], ARRAY['adcnr', 'usfs'],
 NULL, ARRAY[]),

-- BUSINESSES
('oxford-lumber-ace', 'Oxford Lumber ACE Hardware', 'business', 'Oxford', 'Calhoun',
 'Local ACE Hardware franchise in Oxford. Franchise licensing prospect.',
 ARRAY['southern-legends', 'gather-studio'], ARRAY['foursquare', 'yelp'],
 NULL, ARRAY[]),

('called-coffee', 'Called Coffee', 'business', 'Anniston', 'Calhoun',
 'Coffee shop and gathering space in Anniston. Host of Ecclesia Morning Prayer Tuesdays.',
 ARRAY['southern-legends', 'ecclesia'], ARRAY['foursquare', 'facebook'],
 NULL, ARRAY['the-market-at-six-thirty']),

('heather-florals', 'Heather Florals', 'business', 'Anniston', 'Calhoun',
 'Floral design studio by Heather Headley. Preferred florist at Silver Run Chapel.',
 ARRAY['southern-legends', 'theaisle'], ARRAY['crm', 'facebook'],
 NULL, ARRAY[]),

('marks-woodcrafts', 'Mark''s Woodcrafts', 'business', 'Calhoun County', 'Calhoun',
 'Local woodworking craftsman. Southern Legends profile subject.',
 ARRAY['southern-legends'], ARRAY['crm', 'facebook'],
 'marks-woodcrafts', ARRAY[]),

('r-and-r-travel', 'R&R Travel', 'business', 'Calhoun County', 'Calhoun',
 'Travel agency operated by Renee Rice, co-owner of Silver Run Chapel.',
 ARRAY['southern-legends', 'theaisle'], ARRAY['crm'],
 NULL, ARRAY[]),

('anniston-museum-natural-history', 'Anniston Museum of Natural History', 'organization', 'Anniston', 'Calhoun',
 'State museum in Anniston. Venue for The Aisle Oct 18 bridal expo.',
 ARRAY['southern-legends', 'theaisle'], ARRAY['amag', 'anniston-star'],
 NULL, ARRAY[]),

('jacksonville-state-university', 'Jacksonville State University', 'organization', 'Jacksonville', 'Calhoun',
 'Regional university serving NE Alabama. Matt studied music here.',
 ARRAY['southern-legends'], ARRAY['jsu', 'anniston-star'],
 NULL, ARRAY[]),

('anniston-city-market', 'Anniston City Market', 'organization', 'Anniston', 'Calhoun',
 'Farmers and makers market. Matt ran city market operations (role ended).',
 ARRAY['southern-legends', 'gather-studio'], ARRAY['city-records', 'anniston-star'],
 NULL, ARRAY[]),

('theatre-of-gadsden', 'Theatre of Gadsden', 'organization', 'Gadsden', 'Etowah',
 'Community theatre. Home of CurtainCall platform prospect. Sweeney Todd production site.',
 ARRAY['southern-legends'], ARRAY['tog', 'gadsden-times'],
 NULL, ARRAY[]),

('bloom-bar-anniston', 'Bloom Bar', 'business', 'Anniston', 'Calhoun',
 'Heather Headley''s floral bar concept. Pop-up and event florals.',
 ARRAY['southern-legends', 'theaisle'], ARRAY['crm', 'facebook'],
 NULL, ARRAY[]),

-- CHURCHES
('ecclesia-community', 'Ecclesia Community', 'church', 'Anniston', 'Calhoun',
 'Fresh expression of Christian community founded by Matt Headley. Polycentric, hybrid model. Gathers at Called Coffee and Noble Street.',
 ARRAY['southern-legends', 'ecclesia', 'gather-studio'], ARRAY['os-filings', 'ecclesiacommunity-org'],
 NULL, ARRAY[]),

('anniston-first-umc', 'Anniston First United Methodist Church', 'church', 'Anniston', 'Calhoun',
 'Historic downtown Anniston UMC. Partner in Arts & Wellness Center at 1400 Noble Street.',
 ARRAY['southern-legends', 'ecclesia', 'gather-studio'], ARRAY['umc-records', 'anniston-star'],
 NULL, ARRAY[]),

('afumc-arts-wellness', 'First Center for Arts & Wellness', 'organization', 'Anniston', 'Calhoun',
 'Creative + wellness center at 1400 Noble Street. Hosted by Anniston First UMC. Matt has barter arrangement.',
 ARRAY['southern-legends', 'ecclesia', 'gather-studio'], ARRAY['crm', 'anniston-star'],
 NULL, ARRAY[]),

-- VENUES
('silver-run-chapel', 'Silver Run Chapel', 'venue', 'Calhoun County', 'Calhoun',
 'Historic chapel + 9-acre homestead. Venue for weddings and events. Heather Headley is Venue Director.',
 ARRAY['southern-legends', 'theaisle'], ARRAY['crm', 'site-visit'],
 NULL, ARRAY[]),

('the-aisle-oct-18', 'The Aisle Bridal Expo — Oct 18 2026', 'event', 'Anniston', 'Calhoun',
 'Bridal expo at AMAG, October 18 2026. 25+ vendor target. Make-or-break income event.',
 ARRAY['theaisle', 'southern-legends'], ARRAY['crm', 'vendor-outreach'],
 NULL, ARRAY[]),

-- MUSIC + ARTS
('jacksonville-opera-theatre', 'Jacksonville Opera Theatre', 'organization', 'Jacksonville', 'Calhoun',
 'Community opera company. Matt performed here in 2008 Sweeney Todd production.',
 ARRAY['southern-legends'], ARRAY['jot', 'anniston-star'],
 NULL, ARRAY['jacksonville-opera-theatre']),

('evergreens-band', 'The Evergreens', 'organization', 'Anniston', 'Calhoun',
 'Community band featuring Jean Ellison and Jason Wright. Music ministry of Ecclesia.',
 ARRAY['southern-legends', 'ecclesia'], ARRAY['crm', 'facebook'],
 NULL, ARRAY[]),

-- HISTORICAL
('muscogee-creek-hillabee', 'Muscogee (Creek) Hillabee Band', 'organization', 'Cleburne County', 'Cleburne',
 'Indigenous people of NE Alabama before removal. Chief Ladiga was their last chief.',
 ARRAY['southern-legends'], ARRAY['muscogee-nation-records', 'state-records', 'anniston-star'],
 NULL, ARRAY['muscogee-creek-nation-what-remained', 'who-was-chief-ladiga']),

('berman-museum', 'Berman Museum of World History', 'organization', 'Anniston', 'Calhoun',
 'Anniston museum with world military history collection.',
 ARRAY['southern-legends'], ARRAY['berman', 'anniston-star'],
 NULL, ARRAY[]),

('longleaf-pine-ecosystem', 'Longleaf Pine Ecosystem', 'place', 'Calhoun County', 'Calhoun',
 'Remaining longleaf pine forest fragments in NE Alabama. Conservation and land identity theme.',
 ARRAY['southern-legends'], ARRAY['usfs', 'adcnr', 'tnc'],
 NULL, ARRAY[]),

('choccolocco-wildlife-management', 'Choccolocco Wildlife Management Area', 'place', 'Oxford', 'Calhoun',
 'State WMA east of Oxford. 6,000+ acres. Coldwater Mountain trail system within.',
 ARRAY['southern-legends'], ARRAY['adcnr'],
 NULL, ARRAY[]),

-- MEDIA
('anniston-star', 'The Anniston Star', 'organization', 'Anniston', 'Calhoun',
 'Regional newspaper. Matt has weekly faith column ($25/wk). Donna Barton is faith editor.',
 ARRAY['southern-legends'], ARRAY['consolidated-publishing'],
 NULL, ARRAY[]),

('calhoun-journal', 'The Calhoun County Journal', 'organization', 'Anniston', 'Calhoun',
 'Local news outlet. Covers exact event dates/times Matt uses for SL profiles.',
 ARRAY['southern-legends'], ARRAY['calhoun-journal'],
 NULL, ARRAY[]),

-- PROGRAMS
('neaba', 'Northeast Alabama Business Alliance', 'organization', 'Anniston', 'Calhoun',
 'Regional business network. Potential co-backer for GatherFund.',
 ARRAY['southern-legends', 'gather-studio'], ARRAY['neaba', 'crm'],
 NULL, ARRAY[]),

('collaborative-collective', 'The Collaborative Collective', 'organization', 'Anniston', 'Calhoun',
 'Kevin Bussema''s organization. Key GCO distribution channel.',
 ARRAY['gather-studio'], ARRAY['crm', 'website'],
 NULL, ARRAY[]),

('southern-legends-blog', 'Southern Legends', 'organization', 'Anniston', 'Calhoun',
 'Editorial platform by Matt Headley profiling NE Alabama makers, places, and community.',
 ARRAY['southern-legends'], ARRAY['southernlegends-blog'],
 NULL, ARRAY[]),

('gather-studio', 'Gather Studio', 'organization', 'Anniston', 'Calhoun',
 'Matt Headley''s web + AI + messaging studio. Agency behind all ventures.',
 ARRAY['gather-studio', 'southern-legends'], ARRAY['gatherstudio-app'],
 NULL, ARRAY[])

ON CONFLICT (slug) DO UPDATE SET
  updated_at = now(),
  description = EXCLUDED.description,
  ventures = EXCLUDED.ventures,
  sources = EXCLUDED.sources,
  sl_essays = EXCLUDED.sl_essays;
