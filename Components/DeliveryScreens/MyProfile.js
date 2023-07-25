import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import App from '../../App';

const MyProfile = ({navigation}) => {
  const [mytoken, setMyToken] = useState('');
  const [modalVisibleP, setModalVisibleP] = useState(false);
  const [modalVisibleD, setModalVisibleD] = useState(false);
  const [oldpass, setOldPass] = useState('');
  const [newpass, setNewPass] = useState('');
  const [opc, setOpc] = useState(1);
  const [name, setName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [phone, setPhone] = useState('');
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      const nm = await AsyncStorage.getItem('name');
      const em = await AsyncStorage.getItem('email');
      const ph = await AsyncStorage.getItem('phone');
      if (value != null) {
        setMyToken('Bearer ' + value);
        setName(nm);
        setUserEmail(em);
        setPhone(ph);
      }
    } catch (e) {
      console.log('This is get data error', e);
    }
  };

  const storeData = async () => {
    try {
      await AsyncStorage.removeItem('token', null);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      await fetch('https://shopninja.in/chaku/api/d_partner/logout', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: mytoken,
        },
      })
        .then(res => {
          res.json().then(data => {
            if (data.message === 'Successfully logged out') {
              storeData();
              navigation.navigate('MainNav');
            }
          });
        })
        .catch(error => {
          console.log('This is error------', error);
        });
    } catch (error) {
      console.log('catch error----', error);
    }
  };

  useEffect(() => {
    getData();
  }, [mytoken]);
  // console.log('Name=====', name, userEmail, phone)

  const closeClickHandler = () => {
    setModalVisibleP(false);
    setModalVisibleD(false);
    setOpc(1);
  };

  const changePasswordHandler = () => {
    setModalVisibleP(true);
    setOpc(0.1);
  };
  const editDetailsClick = () => {
    setModalVisibleD(true);
    setOpc(0.1);
  };

  const editProfileHandler = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', userEmail);
    formData.append('mobile', phone);

    // const data = {
    //   name: name,
    //   email: userEmail,
    //   mobile: phone,
    // }
    if (name.length != 0) {
      if (emailRegex.test(userEmail)) {
        if (phoneRegex.test(phone)) {
          try {
            await fetch(
              'https://shopninja.in/chaku/api/d_partner/edit-profile',
              {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  Authorization: mytoken,
                },
                body: JSON.stringify(formData),
              },
            ).then(res => {
              res
                .json()
                .then(data => {
                  // console.log('Submit data------', JSON.stringify(data))
                  if (data.message === 'updated successfully') {
                    Alert.alert('Profile updated successfully');
                    setModalVisibleD(false);
                    setOpc(1);
                  }
                })
                .catch(error => {
                  console.log('This is data section error---', error);
                });
            });
          } catch (error) {
            console.log('Catch error----', error);
          }
        } else {
          Alert.alert('Please enter your phone');
        }
      } else {
        Alert.alert('Please enter your email');
      }
    } else {
      Alert.alert('Please enter your name');
    }
  };

  const submitClickHandler = async () => {
    const data = {
      old_psw: oldpass,
      new_psw: newpass,
    };
    if (newpass.length > 6) {
      try {
        await fetch(
          'https://shopninja.in/chaku/api/d_partner/change_password',
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: mytoken,
            },
            body: JSON.stringify(data),
          },
        ).then(res => {
          res.json().then(data => {
            if (data.message == 'old password does not match') {
              Alert.alert('old password does not match');
            } else if (data.message == 'password change successfully') {
              Alert.alert('password change successfully');
              setModalVisibleP(false);
              setOpc(1);
            } else {
              Alert.alert('Enter correct password');
            }
          });
        });
      } catch (error) {
        console.log('Catch error-----', error);
      }
    } else {
      Alert.alert('Enter password greater than 6 characters');
    }
  };
  return (
    <View style={{height: '100%', backgroundColor: 'white', opacity: opc}}>
      <View>
        <Image
          source={require('../../Assets/icons/user.png')}
          style={{
            height: 120,
            width: 120,
            borderRadius: 50,
            alignSelf: 'center',
            marginTop: 30,
          }}
        />
      </View>
      <View style={styles.profile}>
        <TouchableOpacity onPress={() => editDetailsClick()}>
          <View style={styles.protop}>
            <Text style={styles.txt3}>Edit Details</Text>
            <Image
              source={require('../../Assets/icons/next1.png')}
              style={styles.img}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => changePasswordHandler()}>
          <View style={styles.protop}>
            <Text style={styles.txt3}>Change Password</Text>
            <Image
              source={require('../../Assets/icons/next1.png')}
              style={styles.img}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Terms')}>
          <View style={styles.protop}>
            <Text style={styles.txt3}>Terms and Conditions</Text>
            <Image
              source={require('../../Assets/icons/next1.png')}
              style={styles.img}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => logout()}>
          <View style={styles.protop}>
            <Text style={styles.txt3}>Logout</Text>
            <Image
              source={require('../../Assets/icons/next1.png')}
              style={styles.img}
            />
          </View>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleP}
        avoidKeyboard={false}
        onRequestClose={() => {
          setModalVisibleP(!modalVisibleP);
          setOpc(1);
        }}>
        <View style={styles.modalv}>
          <TouchableOpacity
            onPress={() => closeClickHandler()}
            style={styles.cross}>
            <Image
              source={require('../../Assets/icons/close.png')}
              style={{height: '100%', width: '100%', tintColor: 'black'}}
            />
          </TouchableOpacity>
          <View style={styles.passv}>
            <Text style={styles.txt1}>Old Password</Text>
            <TextInput
              style={styles.inp}
              placeholder={'Enter old password'}
              color={'black'}
              placeholderTextColor={'black'}
              onChangeText={txt => setOldPass(txt)}
            />
            <Text style={styles.txt2}>New Password</Text>
            <TextInput
              style={styles.inp}
              placeholder={'Enter new password'}
              color={'black'}
              placeholderTextColor={'black'}
              onChangeText={txt => setNewPass(txt)}
            />
            <TouchableOpacity
              onPress={() => submitClickHandler()}
              style={{marginTop: '15%'}}>
              <View style={styles.submitbtn}>
                <Text style={{color: 'black', fontSize: 16, fontWeight: '500'}}>
                  Submit
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleD}
        // avoidKeyboard={false}
        onRequestClose={() => {
          setModalVisibleD(!modalVisibleD);
          setOpc(1);
        }}>
        <View style={styles.modalvD}>
          <TouchableOpacity
            onPress={() => closeClickHandler()}
            style={styles.cross}>
            <Image
              source={require('../../Assets/icons/close.png')}
              style={{height: '100%', width: '100%', tintColor: 'black'}}
            />
          </TouchableOpacity>
          <View style={styles.passv}>
            <Text style={styles.txt1}>Name</Text>
            <TextInput
              value={name}
              style={styles.inp}
              placeholder={'Enter name'}
              color={'black'}
              placeholderTextColor={'black'}
              onChangeText={txt => setName(txt)}
            />
            <Text style={styles.txt2}>Email</Text>
            <TextInput
              value={userEmail}
              style={styles.inp}
              placeholder={'Enter email'}
              color={'black'}
              placeholderTextColor={'black'}
              onChangeText={txt => setUserEmail(txt)}
            />
            <Text style={styles.txt2}>Phone</Text>
            <TextInput
              value={phone}
              style={styles.inp}
              placeholder={'Enter phone'}
              color={'black'}
              placeholderTextColor={'black'}
              onChangeText={txt => setPhone(txt)}
            />
            <TouchableOpacity
              onPress={() => editProfileHandler()}
              style={{marginTop: '15%'}}>
              <View style={styles.submitbtn}>
                <Text style={{color: 'black', fontSize: 16, fontWeight: '500'}}>
                  Submit
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default MyProfile;

