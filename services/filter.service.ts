
import IFilter from '../controllers/filters/filter.interface';
import filterModel from '../models/filter.model';

export default class FilterService {
  public static async addFilter(filter: IFilter): Promise<IFilter | null> {
    return filterModel.findOneAndUpdate(
      { name: filter.name }, filter, { upsert: true }
    ).exec();
  }

  public static async getFilters(): Promise<Array<IFilter>> {
    return filterModel.find().exec();
  }

  public static async getFilter(name: string): Promise<IFilter | null> {
    console.log(name);
    return filterModel.findOne({ name }).exec();
  }

  public static async removeFilter(name: string): Promise<IFilter | null> {
    return filterModel.findOneAndDelete({ name }).exec();
  }
}