"use strict";
const { sanitizeEntity } = require('strapi-utils');
/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  create: async (ctx) => {
    const { assignment_id, group_user_ids } = ctx.request.body;
    if (Array.isArray(group_user_ids)) {
      const assignment = await strapi.services["assignment"].findOne({ id: assignment_id });
      const promises = group_user_ids.map(async (group_user_id) => {
        const groupUser = await strapi.services['group-user'].findOne({ id: group_user_id });
        const entity = await strapi.services["group-user-assignment"].create({
          assignment: assignment,
          group_user: groupUser
        });
        return entity;
      });
      const entities = await Promise.all(promises)
      return entities.map(entity => sanitizeEntity(entity, { model: strapi.models["group-user-assignment"] }));
    }
  }
}
