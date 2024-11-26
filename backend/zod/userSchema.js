const { z } = require('zod');

const userSchema = z.object({
  email: z.string().min(1, { message: "This field has to be filled." }).email("This is not a valid email."),
  username: z.string().regex(/^[^\d][\w]*$/, { message: "Username must not start with a number" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
  role: z.enum(['Admin', 'Editor', 'Viewer'], { message: 'Invalid role' }),
});

module.exports = userSchema;
