export const TIME_UNITS = [
  {
    symbol: 's',
    name: 'Second',
    aliases: ['second', 'seconds', 's', 'sec'],
    baseValue: 1,
  },
  {
    symbol: 'min',
    name: 'Minute',
    aliases: ['minute', 'minutes', 'min'],
    baseValue: 60,
  },
  {
    symbol: 'h',
    name: 'Hour',
    aliases: ['hour', 'hours', 'h', 'hr'],
    baseValue: 3600,
  },
  {
    symbol: 'day',
    name: 'Day',
    aliases: ['day', 'days', 'd'],
    baseValue: 86400,
  },
  {
    symbol: 'week',
    name: 'Week',
    aliases: ['week', 'weeks', 'w'],
    baseValue: 604800,
  },
  {
    symbol: 'month',
    name: 'Month',
    aliases: ['month', 'months'],
    baseValue: 2592000, // 30 days average
  },
  {
    symbol: 'year',
    name: 'Year',
    aliases: ['year', 'years', 'yr', 'a'],
    baseValue: 31536000, // 365 days
  },
];
