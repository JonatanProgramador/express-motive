import Zod from 'zod';

  export function validatePost(obj) {

    const messageSchema = Zod.object({
      message: Zod.string({
        invalid_type_error: "Tipo invalido",
        required_error: "Campo requerido"
      }),
    });

    return messageSchema.safeParse(obj)
  };

  export function validateFind(obj) {

    const messageSchema = Zod.object({
      author: Zod.string({
        invalid_type_error: "Tipo invalido",
        required_error: "Campo requerido"
      }),
    });

    return messageSchema.safeParse(obj)
  };

  export function validatePartial(obj) {

    const messageSchema = Zod.object({
      message: Zod.string({
        invalid_type_error: "Tipo invalido",
        required_error: "Campo requerido"
      }),
    });

    return messageSchema.safeParse(obj)
  };

  
