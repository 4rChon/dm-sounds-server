import express, { NextFunction, Request, Response } from 'express';
import DatabaseException from '../../exceptions/database.exception';
import DuplicateFilterException from '../../exceptions/duplicate-filter.exception';
import InvalidColourException from '../../exceptions/invalid-color.exception';
import FiltersRepository from '../../repositories/filters.repository';
import IController from '../controller.interface';

export default class FiltersController implements IController {
  public path = '/filters';
  public router = express.Router();

  constructor() {
    this.router.post(this.path, this.addFilter);
    this.router.get(`${this.path}/:name`, this.getFilter);
    this.router.get(this.path, this.getFilters);
    this.router.put(this.path, this.updateFilter);
    this.router.delete(`${this.path}/:name`, this.removeFilter);
  }

  addFilter = (req: Request, res: Response, next: NextFunction) => {
    FiltersRepository.addFilter(req.body)
      .then(result => {
        if (result) {
          next(new DuplicateFilterException());
        } else {
          res.status(200).send({ message: 'Filter added' })
        }
      }).catch(() => {
        next(new InvalidColourException());
      });
  }

  getFilter = (req: Request, res: Response, next: NextFunction) => {
    FiltersRepository.getFilter(req.params.name).then(filter => {
      if (filter) {
        res.send(filter);
      } else {
        next(new DatabaseException());
      }
    });
  }

  getFilters = (req: Request, res: Response, next: NextFunction) => {
    FiltersRepository.getFilters().then(filters => {
      if (filters) {
        res.send(filters);
      } else {
        next(new DatabaseException());
      }
    });
  }

  removeFilter = (req: Request, res: Response, next: NextFunction) => {
    FiltersRepository.removeFilter(req.params.name).then(filter => {
      if (filter) {
        res.send(filter);
      } else {
        next(new DatabaseException());
      }
    });
  }

  updateFilter = (req: Request, res: Response, next: NextFunction) => {
    FiltersRepository.updateFilter(req.body.name, req.body).then(filter => {
      if (filter) {
        res.send(filter);
      } else {
        next(new DatabaseException());
      }
    });
  }
}
