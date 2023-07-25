import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  Alert,
  ScrollView,
  ActivityIndicator,
  ImageBackground,
} from 'react-native'
import React, {useEffect, useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const t = ','
const OrderDetails = ({navigation, route}) => {
  const [flag, setFlag] = useState(route.params.status)
  let orderStatus = 'Done'
  const [modalVisible, setModalVisible] = useState(false)
  const [disabledata, setDisableData] = useState(false)
  const [cuscolor, setCusColor] = useState('white')
  const [num, setNum] = useState(1)
  const [userData, setUserData] = useState(route.params.data)
  const [ordstatus, setOrderStatus] = useState(route.params.status)
  const [mytoken, setMyToken] = useState('')
  const [alldata, setAllData] = useState()

  //  console.log("order data-----",route.params.data)



 

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('token')
      if (value != null) {
        setMyToken('Bearer ' + value)
      }
    } catch (e) {
      console.log('This is get data error', e)
    }
  }

  const fetchData = async () => {
    try {
      let url = 'subscription_id=' + userData
      await fetch(
        'https://shopninja.in/chaku/api/d_partner/get-subscription?' + url,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: mytoken,
          },
        },
      )
        .then(res => {
          console.log('this is res----', res)
          res.json().then(data => {
            setAllData(data.subscription)
            // console.log('data---------------',alldata)
          })
        })
        .catch(error => {
          console.log('This is error------', error)
        })
    } catch (error) {
      console.log('Catch error-----', error)
    }
  }

  

  useEffect(() => {
    getData()
    fetchData()
  }, [mytoken,2])


  const statusClickHandler = async index => {
   
    const data = {
      service_id: userData,
      status: index,
    }
    try {
      await fetch(
        'https://shopninja.in/chaku/api/d_partner/update_service_status',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: mytoken,
          },
          body: JSON.stringify({
            service_id:userData,
            status:index
          })
        },
      )
        .then(res => {
         
          res.json().then(data => {
           
            if(data.subscription=="status has been updated"){ 
               setFlag(data.service_status)
            }
           
          }).catch((error)=>{
            console.log("Data error----",error)
          })
        })
        .catch(error => {
          console.log('modal error--------', error)
        })
    } catch (error) {
      console.log('Catch error----------', error)
           
    }
  }

  const statusHandler = data => {
    if (flag == data - 1) {
      setDisableData(false)
      Alert.alert('Do you want to change', 'Status ?', [
        {
          text: 'Cancel',
          // onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => statusClickHandler(data)},
      ])
    } else {
      setDisableData(true)
    }
  }

  const statusUpdateClick = () => {
    setModalVisible(true)
    //  setCusColor("#be9843")
    setCusColor('grey')
    setNum(0.1)
  }

  const closeClickHandler = () => {
    setModalVisible(false)
    setCusColor('white')
    setNum(1)
  }
  return (
    <View style={{flex: 1, backgroundColor: cuscolor, opacity: num}}>
      <TouchableOpacity
        style={styles.backbtn}
        onPress={() => navigation.navigate('MainBottom')}>
        <Image
          source={require('../../Assets/icons/back.png')}
          style={{height: 25, width: 25, margin: 10}}
        />
      </TouchableOpacity>
      <View style={styles.headid}>
        <Text style={styles.txtid}># {userData}</Text>
      </View>
      <View style={styles.ord}>
        <Text style={styles.txtorderDetails}>Order Details</Text>
        {ordstatus == 0 && (
          <Text style={[styles.txtord, {color: 'blue'}]}>Pending</Text>
        )}
        
        {ordstatus == 1 && (
          <Text style={[styles.txtord, {color: 'red'}]}>Active</Text>
        )}
        {ordstatus == 5 && (
          <Text style={[styles.txtord, {color: 'green'}]}>Completed</Text>
        )}
        {ordstatus != 1 && orderStatus != 5 && orderStatus != 0 && (
          <Text style={[styles.txtord, {color: 'orange'}]}>Processing</Text>
        )}
        {/* {orderStatus == 'Pending' && (
          <Text style={[styles.txtord, {color: 'yellow'}]}>{orderStatus}</Text>
        )}
        {orderStatus == 'New' && (
          <Text style={[styles.txtord, {color: 'blue'}]}>{orderStatus}</Text>
        )} */}
      </View>
      {alldata == null ? (
        <View style={styles.loader}>
          <ActivityIndicator size='large' color='#0000ff' />
        </View>
      ) : (
        <ScrollView>
          <View>
            {alldata != null && (
              <FlatList
                data={alldata.subscribed_items}
                renderItem={({item}) => (
                  <View style={styles.flatmain}>
                    <Image
                      source={{uri: item.product.image}}
                      style={{height: 40, width: 40}}
                    />
                    <View style={styles.txtnp}>
                      <Text style={{color: 'black', fontSize: 17}}>
                        {item.product.name}
                      </Text>
                      {/* <Text style={{color: 'black'}}>₹ {item.price}</Text> */}
                    </View>
                    <Text style={styles.txtqty}>Qty: {item.no_of_items}</Text>
                  </View>
                )}
              />
            )}
          </View>
          <View style={styles.pricev}>
            <View>
              <Text
                style={{
                  color: 'red',
                  paddingLeft: 20,
                  fontSize: 18,
                  fontWeight: '500',
                }}>
                Total Price
              </Text>
            </View>
            <View>
              <Text
                style={{
                  color: 'black',
                  paddingLeft: '40%',
                  fontWeight: '500',
                  fontSize: 18,
                }}>
                ₹ {alldata != null && alldata.amount}
              </Text>
            </View>
          </View>
          <View style={styles.custop}>
            <Text style={{fontSize: 18, color: 'black'}}>Customer Details</Text>
            <View>
              <View style={styles.cusrow}>
                <Image
                  source={require('../../Assets/icons/name.png')}
                  style={{height: 20, width: 20}}
                />
                <Text style={styles.txt1}>
                  {alldata != null && JSON.parse(alldata.address_id).name}
                </Text>
              </View>
              <TouchableOpacity>
                <View style={styles.cusrow}>
                  <Image
                    source={require('../../Assets/icons/phone.png')}
                    style={{height: 15, width: 15}}
                  />
                  <Text style={styles.txt1}>
                    {alldata != null && JSON.parse(alldata.address_id).mobile}
                  </Text>
                </View>
              </TouchableOpacity>
              {/* <TouchableOpacity>
              <View style={styles.cusrow}>
                <Image
                  source={require('../../Assets/icons/gmail.png')}
                  style={{height: 15, width: 15}}
                />
                <Text style={styles.txt1}> {alldata!=null &&
                alldata.customer.email
                } </Text>
              </View>
            </TouchableOpacity> */}
              <View style={styles.cusrow}>
                <TouchableOpacity
                  style={{marginRight: '3%'}}
                  onPress={() => navigation.navigate('Map')}>
                  <Image
                    source={require('../../Assets/icons/location.png')}
                    style={{height: 20, width: 20}}
                  />
                </TouchableOpacity>
                <View>
                  <Text style={styles.txtaddress}>
                    House no-{' '}
                    {alldata != null && JSON.parse(alldata.address_id).house_no}
                    , Street no-{' '}
                    {alldata != null && JSON.parse(alldata.address_id).street},
                    {alldata != null && JSON.parse(alldata.address_id).landmark}
                    ,{alldata != null && JSON.parse(alldata.address_id).town},
                    {alldata != null && JSON.parse(alldata.address_id).state},
                    {alldata != null && JSON.parse(alldata.address_id).country},
                    Pin code-{' '}
                    {alldata != null && JSON.parse(alldata.address_id).pin_code}
                  </Text>
                  {/* <Text style={styles.txtaddress}>
                  Street- 
                  {alldata!=null &&
                JSON.parse(alldata.address_id).street
                } 
                </Text>
                <Text style={styles.txtaddress}>
                  Landmark- 
                  {alldata!=null &&
                JSON.parse(alldata.address_id).landmark
                } 
                </Text>
                <Text style={styles.txtaddress}>
                  Town- 
                  {alldata!=null &&
                JSON.parse(alldata.address_id).town
                } 
                </Text>
                <Text style={styles.txtaddress}>
                  state- 
                  State- {JSON.parse(alldata.address_id).state}
                </Text>
                <Text style={styles.txtaddress}>
                  country- 
                  Country- {JSON.parse(alldata.address_id).country}
                </Text>
                <Text style={styles.txtaddress}>
                  pin- 
                  Pin code- {JSON.parse(alldata.address_id).pin_code}
                </Text> */}
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      )}
      <View style={styles.btntop}>
        <TouchableOpacity
          style={styles.btndown}
          onPress={() => statusUpdateClick()}>
          <Text style={styles.txtsignin}>Update Status</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible)
          setCusColor('white')
        }}>
        <View>
          <ImageBackground
            source={require('../../Assets/icons/backg.png')}
            style={{height: '100%', width: '100%'}}>
            <View style={styles.mdlv}>
              <TouchableOpacity
                style={styles.cross}
                onPress={() => closeClickHandler()}>
                <Image
                  source={require('../../Assets/icons/close.png')}
                  style={{height: 15, width: 15, tintColor: 'black'}}
                />
              </TouchableOpacity>
              <View style={styles.ordv}>
                {flag >= 1 ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      padding: 18,
                    }}>
                    <Text style={{color: 'white', fontSize: 18}}>
                      Order pickup
                    </Text>
                    <Image
                      source={require('../../Assets/icons/check.png')}
                      style={styles.check}
                    />
                  </View>
                ) : (
                  <TouchableOpacity
                    onPress={() => statusHandler(1)}
                    style={{margin: 18}}>
                    <Text style={{color: 'black', fontSize: 18}}>
                      Order pickup
                    </Text>
                  </TouchableOpacity>
                )}
                {flag >= 2 ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      padding: 18,
                    }}>
                    <Text style={{color: 'white', fontSize: 18}}>
                      Submited for service
                    </Text>
                    <Image
                      source={require('../../Assets/icons/check.png')}
                      style={styles.check}
                    />
                  </View>
                ) : (
                  <TouchableOpacity onPress={() => statusHandler(2)}>
                    <Text style={{color: 'black', fontSize: 18, padding: 18}}>
                      Submited for service
                    </Text>
                  </TouchableOpacity>
                )}
                {flag >= 3 ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      padding: 18,
                    }}>
                    <Text style={{color: 'white', fontSize: 18}}>
                      Ready to ship
                    </Text>
                    <Image
                      source={require('../../Assets/icons/check.png')}
                      style={styles.check}
                    />
                  </View>
                ) : (
                  <TouchableOpacity onPress={() => statusHandler(3)}>
                    <Text style={{color: 'black', fontSize: 18, padding: 18}}>
                      Ready to ship
                    </Text>
                  </TouchableOpacity>
                )}

                {flag >= 4 ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      padding: 18,
                    }}>
                    <Text style={{color: 'white', fontSize: 18}}>
                      Out for delivery
                    </Text>
                    <Image
                      source={require('../../Assets/icons/check.png')}
                      style={styles.check}
                    />
                  </View>
                ) : (
                  <TouchableOpacity onPress={() => statusHandler(4)}>
                    <Text style={{color: 'black', fontSize: 18, padding: 18}}>
                      Out for delivery
                    </Text>
                  </TouchableOpacity>
                )}
                {flag >= 5 ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      padding: 18,
                    }}>
                    <Text style={{color: 'white', fontSize: 18}}>
                      Item delivered
                    </Text>
                    <Image
                      source={require('../../Assets/icons/check.png')}
                      style={styles.check}
                    />
                  </View>
                ) : (
                  <TouchableOpacity
                    onPress={() => statusHandler(5)}
                    disabled={disabledata}>
                    <Text style={{color: 'black', fontSize: 18, padding: 18}}>
                      Item delivered
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </ImageBackground>
        </View>
      </Modal>
    </View>
  )
}

