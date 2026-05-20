import { createContext, ReactNode, useState } from 'react';

interface Produto {
  id: string;
  nome: string;
  preco: number;
  esporte: string;
  descricao: string;
  imagem?: any;
}

type CarrinhoContextType = {
  carrinho: Produto[];
  adicionarAoCarrinho: (produto: Produto) => void;
  removerDoCarrinho: (id: string) => void;
  limparCarrinho: () => void;
};

export const CarrinhoContext = createContext<CarrinhoContextType>({
  carrinho: [],
  adicionarAoCarrinho: () => {},
  removerDoCarrinho: () => {},
  limparCarrinho: () => {},
});

export function CarrinhoProvider({ children }: { children: ReactNode }) {
  const [carrinho, setCarrinho] = useState<Produto[]>([]);

  const adicionarAoCarrinho = (produto: Produto) => {
    setCarrinho(prevCarrinho => [...prevCarrinho, produto]);
  };

  const removerDoCarrinho = (id: string) => {
    setCarrinho(prev => {
      const index = prev.findIndex(p => p.id === id);
      if (index === -1) return prev;
      const copy = [...prev];
      copy.splice(index, 1);
      return copy;
    });
  };

  const limparCarrinho = () => {
    setCarrinho([]);
  };

  return (
    <CarrinhoContext.Provider value={{ carrinho, adicionarAoCarrinho, removerDoCarrinho, limparCarrinho }}>
      {children}
    </CarrinhoContext.Provider>
  );
}
