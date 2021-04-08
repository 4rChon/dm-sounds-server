import { v4 as uuidv4 } from 'uuid';
import IFilter from '../models/filter.interface';
import FiltersService from '../services/filters.service';

export default class FiltersRepository {
  public static async addFilter(model: IFilter): Promise<IFilter | null | undefined> {
    model.id = uuidv4();
    return FiltersService.addFilter(model);
  }

  public static async getFilters(): Promise<Array<IFilter>> {
    return FiltersService.getFilters();
  }

  public static async getFilter(id: string): Promise<IFilter | null> {
    return FiltersService.getFilter(id);
  }

  public static async removeFilter(id: string): Promise<IFilter | null> {
    return FiltersService.removeFilter(id);
  }

  public static async updateFilter(id: string, filter: IFilter): Promise<IFilter | null> {
    return FiltersService.updateFilter(id, filter);
  }
}