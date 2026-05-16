import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ScrollView, View, Image, TouchableOpacity, Text, TextInput } from 'react-native';
import { useState } from 'react';

//Ícones
import Ionicons from '@expo/vector-icons/Ionicons';

//Componente de Texto
import Texto from '../componentes/Texto'

export default function TelaPerfil() {
  const [nome, setNome] = useState('João Silva');
  const [email, setEmail] = useState('joao@example.com');
  const [whatsapp, setWhatsapp] = useState('(11) 99999-9999');
  const [isEditando, setIsEditando] = useState(false);

  const handleMudarFoto = () => {
    // Aqui você pode adicionar a lógica para abrir a câmera ou galeria
    console.log('Abrir câmera/galeria');
  };

  const handleSalvarAlteracoes = () => {
    setIsEditando(false);
    // Aqui você pode adicionar a lógica para salvar os dados
    console.log('Dados salvos:', { nome, email, whatsapp });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      {/* Seção de Foto de Perfil */}
      <View style={styles.secaoFoto}>
        <View style={styles.containerFoto}>
          <Image
            source={require('../assets/Logo.png')}
            style={styles.fotoPerfil}
            resizeMode="contain"
          />
          {/* Deixando espaço comentado para adicionar foto do usuário depois */}
          {/* <Image source={{uri: fotoUsuario}} style={styles.fotoPerfil} /> */}
        </View>
        
        <TouchableOpacity 
          style={styles.botaoCamara}
          onPress={handleMudarFoto}
        >
          <Ionicons name="camera" size={20} color="white" />
        </TouchableOpacity>
      </View>

      {/* Seção de Informações */}
      <View style={styles.secaoInfo}>
        <View style={styles.containerCampo}>
          <Text style={styles.labelCampo}>Nome</Text>
          <TextInput
            style={[styles.input, !isEditando && styles.inputDesabilitado]}
            value={nome}
            onChangeText={setNome}
            editable={isEditando}
            placeholder="Digite seu nome"
            placeholderTextColor="#999"
            keyboardType="default"
          />
        </View>

        <View style={styles.containerCampo}>
          <Text style={styles.labelCampo}>Email</Text>
          <TextInput
            style={[styles.input, !isEditando && styles.inputDesabilitado]}
            value={email}
            onChangeText={setEmail}
            editable={isEditando}
            placeholder="Digite seu email"
            placeholderTextColor="#999"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.containerCampo}>
          <Text style={styles.labelCampo}>WhatsApp</Text>
          <TextInput
            style={[styles.input, !isEditando && styles.inputDesabilitado]}
            value={whatsapp}
            onChangeText={setWhatsapp}
            editable={isEditando}
            placeholder="(XX) XXXXX-XXXX"
            placeholderTextColor="#999"
            keyboardType="phone-pad"
          />
        </View>
      </View>

      {/* Botões de Ação */}
      <View style={styles.secaoBotoes}>
        {!isEditando ? (
          <TouchableOpacity 
            style={styles.botaoEditar}
            onPress={() => setIsEditando(true)}
          >
            <Ionicons name="pencil" size={18} color="white" />
            <Text style={styles.textoBotaoEditar}>Editar Perfil</Text>
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity 
              style={styles.botaoSalvar}
              onPress={handleSalvarAlteracoes}
            >
              <Ionicons name="checkmark" size={18} color="white" />
              <Text style={styles.textoBotaoSalvar}>Salvar Alterações</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.botaoCancelar}
              onPress={() => setIsEditando(false)}
            >
              <Ionicons name="close" size={18} color="white" />
              <Text style={styles.textoBotaoCancelar}>Cancelar</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      <StatusBar style="dark" animated />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 60,
  },
  secaoFoto: {
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 20,
  },
  containerFoto: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#FF6B35',
    overflow: 'hidden',
  },
  fotoPerfil: {
    width: '90%',
    height: '90%',
  },
  botaoCamara: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#FF6B35',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  secaoInfo: {
    marginBottom: 30,
    backgroundColor: '#F9F9F9',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  containerCampo: {
    marginBottom: 18,
  },
  labelCampo: {
    color: '#004E89',
    fontSize: 13,
    fontWeight: '700',
    fontFamily: 'FontePadrao',
    marginBottom: 10,
    letterSpacing: 0.3,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: '#004E89',
    fontFamily: 'FontePadrao',
    fontSize: 15,
    fontWeight: '600',
    elevation: 1,
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  inputDesabilitado: {
    backgroundColor: '#F5F5F5',
    borderColor: '#E8E8E8',
    color: '#999999',
  },
  secaoBotoes: {
    gap: 12,
    marginBottom: 30,
  },
  botaoEditar: {
    backgroundColor: '#FF6B35',
    paddingVertical: 15,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    elevation: 4,
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  textoBotaoEditar: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'FontePadrao',
  },
  botaoSalvar: {
    backgroundColor: '#00A86B',
    paddingVertical: 15,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    elevation: 4,
    shadowColor: '#00A86B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  textoBotaoSalvar: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'FontePadrao',
  },
  botaoCancelar: {
    backgroundColor: '#CCCCCC',
    paddingVertical: 15,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  textoBotaoCancelar: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'FontePadrao',
  },
});
