import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Torch from 'react-native-torch';
import RNShake from 'react-native-shake';

import imageLightOff from './assets/icons/eco-light-off.png';
import imageLightOn from './assets/icons/eco-light.png';
import dioWhite from './assets/icons/logo-dio-white.png';
import dio from './assets/icons/logo-dio.png';

const App = () => {
  const [toggle, setToggle] = useState(false);
  const handleChangeToggle = () => setToggle(oldToggle => !oldToggle);

  useEffect(() => {
    // Liga flash celular
    Torch.switchState(toggle);
  }, [toggle]);

  useEffect(() => {
    //Quando o celular chacoalhar, mudaremos o toggle
    const subscription = RNShake.addListener(() => {
      setToggle(oldToggle => ! oldToggle);
    })

    // Função é chamada quando o compenente é desmontado
    return () => subscription.remove();
  })

  return (
    <View style={toggle ? style.containerlight : style.container}>
      <TouchableOpacity onPress={handleChangeToggle}>
        <Image
          style={toggle ? style.lightingOn : style.lightingOff}
          source={toggle ? imageLightOn : imageLightOff}
        />
        <Image style={style.dioLogo} source={toggle ? dio : dioWhite} />
      </TouchableOpacity>
    </View>
  );
};

export default App;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerlight: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightingOn: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 150,
    height: 150,
  },
  lightingOff: {
    resizeMode: 'contain',
    alignSelf: 'center',
    tintColor: 'white',
    width: 150,
    height: 150,
  },
  dioLogo: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 250,
    height: 250,
  },
});
