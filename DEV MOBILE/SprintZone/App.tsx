//React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';

//Ícones
import Ionicons from '@expo/vector-icons/Ionicons';

//Importação da Fonte
import { useFonts, Montserrat_700Bold } from "@expo-google-fonts/montserrat"

//Menu SOBRE
import TelaSobre from "./telas/Sobre"

//Menu PRODUTOS
import TelaProdutos from "./telas/Produtos"

//Menu CARRINHO
import TelaCarrinho from "./telas/Carrinho"

//Menu PERFIL
import TelaPerfil from "./telas/Perfil"

//Contexto do Carrinho
import { CarrinhoProvider } from "./context/CarrinhoContext"

//MENU - BOTTOM TABS
const Tab = createBottomTabNavigator();

function Menu(){
  return <Tab.Navigator
            screenOptions={({route})=>({
              tabBarIcon:({focused, color, size})=>{
                let iconName: any;

                if(route.name==="Sobre"){
                  iconName = focused ? 'information-circle' : 'information-circle-outline';
                }else if(route.name==="Produtos"){
                  iconName = focused ? 'basketball' : 'basketball-outline';
                }else if(route.name==="Carrinho"){
                  iconName = focused ? 'cart' : 'cart-outline';
                }else if(route.name==="Perfil"){
                  iconName = focused ? 'person' : 'person-outline';
                }
                return <Ionicons name={iconName} size={size} color={color}/>
              },
              headerShown: false,
              tabBarActiveTintColor: '#FF6B35',
              tabBarInactiveTintColor: '#004E89',
              tabBarStyle: { backgroundColor: '#FFFFFF', borderTopColor: '#E0E0E0' },
            })}
          >
            <Tab.Screen name="Sobre" component={TelaSobre}/>
            <Tab.Screen name="Produtos" component={TelaProdutos}/>
            <Tab.Screen name="Carrinho" component={TelaCarrinho}/>
            <Tab.Screen name="Perfil" component={TelaPerfil}/>
        </Tab.Navigator>
}

export default function App() {

  //Carrega a fonte
  const [fonteCarregada] = useFonts({"FontePadrao": Montserrat_700Bold});

  //Verifica se a fonte foi carregada
  if(!fonteCarregada){
    return <View />
  }

  return <CarrinhoProvider>
            <NavigationContainer>
              <Menu />
            </NavigationContainer>
          </CarrinhoProvider>
  
}
