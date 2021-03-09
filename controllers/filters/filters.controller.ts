import express, { NextFunction, Request, Response } from 'express';
import DatabaseException from '../../exceptions/database.exception';
import DuplicateFilterException from '../../exceptions/duplicate-filter.exception';
import InvalidColourException from '../../exceptions/invalid-color.exception';
import FilterRepository from '../../repositories/filter.repository';
import IController from '../controller.interface';

export default class FiltersController implements IController {
  public path = '/filters';
  public router = express.Router();

  constructor() {
    this.router.post(this.path, this.addFilter);
    this.router.get(`${this.path}/:name`, this.getFilter);
    this.router.get(this.path, this.getFilters);
    this.router.delete(`${this.path}/:name`, this.removeFilter);
  }

  addFilter = (req: Request, res: Response, next: NextFunction) => {
    FilterRepository.addFilter(req.body)
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
    FilterRepository.getFilter(req.params.name).then(filter => {
      if (filter) {
        res.send(filter);
      } else {
        next(new DatabaseException());
      }
    });
  }

  getFilters = (req: Request, res: Response, next: NextFunction) => {
    FilterRepository.getFilters().then(filters => {
      if (filters) {
        res.send(filters);
      } else {
        next(new DatabaseException());
      }
    });
  }

  removeFilter = (req: Request, res: Response, next: NextFunction) => {
    FilterRepository.removeFilter(req.params.name).then(filter => {
      if (filter) {
        res.send(filter);
      } else {
        next(new DatabaseException());
      }
    });
  }
}
