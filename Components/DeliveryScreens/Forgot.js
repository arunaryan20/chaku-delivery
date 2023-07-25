import React, {useState, useContext, useEffect} from 'react'
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  Alert,
  Image,
} from 'react-native'

const Forgot = ({navigation}) => {
  const [email, setEmail] = useState()

  const continueHandler = async () => {
    // navigation.navigate("Otp")

    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (emailRegex.test(email) == true) {
    //    const formData=new FormData();
    //    formData.append("email",email)
    const data={
        email:email
    }
        await fetch('https://shopninja.in/chaku/api/d_partner/reset-password', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
          .then(res => {
            console.log('This is response------', res)
            res.json().then(data => {   
              console.log('This is data-------', data)
              if (data.message == 'user not found') {
                Alert.alert('User not found')
              }else if(data.message==="password has been sent to your email"){
                Alert.alert("Your password has been sent to your email")
              }
            })
          })
          .catch(error => {
            console.log('This is error----', error)
          })
      } else {
        Alert.alert('Enter a valid email')
      }
    } catch (error) {
      console.log('Catch error------', error)
    }
  }

  // const validate = () => {
  //     let errors = {}
  //     if (!email) {
  //         errors.email = "Email is required"
  //         setErrors(errors)
  //         return false
  //     }
  //     else if (!/\S+@\S+\.\S+/.test(email)) {
  //         errors.email = 'Invalid email address';
  //         setErrors(errors)
  //         return false
  //     }
  //     else {
  //         setErrors({})
  //         return true
  //     }
  // }

  return (
    <ScrollView
      style={styles.contentScroll}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps={'always'}>
      <StatusBar backgroundColor={'#ffbc2d'} />
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignSelf: 'center',
          marginVertical: 10,
          marginBottom: 25,
        }}>
        <Text
          style={{
            fontSize: 16,
            color: '#000',
            fontWeight: '600',
            alignSelf: 'center',
            marginBottom: 3,
            fontFamily: 'Roboto-Bold',
          }}>
          Forgot Password{' '}
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: '#C4C4C4',
            alignSelf: 'center',
            textAlign: 'center',
            fontFamily: 'Roboto-Regular',
          }}>
          Please enter your email address to recover your password
        </Text>
      </View>

      <Text style={styles.whiteTxt}>Email</Text>

      <TextInput
        color='black'
        placeholderTextColor={'black'}
        name='email'
        placeholder='Enter email'
        style={styles.inp}
        keyboardType='email-address'
        onChangeText={txt => setEmail(txt)}></TextInput>
      <View style={styles.btntop}>
        <TouchableOpacity
          style={styles.btndown}
          onPress={() => continueHandler()}>
          <Text style={styles.txtcontinue}>Continue</Text>
        </TouchableOpacity>
      </View>

      {/* <Button title='Continue' onPress={() => {
                forgotPwd()
                // navigation.navigate('Login')
            }} /> */}
      <View style={styles.rememberPass}>
        <Text style={styles.solidBtnTxt}>You remember your password ?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text
            style={[
              styles.solidBtnTxt,
              {color: '#F5CF04', fontFamily: 'Roboto-Bold'},
            ]}>
            {' '}
            Log in
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const Content = ({navigation, route}) => {}

export default Forgot

const styles = StyleSheet.create({
  contentScroll: {
    display: 'flex',
    height: '100%',
    width: '100%',
    padding: '5%',
    backgroundColor: 'white',
    // borderWidth: 1, borderColor: '#fff'
  },
  whiteTxt: {
    color: '#000',
    fontSize: 18,
    marginVertical: 10,
    fontFamily: 'Roboto-Regular',
  },
  btnRow: {
    marginVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  socialBtn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '45%',
    height: 50,
    borderRadius: 25,
    backgroundColor: '#4267B2',
  },
  solidBtn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 45,
    marginVertical: 15,
    borderRadius: 10,
    backgroundColor: '#f33',
  },
  solidBtnTxt: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'Roboto-Regular',
  },
  inputLabel: {
    color: '#35aecb',
    fontSize: 20,
    fontWeight: '600',
    alignSelf: 'flex-start',
    marginLeft: 15,
    marginBottom: 10,
  },
  inputWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    height: 55,
    paddingLeft: 10,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#444',
    borderWidth: 1,
    borderColor: '#666',
  },
  iconWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: '100%',
  },
  Input: {
    width: '90%',
    height: '100%',
    paddingLeft: 10,
    fontSize: 18,
    color: '#fff',
    fontFamily: 'PTSans-Regular',
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
  forgotBtnWrapper: {
    alignSelf: 'flex-end',
    marginBottom: 25,
    marginTop: 10,
  },
  forgotBtn: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f00',
  },
  whiteBtn: {
    backgroundColor: 'transparent',
    marginTop: 70,
  },
  rememberPass: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 30,
  },
  btntop: {
    marginTop: 20,
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
  txtcontinue: {
    color: 'black',
    fontSize: 15,
  },
  inp: {
    borderWidth: 1,
    borderColor: '#F5CF04',
    borderRadius: 5,
    height: 40,
  },
})
