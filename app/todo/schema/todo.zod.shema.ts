import { z } from "zod";

export const TodoZodSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, {
            message: "El titulo minimo debe contener 1 caracter",
            })
        .max(100, {
            message: "El titulo maximo debe contener 100 caracteres",
            })
        .nonempty({
            message: "El titulo es requerido",
            }),
});