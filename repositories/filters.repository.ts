import IFilter from '../controllers/filters/filter.interface';
import ColoursService from '../services/colours.service';
import FiltersService from '../services/filters.service';

export default class FiltersRepository {
  public static async addFilter(model: IFilter): Promise<IFilter | null> {
    if (ColoursService.validateColor(model.colour)) {
      return FiltersService.addFilter(model);
    }

    return Promise.reject();
  }

  public static async getFilters(): Promise<Array<IFilter>> {
    return FiltersService.getFilters();
  }

  public static async getFilter(name: string): Promise<IFilter | null> {
    return FiltersService.getFilter(name);
  }

  public static async removeFilter(name: string): Promise<IFilter | null> {
    return FiltersService.removeFilter(name);
  }

  public static async updateFilter(name: string, filter: IFilter): Promise<IFilter | null> {
    return FiltersService.updateFilter(name, filter);
  }
}