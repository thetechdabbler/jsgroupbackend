"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  // create: async (ctx) => {
  //   if (Array.isArray(ctx.request.body)) {
  //     //  if array, loop and return created content.
  //     return "array of content created";
  //   } else {
  //     return strapi.services.warehouse.add(ctx.request.body);
  //   }
  // },

  create: async (ctx) => {
    if (Array.isArray(ctx.request.body)) {
      return await Promise.all(
        ctx.request.body.map(strapi.services.group_user_assignment.create)
      );
    } else {
      return strapi.services.group_user_assignment.create(ctx.request.body);
    }
  },
};
