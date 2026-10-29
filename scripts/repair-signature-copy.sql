-- Copy correction only. Keep all prices, terms versions, allowed designs and
-- existing order snapshots intact. Safe to repeat.
update public.awe_packages
set data=jsonb_set(data,'{features}',(
 select jsonb_agg(to_jsonb(case f.value
  when 'Five separate, connected pages: Home, Research, Work, Studio and Journal'
   then 'Five connected pages with navigation tailored to your selected design'
  when 'RunwayML cinematic multi-page design with personalized client content'
   then 'Your selected Signature design personalized with your content'
  else f.value end) order by f.ordinality)
 from jsonb_array_elements_text(data->'features') with ordinality as f(value,ordinality)
))
where data->>'tier'='signature' and coalesce(data->>'testOnly','false')<>'true'
 and data->'features' ?| array[
  'Five separate, connected pages: Home, Research, Work, Studio and Journal',
  'RunwayML cinematic multi-page design with personalized client content'
 ];
