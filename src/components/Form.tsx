import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "./errorMessage";

export const Form = () => {
  const validation = z
    .object({
      Nome: z.string().min(1, { message: "Nome é obrigatório." }),
      Sobrenome: z.string().min(1, { message: "Sobrenome é obrigatório." }),
      Email: z
        .string()
        .min(1, { message: "E-mail é obrigatório" })
        .email({ message: "Forneça um E-mail válido." }),
      Senha: z
        .string()
        .min(8, { message: "A senha deve ter no minímo 8 caracteres." }),
      confirmaSenha: z
        .string()
        .min(8, { message: "É preciso confirmar a senha." }),
      termos: z.literal(true ,{
        errorMap: () => ({ message: "Você precisa aceitar os termos de uso." }),
      }),
    })
    .refine((data) => data.Senha === data.confirmaSenha, {
      path: ["confirmaSenha"],
      message: "Senhas são diferentes!",
    });

  type ValidationSchemaForm = z.infer<typeof validation>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ValidationSchemaForm>({
    resolver: zodResolver(validation)
  });

  const resetFields = () => {
    reset({
      Nome: "",
      Sobrenome: "",
      Email: "",
      Senha: "",
      confirmaSenha: "",
    });
  };

  const onSubmit: SubmitHandler<ValidationSchemaForm> = (data) => {
    alert(
      `Dados do usuário registrados com sucesso!
       Nome : ${data.Nome} ${data.Sobrenome}
       E-mail: ${data.Email}
       Senha: ${data.Senha}`
    );
    resetFields()
  };

  return (
    <form className="px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4 md:flex md:justify-between">
        <div className="mb-4 md:mr-2 md:mb-0">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="Nome"
          >
            Nome:
          </label>
          <input
            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
            type="text"
            id="Nome"
            placeholder="Nome"
            {...register("Nome")}
          />
          {errors && <ErrorMessage mensagem={errors.Nome?.message} />}
        </div>

        <div className="md:ml-2">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="Sobrenome"
          >
            Sobrenome:
          </label>
          <input
            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
            id="Sobrenome"
            type="text"
            placeholder="Sobrenome"
            {...register("Sobrenome")}
          />
          {errors && <ErrorMessage mensagem={errors.Sobrenome?.message} />}
        </div>
      </div>
      <div className="mb-4">
        <label
          className="block mb-2 text-sm font-bold text-gray-700"
          htmlFor="email"
        >
          Email:
        </label>
        <input
          className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
          id="email"
          type="email"
          placeholder="Email"
          {...register("Email")}
        />
        {errors && <ErrorMessage mensagem={errors.Email?.message} />}
      </div>
      <div className="mb-4 md:flex md:justify-between">
        <div className="mb-4 md:mr-2 md:mb-0">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="password"
          >
            Senha:
          </label>
          <input
            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
            id="Senha"
            type="password"
            {...register("Senha")}
          />
          {errors && <ErrorMessage mensagem={errors.Senha?.message} />}
        </div>
        <div className="md:ml-2">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="confirmaSenha"
          >
            Confirme a senha:
          </label>
          <input
            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
            id="confirmaSenha"
            type="password"
            {...register("confirmaSenha")}
          />
          {errors && <ErrorMessage mensagem={errors.confirmaSenha?.message} />}
        </div>
      </div>
      <div className="mb-4">
        <input type="checkbox" id="termos" {...register("termos")} />
        <label
          htmlFor="termos"
          className="ml-2 mb-2 text-sm font-bold text-gray-700"
        >
          Aceito os termos de uso.
        </label>
        {errors && <ErrorMessage mensagem={errors.termos?.message} />}
      </div>

      <div className="mb-6 text-center">
        <button
          className="w-full px-4 py-2 font-bold text-white bg-blue-500  hover:bg-blue-700 focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Registrar Conta
        </button>
      </div>
      <hr className="mb-6 border-t" />
      <div className="text-center">
        <a
          className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
          href="#"
        >
          Esqueceu a Senha ?
        </a>
      </div>
      <div className="text-center">
        <a
          className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
          href="#"
        >
          Já possui uma conta ? faça o login!
        </a>
      </div>
    </form>
  );
};
