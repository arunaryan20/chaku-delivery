import React, {useState, useContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  PixelRatio,
  View,
  TextInput,
  ScrollView,
  Image,
  StatusBar,
  Alert,
} from 'react-native';
import {ContinousBaseGesture} from 'react-native-gesture-handler/lib/typescript/handlers/gestures/gesture';
import MainBottom from './MainBottom';

const Login = ({navigation}) => {
  const [email, setemail] = useState();
  const [password, setPassword] = useState();
  const [errors, setErrors] = useState({});
  const [isSelected, setIsSelected] = useState(false);
  const [vcount, setVCount] = useState(0);
  const [tkn, setTkn] = useState(null);

  let getToken = async () => {
    let token = await AsyncStorage.getItem('token');
    setTkn(token);
  };

  useEffect(() => {
    getToken();
    setTimeout(() => {
      setVCount(3);
    }, 3000);
  }, [tkn]);

  const storeData = async (value, nm, em, ph) => {
    try {
      await AsyncStorage.setItem('token', value);
      await AsyncStorage.setItem('name', nm);
      await AsyncStorage.setItem('email', em);
      await AsyncStorage.setItem('phone', ph);
      if (isSelected == true) {
        await AsyncStorage.setItem('remember', 'true');
      } else {
        await AsyncStorage.setItem('remember', 'false');
      }
    } catch (e) {
      console.log('Async storage error----', e);
    }
  };

  const signinClickHandler = () => {
    console.log('Res---- click');
    const data = {
      email: email,
      password: password,
    };
    try {
      fetch('https://shopninja.in/chaku/api/d_partner/login', {
        method: 'POST',
        headers: {
          Accept: 'applicatioin/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(res => {
          console.log('Res----', res);
          res
            .json()
            .then(data => {
              if (data.status == 200) {
                storeData(
                  data.accessToken,
                  data.user.name,
                  data.user.email,
                  data.user.mobile,
                );
                return navigation.navigate('MainNav');
              } else {
                Alert.alert('Enter valid email and password');
              }
            })
            .catch(error => {
              Alert.alert('Enter valid email and password');
            });
        })
        .catch(error => {
          Alert.alert('Enter valid email and password');
        });
    } catch (error) {
      Alert.alert('Enter valid email and password');
    }
  };

  return (
    <View style={styles.contentScroll}>
      {vcount == 0 ? (
        <View>
          <Image
            source={require('../../Assets/icons/Splash1.png')}
            style={{height: '100%', width: '100%', alignSelf: 'center'}}
          />
        </View>
      ) : (
        <View style={{flex: 1, height: '100%'}}>
          <View>
            <View style={{padding: '5%'}}>
              <Text
                style={[
                  styles.heading,
                  {marginBottom: 50, textAlign: 'center'},
                ]}>
                Login Account
              </Text>

              <Text style={[styles.subHeading, {marginBottom: 5}]}>Email</Text>
              <TextInput
                // value={email}
                placeholderTextColor={'black'}
                color={'black'}
                style={styles.inp}
                placeholder="Enter your email"
                error={errors.email ? true : false}
                keyboardType="email-address"
                onChangeText={text => {
                  setemail(text);
                }}></TextInput>
              <Text
                style={[styles.subHeading, {marginBottom: 5, marginTop: 30}]}>
                Password
              </Text>
              <TextInput
                // value={password}
                placeholderTextColor={'black'}
                color={'black'}
                style={styles.inp}
                placeholder="Enter your password"
                keyboardType="default"
                secureTextEntry={true}
                onChangeText={setPassword}></TextInput>
              <View style={styles.rowAlign}>
                <TouchableOpacity
                  style={styles.forgotBtnWrapper}
                  onPress={() => navigation.navigate('Forgot')}>
                  <Text style={styles.forgotBtn}>Forgot Password ?</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.btntop}>
                <TouchableOpacity
                  onPress={() => signinClickHandler()}
                  style={styles.btndown}>
                  <Text style={styles.txtsignin}>Sign in</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
    // {/* </ScrollView> */}
  );
};

export default Login;

const styles = StyleSheet.create({
  contentScroll: {
    // display: 'flex',
    height: '100%',
    width: '100%',
    // padding: '5%',
    backgroundColor: 'white',
    flex: 1,
  },
  heading: {
    fontSize: 18,
    color: '#000',
    fontFamily: 'Roboto-Bold',
    marginBottom: 5,
  },
  subHeadingBold: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'Roboto-SemiBold',
  },
  subHeading: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'Roboto-Medium',
    // paddingLeft:"5%"
  },
  smTxt: {
    fontSize: 12,
    color: '#000',
    fontFamily: 'Roboto-Regular',
  },
  regTxt: {
    fontSize: 14,
    color: '#000',
    fontFamily: 'Roboto-Regular',
  },
  fontMedium: {
    fontFamily: 'Roboto-Medium',
  },
  rowAlign: {
    marginTop: 20,
    display: 'flex',
    // flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
    marginBottom: 20,
  },

  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // marginLeft: 10,
    // borderWidth:1,borderColor:'#fff'
  },
  checkbox: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: 25,
    height: 25,
    marginRight: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#F5CF04',
  },
  forgotBtn: {
    fontSize: 14,
    // color: '#fc9918'
    color: '#F5CF04',

    fontFamily: 'Roboto-Medium',
  },

  orWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    marginVertical: 40,
  },
  orline: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopColor: '#aaa',
    borderTopWidth: 1,
    width: '30%',
  },
  orTxt: {
    // marginTop: -16.5,
    fontSize: 20,
    fontWeight: '600',
    backgroundColor: 'transparent',
    color: '#aaa',
    width: 50,
    textAlign: 'center',
  },

  whiteBtn: {
    backgroundColor: 'transparent',
    marginTop: 15,
    fontWeight: 500,
    color: '#fe0000',
    marginVertical: 25,
    width: '100%',
    alignItems: 'center',
  },
  fbButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 45,
    borderRadius: 6,
    backgroundColor: '#3228C5',
    marginBottom: 15,
  },
  socialButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 55,
    // marginTop:45,
    borderRadius: 5,
    backgroundColor: '#fff',
    shadowColor: '#000',
    elevation: 4,
    // for ios below
    shadowOffset: {width: 5, height: 5},
  },
  googleIcon: {
    width: 22,
    height: 22,
    marginRight: 20,
  },
  socialBtnTxt: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  inp: {
    borderWidth: 1,
    borderColor: '#ffbc2d',
    borderRadius: 5,
    height: 40,
  },
  btntop: {
    alignSelf: 'center',
    width: '100%',
    height: 54,
  },
  btndown: {
    height: 45,
    width: '100%',
    backgroundColor: '#F5CF04',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  txtsignin: {
    color: 'black',
    fontSize: 15,
  },
});
