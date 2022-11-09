import { FormEvent, useState } from "react";
import { toast } from "react-toastify";

import { api } from "../lib/api";

export function NewPoolForm() {
  const [title, setTitle] = useState("");

  async function createPool(event: FormEvent) {
    event.preventDefault();

    try {
      if (!title.trim()) {
        toast.error(`Preencha o nome do bolão!`);
        setTitle("");
        return;
      }

      const response = await api.post("pools", { title });
      const { code } = response.data;

      navigator.clipboard.writeText(code);
      toast.success(`Bolão criado com sucesso! Código: ${code}`);
      setTitle("");
    } catch {
      toast.error(`Erro ao criar o bolão! Tente novamente mais tarde.`);
    }
  }

  return (
    <div>
      <form onSubmit={createPool} className="flex gap-2">
        <input
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          placeholder="Qual nome do seu bolão?"
          className="h-14 px-6  text-gray-200 text-sm bg-gray-700 border border-gray-600 rounded flex-1"
          required
        />
        <button
          type="submit"
          className="h-14 bg-yellow-500 px-2 sm:px-6 text-xs sm:text-sm rounded font-bold uppercase"
        >
          Criar meu bolão
        </button>
      </form>

      <p className="text-gray-300 text-sm leading-relaxed mt-2">
        Após criar seu bolão, você receberá um código único que poderá usar para
        convidar seus amigos 🚀
      </p>
    </div>
  );
}
