const { z } = require('zod');

const roleChangeSchema = z.object({
  role: z.enum(['Admin', 'Editor', 'Viewer'], { message: 'Invalid role' }),
});

module.exports = roleChangeSchema;