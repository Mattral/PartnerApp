// ==============================|| PRODUCT - SORT FILTER ||============================== //
// PROJECT IMPORTS
import { SortOptionsProps } from 'types/e-commerce';

const SortOptions: SortOptionsProps[] = [
  {
    value: 'high',
    label: 'Rating: High To Low'
  },
  {
    value: 'low',
    label: 'Rating: Low To High'
  },
  {
    value: 'popularity',
    label: 'Popularity'
  },
  {
    value: 'discount',
    label: 'Discount'
  },
  {
    value: 'new',
    label: 'Latest'
  }
];

export default SortOptions;
