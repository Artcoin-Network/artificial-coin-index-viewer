-- listPrices
SELECT * FROM prices;

-- getTokenPrices1M
with a as (
  select min(time) 
  from prices 
  where name = :name
  and date(time) > (current_date - interval '31 days')
  group by date(time))
select * from prices
where name = :name and time in (select min from a)

-- getTokenPrices1W
with a as (
  select min(time) 
  from prices 
  where name = :name
  and date(time) > (current_date - interval '7 days')
  group by DATE_TRUNC('hour', time))
select * from prices
where name = :name and time in (select min from a)

-- getTokenPrices1D
select * from prices
where name = :name
and time > (current_timestamp - interval '1 day');