import fetch from 'node-fetch';
import CatFact from './../models/catFact.js';

class CatFactsController {
  static async findAll(req, res, next) {
    try {
      const result = await CatFact.findAll();
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async findById(req, res, next) {
    const { id } = req.params;
    try {
      const result = await CatFact.findById(id);
      if (!result.length) throw { name: 'NotFound' };
      res.status(200).json(result[0]);
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    const { text, source, type, verified } = req.body;
    const { id } = req.params;
    try {
      const result = await CatFact.update([id, text, source, type, verified]);
      if (!result) throw { name: 'NotFound' };
      res.status(200).json({ message: 'cat fact has been updated' });
    } catch (error) {
      next(error);
    }
  }

  static async destroy(req, res, next) {
    const { id } = req.params;
    try {
      const result = await CatFact.destroy(id);
      if (!result) throw { name: 'NotFound' };
      res.status(200).json({ message: 'cat fact has been deleted' });
    } catch (error) {
      next(error);
    }
  }

  static async fetchListFromAPI(req, res, next) {
    try {
      const response = await fetch(`${process.env.SOURCE_API}/facts`);
      if (!response.ok) throw { name: 'FailedToFetchFromAPI' };
      const data = await response.json();
      const catFacts = data.map((element) => {
        return [
          element._id,
          element.user,
          element.text,
          element.source,
          element.updatedAt,
          element.type,
          element.createdAt,
          element.status.verified
        ];
      });
      let createPromises = [];
      catFacts.forEach(async (catFact) => {
        createPromises.push(CatFact.create(catFact));
      });
      createPromises = await Promise.allSettled(createPromises);
      const fulfilledPromises = createPromises.filter((createPromise) => {
        return createPromise.status === 'fulfilled';
      });
      if (!fulfilledPromises.length) throw { name: 'FailedToFetchAllFacts' };
      res.status(200).json({
        message: `success to fetch ${fulfilledPromises.length} out of ${createPromises.length} facts`
      });
    } catch (error) {
      next(error);
    }
  }
}

export default CatFactsController;
