import { FiltersResponse } from "@/types";

export const getFilters = (filtersData?: FiltersResponse) => {
  if (!filtersData) return [];

  return Object.keys(filtersData).map((key) => {
    if (key === "categories") {
      const allCategories = filtersData.categories || [];
      return allCategories.map((category) => {
        return {
          id: category.id,
          name: category.name,
          options: category.subcategories || [],
        };
      });
    }

    return {
      id: key,
      name: key,
      options: filtersData[key as keyof FiltersResponse] || [],
    };
  }).flat();
};
