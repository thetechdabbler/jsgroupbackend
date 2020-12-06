"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  create: async (ctx) => {
    if (Array.isArray(ctx.request.body)) {
      return await Promise.all(
        ctx.request.body.map(strapi.services.assignment.create)
      );
    } else {
      return strapi.services.assignment.create(ctx.request.body);
    }
  },
};
