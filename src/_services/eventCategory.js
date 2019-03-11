import { get } from '_helpers/api';

function getAll() {
  return get('eventCategories');
}

export const eventCategoryService = {
  getAll
};
