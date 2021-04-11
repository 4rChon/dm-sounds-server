import { FilterModel } from "../models/filter.interface";
import filterModel, { FilterLean } from "../mongodb/models/filter.model";

export default class FiltersService {
  public static async addFilter(filter: FilterModel): Promise<FilterLean | null> {
    return filterModel.create(filter);
  }

  public static async updateFilter(filter: FilterModel): Promise<FilterLean | null> {
    return filterModel.findOneAndUpdate(
      { _id: filter._id }, filter, { new: true }
    ).lean().exec();
  }

  public static async getFilters(): Promise<Array<FilterLean>> {
    return await filterModel.find().exec();

  }

  public static async getFilter(id: string): Promise<FilterLean | null> {
    return filterModel.findOne({ _id: id }).lean().exec();
  }

  public static async removeFilter(id: string): Promise<FilterLean | null> {
    return filterModel.findOneAndDelete({ _id: id }).lean().exec();
  }
}