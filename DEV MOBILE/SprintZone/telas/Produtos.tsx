import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, FlatList, TouchableOpacity, Image, Text, Modal } from 'react-native';
import { useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

//Componente de Texto
import Texto from '../componentes/Texto'
import { CarrinhoContext } from '../context/CarrinhoContext';

interface Produto {
  id: string;
  nome: string;
  preco: number;
  esporte: string;
  descricao: string;
  imagem: any;
}

export default function TelaProdutos() {
  const [esporteSelecionado, setEsporteSelecionado] = useState('Todos');
  const [modalVisivel, setModalVisivel] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null);

  const esportes = ['Todos', 'Futebol', 'Vôlei', 'Basquete', 'Natação', 'Corrida', 'Tênis'];

  const abrirModal = (produto: Produto) => {
    setProdutoSelecionado(produto);
    setModalVisivel(true);
  };

  const fecharModal = () => {
    setModalVisivel(false);
    setProdutoSelecionado(null);
  };

  const produtosData: Produto[] = [
    {
      id: '1',
      nome: 'Bola de Futebol Premium',
      preco: 189.90,
      esporte: 'Futebol',
      descricao: 'Bola oficial para competições',
    } as any,
    {
      id: '2',
      nome: 'Chuteira Futebol Profissional',
      preco: 459.90,
      esporte: 'Futebol',
      descricao: 'Design aerodinâmico e confortável',
    } as any,
    {
      id: '3',
      nome: 'Bola de Vôlei Competition',
      preco: 249.90,
      esporte: 'Vôlei',
      descricao: 'Bola oficial para campeonatos',
    } as any,
    {
      id: '4',
      nome: 'Rede de Vôlei Profissional',
      preco: 799.90,
      esporte: 'Vôlei',
      descricao: 'Rede para treino e competição',
    } as any,
    {
      id: '5',
      nome: 'Bola de Basquete oficial',
      preco: 329.90,
      esporte: 'Basquete',
      descricao: 'Bola oficial NBA',
    } as any,
    {
      id: '6',
      nome: 'Tênis Basquete Performance',
      preco: 549.90,
      esporte: 'Basquete',
      descricao: 'Máximo conforto e suporte',
    } as any,
    {
      id: '7',
      nome: 'Fato de Banho Performance',
      preco: 189.90,
      esporte: 'Natação',
      descricao: 'Redução de arrasto na água',
    } as any,
    {
      id: '8',
      nome: 'Óculos de Natação Pro',
      preco: 129.90,
      esporte: 'Natação',
      descricao: 'Visão clara e proteção UV',
    } as any,
    {
      id: '9',
      nome: 'Tênis de Corrida Elite',
      preco: 449.90,
      esporte: 'Corrida',
      descricao: 'Amortecimento avançado',
    } as any,
    {
      id: '10',
      nome: 'Meia de Compressão Corrida',
      preco: 99.90,
      esporte: 'Corrida',
      descricao: 'Melhora circulação e performance',
    } as any,
    {
      id: '11',
      nome: 'Raquete de Tênis Professional',
      preco: 699.90,
      esporte: 'Tênis',
      descricao: 'Controle e potência máximos',
    } as any,
    {
      id: '12',
      nome: 'Bolinha de Tênis Kit com 12',
      preco: 149.90,
      esporte: 'Tênis',
      descricao: 'Bolas de alta qualidade',
    } as any,
  ];

  const produtosFiltrados = esporteSelecionado === 'Todos'
    ? produtosData
    : produtosData.filter(p => p.esporte === esporteSelecionado);

  const renderizarFiltro = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={[
        styles.botaoFiltro,
        esporteSelecionado === item && styles.botaoFiltroAtivo
      ]}
      onPress={() => setEsporteSelecionado(item)}
    >
      <Text style={[
        styles.textoBotaoFiltro,
        esporteSelecionado === item && styles.textoBotaoFiltroAtivo
      ]}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  const navigation = useNavigation<any>();
  const { adicionarAoCarrinho } = useContext(CarrinhoContext);

  const renderizarProduto = ({ item }: { item: Produto }) => (
    <TouchableOpacity style={styles.cardProduto} onPress={() => abrirModal(item)} activeOpacity={0.85}>
      <View style={styles.containerImagem}>
        <Image
          source={require('../assets/Logo.png')}
          style={styles.imagemProduto}
          resizeMode="contain"
        />
        {/* Deixando espaço comentado para adicionar imagem depois */}
        {/* <Image source={{uri: item.imagem}} style={styles.imagemProduto} /> */}
      </View>

      <View style={styles.infosProduto}>
        <Text style={styles.nomeProduto}>{item.nome}</Text>
        
        <Text style={styles.descricaoProduto}>{item.descricao}</Text>
        
        <View style={styles.linhaEsporte}>
          <View style={styles.badgeEsporte}>
            <Text style={styles.textoEsporte}>{item.esporte}</Text>
          </View>
        </View>

        <Text style={styles.precoProduto}>R$ {item.preco.toFixed(2)}</Text>

        <TouchableOpacity
          style={styles.botaoAdicionar}
          onPress={() => {
            adicionarAoCarrinho(item);
            navigation.navigate('Carrinho');
          }}
        >
          <Text style={styles.textoBotaoAdicionar}>Adicionar ao Carrinho</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderizarHeader = () => (
    <View>
      <View style={styles.headerProdutos}>
        <Texto estiloEspecifico={styles.tituloProdutos}>
          Nossos Produtos
        </Texto>
      </View>

      {/* Filtro por Esporte */}
      <View style={styles.containerFiltro}>
        <Texto estiloEspecifico={styles.labelFiltro}>
          Filtrar por Esporte:
        </Texto>
        <FlatList
          data={esportes}
          renderItem={renderizarFiltro}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listaFiltros}
          scrollEnabled={true}
        />
      </View>
    </View>
  );

  return (
    <>
      <Modal
        visible={modalVisivel}
        transparent
        animationType="fade"
        onRequestClose={fecharModal}
      >
        <View style={styles.modalFundo}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitulo}>Detalhes do Produto</Text>
            {produtoSelecionado && (
              <>
                <View style={styles.modalImagemContainer}>
                  <Image
                    source={require('../assets/Logo.png')}
                    style={styles.modalImagem}
                    resizeMode="contain"
                  />
                </View>
                <Text style={styles.modalNome}>{produtoSelecionado.nome}</Text>
                <Text style={styles.modalDescricao}>{produtoSelecionado.descricao}</Text>
                <View style={styles.modalLinha}>
                  <Text style={styles.modalLabel}>Esporte:</Text>
                  <Text style={styles.modalValor}>{produtoSelecionado.esporte}</Text>
                </View>
                <View style={styles.modalLinha}>
                  <Text style={styles.modalLabel}>Preço:</Text>
                  <Text style={styles.modalValor}>R$ {produtoSelecionado.preco.toFixed(2)}</Text>
                </View>
                <Text style={styles.modalInfo}>
                  Uma ótima escolha para quem busca qualidade e conforto nas atividades esportivas.
                </Text>
              </>
            )}
            <TouchableOpacity style={styles.botaoFecharModal} onPress={fecharModal}>
              <Text style={styles.textoBotaoFechar}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <FlatList
        data={produtosFiltrados}
        renderItem={renderizarProduto}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderizarHeader}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      />
      <StatusBar style="dark" animated />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 60,
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  headerProdutos: {
    marginBottom: 20,
  },
  tituloProdutos: {
    color: '#FF6B35',
    fontSize: 28,
    fontWeight: '700',
  },
  containerFiltro: {
    marginBottom: 20,
  },
  labelFiltro: {
    color: '#004E89',
    fontSize: 14,
    marginBottom: 10,
  },
  listaFiltros: {
    paddingRight: 16,
    gap: 8,
  },
  botaoFiltro: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    borderWidth: 1.5,
    borderColor: '#004E89',
  },
  botaoFiltroAtivo: {
    backgroundColor: '#FF6B35',
    borderColor: '#FF6B35',
  },
  textoBotaoFiltro: {
    color: '#004E89',
    fontFamily: 'FontePadrao',
    fontSize: 12,
    fontWeight: '600',
  },
  textoBotaoFiltroAtivo: {
    color: 'white',
  },
  cardProduto: {
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 16,
  },
  containerImagem: {
    width: '100%',
    height: 200,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#FF6B35',
  },
  imagemProduto: {
    width: '80%',
    height: '80%',
  },
  infosProduto: {
    padding: 16,
  },
  nomeProduto: {
    color: '#FF6B35',
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'FontePadrao',
    marginBottom: 6,
  },
  descricaoProduto: {
    color: '#666666',
    fontSize: 12,
    fontFamily: 'FontePadrao',
    lineHeight: 18,
    marginBottom: 10,
  },
  linhaEsporte: {
    marginBottom: 10,
  },
  badgeEsporte: {
    alignSelf: 'flex-start',
    backgroundColor: '#FF6B35',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  textoEsporte: {
    color: 'white',
    fontSize: 11,
    fontWeight: '700',
    fontFamily: 'FontePadrao',
  },
  precoProduto: {
    color: '#004E89',
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'FontePadrao',
    marginBottom: 12,
  },
  botaoAdicionar: {
    backgroundColor: '#FF6B35',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoBotaoAdicionar: {
    color: 'white',
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'FontePadrao',
  },
  modalFundo: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
  },
  modalTitulo: {
    fontSize: 18,
    color: '#FF6B35',
    fontWeight: '700',
    marginBottom: 14,
    fontFamily: 'FontePadrao',
  },
  modalNome: {
    fontSize: 16,
    color: '#004E89',
    fontWeight: '700',
    marginBottom: 10,
    fontFamily: 'FontePadrao',
  },
  modalDescricao: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 12,
    fontFamily: 'FontePadrao',
    lineHeight: 20,
  },
  modalLinha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  modalLabel: {
    color: '#004E89',
    fontSize: 13,
    fontWeight: '700',
    fontFamily: 'FontePadrao',
  },
  modalValor: {
    color: '#004E89',
    fontSize: 13,
    fontFamily: 'FontePadrao',
  },
  modalInfo: {
    color: '#666666',
    fontSize: 13,
    marginBottom: 20,
    fontFamily: 'FontePadrao',
    lineHeight: 20,
  },
  modalImagemContainer: {
    width: '100%',
    height: 180,
    backgroundColor: '#F8F8F8',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalImagem: {
    width: '70%',
    height: '70%',
  },
  botaoFecharModal: {
    backgroundColor: '#004E89',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  textoBotaoFechar: {
    color: 'white',
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'FontePadrao',
  },
});