export default OrderDetails

const styles = StyleSheet.create({
  headid: {
    width: '100%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:"#dbe3e6",
  },
  txtid: {
    fontSize: 20,
    fontWeight: '500',
    color: 'black',
  },
  backbtn: {
    position: 'absolute',
    height: 25,
    width: 25,
    zIndex: 9999,
  },
  txtorderDetails: {
    color: 'black',
    fontSize: 20,
    // padding: 10,
  },
  flatmain: {
    marginTop: 10,
    width: '80%',
    elevation: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 5,
    // justifyContent:"center",
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: 15,
    alignItems: 'center',
  },
  txtnp: {
    paddingLeft: '5%',
  },
  txtqty: {
    position: 'absolute',
    marginLeft: '85%',
    color: 'black',
    fontWeight:"500"
  },
  custop: {
    // height:200,
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 8,
    marginTop: 20,
    padding: 5,
    alignSelf: 'center',
    marginBottom: 150,
  },
  cusrow: {
    flexDirection: 'row',
    paddingLeft: '5%',
    padding: '5%',
  },
  txt1: {
    paddingLeft: '10%',
    color: 'black',
    fontSize: 15,
  },
  btntop: {
    alignSelf: 'center',
    width: '80%',
    height: 54,
    position: 'absolute',
    // marginTop: '175%',
    bottom: 0,
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
  ord: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  txtord: {fontSize: 18, fontWeight: '500', color: 'red', paddingLeft: '36%'},
  mdlv: {
    width: '80%',
    alignSelf: 'center',
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'grey',
    marginTop: '60%',
  },
  cross: {
    height: 25,
    width: 25,
    position: 'absolute',
    marginLeft: '96%',
    marginTop: 10,
  },
  check: {
    height: 20,
    width: 20,
    tintColor: 'white',
    marginLeft: 20,
  },
  txtaddress: {color: 'gray', fontSize: 16},
  pricev: {
    height: 50,
    backgroundColor: 'white',
    borderRadius: 5,
    width: '80%',
    elevation: 10,
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
  },
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
