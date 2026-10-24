-- Register the RunwayML-inspired cinematic editorial template in Awe Concepts.
-- Apply after deploying an edge function that recognizes template id 'runwayml'.
insert into public.awe_templates (id, enabled, label)
values ('runwayml', true, 'RunwayML')
on conflict (id) do nothing;
