import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, ScrollView, Image } from 'react-native';
import { VideoView, useVideoPlayer } from 'expo-video';

//Componente de Texto
import Texto from '../componentes/Texto'

export default function Sobre() {

  //Indica o vídeo e coloca ele em loop
  const player = useVideoPlayer(require('../assets/Vídeo_da_Loja_com_Logo_Final.mp4'), player => {
      player.loop = true
      //player.play()
  })

  return (
    <ScrollView style={styles.container}>
      
      <Image source={require('../assets/LogoSprintZone.png')} style={styles.logo} resizeMode="contain"/>
      
      <Texto estiloEspecifico={styles.texto}>Bem-vindo à SprintZone! Somos a sua loja online de artigos esportivos de qualidade premium. Nascemos da paixão por esportes e do compromisso de fornecer os melhores equipamentos para potencializar seu desempenho!
      {'\n'}{'\n'}
      Com mais de 10 anos de experiência, servimos atletas e entusiastas do esporte em todo o Brasil e no exterior.
      {'\n'}
      Nossos produtos são selecionados criteriosamente com os melhores fabricantes mundiais, garantindo qualidade, durabilidade e conforto!
      {'\n'}
      Cada item é testado rigorosamente antes de chegar a você. Contamos com um time dedicado de especialistas em esportes para potencializar suas necessidades.
      {'\n'}{'\n'}
      Descubra a diferença de equipamentos profissionais e alcance seu melhor desempenho com SprintZone!
      </Texto>
      
      <Image source={require('../assets/ImgLoja.png')} style={styles.imagem} resizeMode="contain"/>
      
      <StatusBar style="light" animated />

      <VideoView player={player} style={styles.video} allowsPictureInPicture/>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#004E89',
    paddingHorizontal:16,
  },
  texto:{
    color: 'white',
    paddingVertical: 12,
  },
  imagem:{
    width: '100%',
    height: 280,
    alignSelf: "center",
    marginVertical: 16,
    resizeMode: 'contain',
  },
  logo: {
    width: 300,
    height: 300,
    alignSelf: "center",
  },
  video: {
    width: 350,
    height: 275,
    alignSelf: "center",
  },
});