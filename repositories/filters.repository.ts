import { FilterModel } from '../models/filter.interface';
import FiltersService from '../services/filters.service';
import { FilterViewModel } from '../view-models/filter.view-model';

export default class FiltersRepository {

  public static async addFilter(model: FilterModel): Promise<FilterViewModel | null | undefined> {
    return FiltersService.addFilter(model);
  }

  public static async updateFilter(model: FilterModel): Promise<FilterViewModel | null> {
    return FiltersService.updateFilter(model);
  }

  public static async getFilters(): Promise<Array<FilterViewModel>> {
    return FiltersService.getFilters();
  }

  public static async getFilter(id: string): Promise<FilterViewModel | null> {
    return FiltersService.getFilter(id);
  }

  public static async removeFilter(id: string): Promise<FilterViewModel | null> {
    return FiltersService.removeFilter(id);
  }
}