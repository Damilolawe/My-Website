-- Append ten source-preserved FreeDesignMD templates without modifying existing settings.
insert into public.awe_templates (id,enabled,label) values
('acidchrome',true,'Acid Chrome'),
('voidstage',true,'Voidstage'),
('studiomargaux',true,'Studio Margaux'),
('neomemphis',true,'Neo-Memphis'),
('monobrutalist',true,'Mono Brutalist'),
('vestigefolio',true,'Vestige Folio'),
('botanicalpress',true,'Botanical Press'),
('limepress',true,'Limepress Fintech'),
('gazettebroadside',true,'Gazette Broadside'),
('risograph',true,'Risograph Press')
on conflict (id) do nothing;
