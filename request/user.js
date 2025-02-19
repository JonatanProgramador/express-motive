import Zod from 'zod';

const userSchema = Zod.object({
    name: Zod.string({
      invalid_type_error: "Tipo invalido",
      required_error: "Campo requerido"
    }),
    password: Zod.string(),
  });


  export function validate(obj) {
    return userSchema.safeParse(obj)
  };

 
