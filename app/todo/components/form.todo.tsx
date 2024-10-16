"use client";

import toast from "react-hot-toast";
import { useRef } from "react";
import { createTodo } from "../actions/todo.action";
import ButtonForm from "./button-form.todo";

import { TodoZodSchema } from "../schema/todo.zod.shema";
import { ZodError } from "zod";

const FormTodo = () => {
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Previene el comportamiento por defecto de enviar el formulario

        const formData = new FormData(formRef.current!);
        const title = formData.get("title") as string;

        try {
            // Validaciones del frontend
            TodoZodSchema.parse({title});

            const responseBackend = await createTodo(title);
            if(!responseBackend.success) {
                return toast.error(responseBackend.message);
            }

            toast.success(responseBackend.message);
        } catch (error) {
            if(error instanceof ZodError) {
                return error.issues.map((issue) => toast.error(issue.message))
            }
        } finally {
            formRef.current?.reset();
        }
    };

    return (
        <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="flex"
        >
            <input 
                type="text" 
                name="title"
                placeholder="Enter the title"
                className="border rounded border-gray-400 mr-2 p-2 w-full" 
            />
            <ButtonForm />
        </form>
    );
};

export default FormTodo;

