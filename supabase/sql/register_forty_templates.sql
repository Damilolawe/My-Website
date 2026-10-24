-- Register original Awe Concepts designs without resetting existing owner decisions.
-- This is reference-informed original work, not a copy of Refero's product.
insert into public.awe_templates (id, enabled, label) values
('arcade',true,'Arcade Night'),
('fieldnotes',true,'Field Notes'),
('cutouts',true,'Cutout Studio'),
('orchard',true,'Orchard Press'),
('specimen',true,'Type Specimen'),
('gazette',true,'The Gazette'),
('negative',true,'Negative Space'),
('workshop',true,'Blueprint Workshop'),
('hearth',true,'Hearth & Home'),
('clinical',true,'The Outline'),
('carryall',true,'Carryall Goods'),
('threshold',true,'Threshold'),
('runway',true,'Gallery White'),
('porcelain',true,'Porcelain Sound'),
('kinetic',true,'Kinetic Club'),
('nightgrid',true,'Night Grid'),
('couture',true,'Couture Notes'),
('signaldeck',true,'Signal Deck'),
('obsidian',true,'Obsidian Film'),
('highlighter',true,'Highlighter')
on conflict (id) do nothing;