const styles = StyleSheet.create({
  // main: {
  //   backgroundColor: 'white',
  //   height: '100%',
  // },
  profile: {
    padding: 20,
  },
  img: {
    height: 25,
    width: 25,
    position: 'absolute',
    marginLeft: '96%',
    tintColor: 'black',
  },
  protop: {
    marginTop: 5,
    flexDirection: 'row',
    borderColor: 'white',
    borderWidth: 0.5,
    borderBottomColor: 'black',
    height: 45,
    width: '100%',
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#F5CF04',
    borderRadius: 5,
  },
  txt3: {
    color: 'black',
    fontSize: 17,
  },
  modalv: {
    alignSelf: 'center',
    height: 300,
    width: '80%',
    backgroundColor: 'grey',
    borderRadius: 5,
    marginTop: '40%',
  },
  modalvD: {
    alignSelf: 'center',
    height: 400,
    width: '80%',
    backgroundColor: 'grey',
    borderRadius: 5,
    marginTop: '20%',
  },
  cross: {
    height: 35,
    width: 35,
    position: 'absolute',
    alignSelf: 'flex-end',
    padding: 8,
  },
  inp: {
    height: 40,
    width: '100%',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white',
  },
  passv: {
    // height:"auto",
    width: '80%',
    alignSelf: 'center',
    paddingTop: 35,
  },
  txt1: {
    color: 'white',
    fontSize: 16,
    paddingBottom: 10,
  },
  txt2: {
    color: 'white',
    fontSize: 16,
    paddingTop: 25,
    paddingBottom: 10,
  },
  submitbtn: {
    height: 40,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5CF04',
    borderRadius: 20,
    alignSelf: 'center',
  },
});
