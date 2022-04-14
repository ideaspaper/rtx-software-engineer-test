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
      const failedPromise = createPromises.find((createPromise) => {
        return createPromise.status === 'rejected';
      });
      if (failedPromise) throw { name: 'FailedToFetchSomeFacts' };
      res.status(200).json({ message: 'success' });
    } catch (error) {
      next(error);
    }
  }
}

export default CatFactsController;
