import IColour from '../controllers/colours/colour.interface';
import IFilter from '../controllers/filters/filter.interface';
import FilterService from '../services/filter.service';

export default class FilterRepository {
  public static async addFilter(model: IFilter): Promise<IFilter | null> {
    if (this.validateFilterColor(model.colour)) {
      return FilterService.addFilter(model);
    }

    return Promise.reject();
  }

  public static async getFilters(): Promise<Array<IFilter>> {
    return FilterService.getFilters();
  }

  public static async getFilter(name: string): Promise<IFilter | null> {
    console.log(name);
    return FilterService.getFilter(name);
  }

  public static async removeFilter(name: string): Promise<IFilter | null> {
    return FilterService.removeFilter(name);
  }

  private static validateFilterColor(colour: IColour): boolean {
    return colour.r >= 0 && colour.r <= 1 && colour.g >= 0 && colour.g <= 1 && colour.b >= 0 && colour.b <= 1;
  }
}