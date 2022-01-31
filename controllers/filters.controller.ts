import express, { NextFunction, Request, Response } from 'express';
import DatabaseException from '../exceptions/database.exception';
import ErrorHandling from '../exceptions/handle-exception';
import FiltersRepository from '../repositories/filters.repository';
import IController from './controller.interface';

export default class FiltersController implements IController {
  public path = '/filters';
  public router = express.Router();

  constructor() {
    this.router.post(this.path, this.addFilter);
    this.router.get(`${this.path}/get-single/:id`, this.getFilter);
    this.router.get(this.path, this.getFilters);
    this.router.put(this.path, this.updateFilter);
    this.router.delete(`${this.path}/:id`, this.removeFilter);
  }

  addFilter = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await FiltersRepository.addFilter(req.body);
      res.status(200).send(result)
    } catch (error) {
      ErrorHandling.handle(next, error);
    };
  }

  getFilter = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const filter = await FiltersRepository.getFilter(req.params.id)
      if (filter) {
        res.send(filter);
      } else {
        next(new DatabaseException());
      }
    } catch (error) {
      ErrorHandling.handle(next, error);
    }
  }

  getFilters = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const filters = await FiltersRepository.getFilters()
      if (filters) {
        res.send(filters);
      } else {
        next(new DatabaseException());
      }
    } catch (error) {
      ErrorHandling.handle(next, error);
    }
  }

  removeFilter = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const filter = await FiltersRepository.removeFilter(req.params.id);
      if (filter) {
        res.send(filter);
      } else {
        next(new DatabaseException());
      }
    } catch (error) {
      ErrorHandling.handle(next, error);
    }
  }

  updateFilter = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const filter = await FiltersRepository.updateFilter(req.body)
      if (filter) {
        res.send(filter);
      } else {
        next(new DatabaseException());
      }
    } catch (error) {
      ErrorHandling.handle(next, error);
    }
  }
}
