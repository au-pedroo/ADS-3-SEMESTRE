import { StatusBar } from 'expo-status-bar';
import { useContext } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, Text } from 'react-native';

import Texto from '../componentes/Texto';
import { CarrinhoContext } from '../context/CarrinhoContext';

export default function TelaCarrinho() {
  const { carrinho, limparCarrinho } = useContext(CarrinhoContext);
  const total = carrinho.reduce((soma, item) => soma + item.preco, 0);

  const { removerDoCarrinho } = useContext(CarrinhoContext);

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.itemCarrinho}>
      <View style={styles.itemLinha}>
        <Text style={styles.itemNome}>{item.nome}</Text>
        <Text style={styles.itemPreco}>R$ {item.preco.toFixed(2)}</Text>
      </View>
      <Text style={styles.itemEsporte}>{item.esporte}</Text>
      <Text style={styles.itemDescricao}>{item.descricao}</Text>
      <View style={styles.itemActions}>
        <TouchableOpacity style={styles.botaoRemover} onPress={() => removerDoCarrinho(item.id)}>
          <Text style={styles.textoBotaoRemover}>Remover</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.topo}>
        <Texto estiloEspecifico={styles.titulo}>Carrinho de Compras</Texto>
        <Text style={styles.subtitulo}>Confira os itens adicionados e finalize a compra.</Text>
      </View>

      {carrinho.length === 0 ? (
        <View style={styles.vazioContainer}>
          <Text style={styles.vazioTexto}>Seu carrinho está vazio por enquanto.</Text>
        </View>
      ) : (
        <FlatList
          data={carrinho}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.lista}
          showsVerticalScrollIndicator={false}
        />
      )}

      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalValor}>R$ {total.toFixed(2)}</Text>
      </View>

      {carrinho.length > 0 && (
        <TouchableOpacity style={styles.botaoLimpar} onPress={limparCarrinho}>
          <Text style={styles.textoBotaoLimpar}>Limpar Carrinho</Text>
        </TouchableOpacity>
      )}

      <StatusBar style="dark" animated />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 20,
  },
  topo: {
    marginBottom: 16,
  },
  titulo: {
    color: '#FF6B35',
    fontSize: 28,
    fontWeight: '700',
  },
  subtitulo: {
    color: '#004E89',
    fontSize: 14,
    marginTop: 8,
  },
  vazioContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vazioTexto: {
    color: '#666666',
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  lista: {
    paddingBottom: 20,
  },
  itemCarrinho: {
    backgroundColor: '#F8F8F8',
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
  },
  itemLinha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  itemNome: {
    color: '#FF6B35',
    fontSize: 16,
    fontWeight: '700',
  },
  itemPreco: {
    color: '#004E89',
    fontSize: 16,
    fontWeight: '700',
  },
  itemEsporte: {
    color: '#004E89',
    fontSize: 12,
    marginBottom: 6,
  },
  itemDescricao: {
    color: '#666666',
    fontSize: 13,
    lineHeight: 20,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  totalLabel: {
    color: '#004E89',
    fontSize: 16,
    fontWeight: '700',
  },
  totalValor: {
    color: '#FF6B35',
    fontSize: 18,
    fontWeight: '700',
  },
  botaoLimpar: {
    backgroundColor: '#FF6B35',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  textoBotaoLimpar: {
    color: 'white',
    fontSize: 14,
    fontWeight: '700',
  },
  itemActions: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  botaoRemover: {
    backgroundColor: '#E53935',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  textoBotaoRemover: {
    color: 'white',
    fontSize: 13,
    fontWeight: '700',
  },
});
