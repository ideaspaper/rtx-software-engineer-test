import fetch from 'node-fetch';
import CatFact from './../models/catFact.js';

class CatFactsController {
  /**
   * Find all cat fact records stored in database.
   *
   * @param {string} req
   * @param {*} res
   * @param {*} next
   */
  static async findAll(req, res, next) {
    try {
      const result = await CatFact.findAll();
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Find a cat fact record stored in database by its id.
   *
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
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

  /**
   * Update a cat fact record stored in database by its id.
   *
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
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

  /**
   * Delete a cat fact record stored in database by its id.
   *
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
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

  /**
   * Fetch cat facts from API then store the results in local database.
   *
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async fetchListFromAPI(req, res, next) {
    try {
      const response = await fetch(`${process.env.SOURCE_API}/facts`);
      if (!response.ok) throw { name: 'FailedToFetchFromAPI' };
      const data = await response.json();
      // Map the results following CatFact.create method requirement
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
      // Start inserting data one-by-one to database
      catFacts.forEach(async (catFact) => {
        createPromises.push(CatFact.create(catFact));
      });
      createPromises = await Promise.allSettled(createPromises);
      // Check the promises
      const fulfilledPromises = createPromises.filter((createPromise) => {
        return createPromise.status === 'fulfilled';
      });
      // If all the promises failed then send error response to client
      if (!fulfilledPromises.length) throw { name: 'FailedToFetchAllFacts' };
      // If some promises are fulfilled then send success response to client
      res.status(200).json({
        message: `success to fetch ${fulfilledPromises.length} out of ${createPromises.length} facts`
      });
    } catch (error) {
      next(error);
    }
  }
}

export default CatFactsController;
