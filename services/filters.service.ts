import IFilter from "../models/filter.interface";
import filterModel from "../mongodb/models/filter.model";

export default class FiltersService {
  public static async addFilter(filter: IFilter): Promise<IFilter | undefined | null> {
    return filterModel.findOneAndUpdate(
      { name: filter.name }, filter, { upsert: true }
    ).lean().exec();
  }

  public static async getFilters(): Promise<Array<IFilter>> {
    return filterModel.find().lean().exec();
  }

  public static async getFilter(name: string): Promise<IFilter | null> {
    return filterModel.findOne({ name }).lean().exec();
  }

  public static async removeFilter(name: string): Promise<IFilter | null> {
    return filterModel.findOneAndDelete({ name }).lean().exec();
  }

  public static async updateFilter(name: string, filter: IFilter): Promise<IFilter | null> {
    return filterModel.findOneAndUpdate({ name }, filter, { new: true }).lean().exec();
  }

  public static async getFiltersByNames(names: Array<string>): Promise<Array<IFilter>> {
    return filterModel.find().where('name').in(names).lean().exec();
  }

  public static async validateFilters(names: Array<string>): Promise<boolean> {
    const count = await filterModel.find().where('name').in(names).countDocuments().exec();
    return count === names.length;
  }
}