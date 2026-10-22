-- Add the fourteen new design IDs without changing owner-disabled existing designs.
-- Idempotent; all six original IDs are preserved and remain unchanged.
insert into public.awe_templates (id, enabled, label) values
('atlas',true,'Atlas / Grid'),
('terminal',true,'Terminal 01'),
('orbit',true,'Orbit 360'),
('playbill',true,'The Playbill'),
('monologue',true,'Monologue'),
('portraiture',true,'Portraiture'),
('contactsheet',true,'Contact Sheet'),
('atelier',true,'Maison Atelier'),
('museum',true,'Museum Notes'),
('brutalist',true,'Brutalist Press'),
('nocturne',true,'Nocturne'),
('foundry',true,'The Foundry'),
('bloom',true,'Bloom House'),
('ledger',true,'Ledger & Co.')
on conflict (id) do nothing;
