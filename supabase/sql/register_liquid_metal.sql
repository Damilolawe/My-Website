-- Liquid Metal is a distinct Signature-only template. Keep existing selection statuses unchanged.
insert into public.awe_templates(id,enabled,label) values('liquidmetal',true,'Liquid Metal')
on conflict(id) do update set label=excluded.label;
