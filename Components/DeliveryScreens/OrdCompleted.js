import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Modal,
  TextInput,
  ActivityIndicator,
  RefreshControl,
} from 'react-native'
import React, {useEffect, useState, useCallback} from 'react'
import SelectDropdown from 'react-native-select-dropdown'
import AsyncStorage from '@react-native-async-storage/async-storage'
import babelConfig from '../../babel.config'

const OrdCompleted = ({navigation, route}) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [searchtxt, setSearchText] = useState('')
  const [searchdata, setSearchData] = useState(null)
  const [mytoken, setMyToken] = useState('')
  const [count, setCount] = useState(-1)
  const [refreshing, setRefreshing] = useState(false)

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
    // console.log('my token-------', mytoken)
    try {
      await fetch(
        'https://shopninja.in/chaku/api/d_partner/get-subscriptions',
        {
          method: 'GET',
          headers: {
            Accept: 'applicatioin/json',
            'Content-Type': 'application/json',
            Authorization: mytoken,
          },
        },
      )
        .then(res => {
          res
            .json()
            .then(data => {
             
              setSearchData(data.data.done_services)
              setCount(1)
            })
            .catch(error => {
              console.log('Data Error-----', error)
            })
        })
        .catch(error => {
          console.log('This is error=-----', error)
        })
    } catch (error) {
      console.log('This is catch error---', error)
    }
  }
  useEffect(() => {
    if (searchtxt != '') {
      let result = searchdata.filter(function (item) {
        return item.name.includes(searchtxt)
      })
      setSearchData(result)
    } else {
      fetchData()
      setCount(-1)
      // console.log("myid----",id);
      // console.log("Search Data-----",searchdata);
    }
  }, [searchtxt])

  useEffect(() => {
    getData()
    fetchData()
  }, [mytoken, count])

  // console.log('search data-----', searchdata)

  const clickHadler = (item, item2) => {
    navigation.navigate('OrderDetails', {data: item, status: item2})
  }
  // console.log("id-----------",id);
  const filterData = ['By status', 'By name', 'By date']

  const searchCloseHandler = () => {
    setCount(-1)
    fetchData()

    // setSearchData(data);
    setSearchText('')
  }

  const onRefresh = useCallback(() => {
    // setSearchData("")
   

    getData()
  
    setRefreshing(true)
    
    fetchData()
    setTimeout(()=>{
     setRefreshing(false)
    },3000)
  }, [mytoken]);

  // const onRefresh = useCallback(() => {
   
  //     setSearchData("")
  //    setRefreshing(true)
    
  //         fetchData()
  //         setTimeout(()=>{
  //          setRefreshing(false)
  //         },3000)
       
  // }, [])

  return (
    <View style={styles.main}>
      {searchdata == null ? (
        <View style={styles.loader}>
          <ActivityIndicator size='large' color='#0000ff' />
        </View>
      ) : (
        <View>
          <View style={styles.head}>
            <View style={styles.searchView}>
              <TouchableOpacity style={{height: 45, width: 45, padding: 8}}>
                <Image
                  source={require('../../Assets/icons/search.png')}
                  style={{height: 23, width: 23}}
                />
              </TouchableOpacity>
              <TextInput
                value={searchtxt}
                onChangeText={txt => setSearchText(txt)}
                placeholder='Search here'
                color={'black'}
                placeholderTextColor={'black'}
                style={{height: '100%', width: '100%'}}
              />
              <TouchableOpacity
                onPress={() => searchCloseHandler()}
                style={styles.searchclose}>
                <Image
                  source={require('../../Assets/icons/close.png')}
                  style={{height: 15, width: 15, tintColor: 'grey'}}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{marginBottom: 100}}>
            <FlatList
              data={searchdata}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              renderItem={({item}) => (
                <View style={styles.flatmain}>
                  <TouchableOpacity
                    onPress={() => clickHadler(item.id, item.service_status)}>
                    <View style={styles.flatin}>
                      <Text style={styles.txtid}>
                      OrderID: {JSON.stringify(item.id)}
                      </Text>
                      {item.service_status == 1 && (
                        <Text style={[styles.txtunactive, {color: 'red'}]}>
                          Active
                        </Text>
                      )}
                      {item.service_status == 5 && (
                        <Text style={[styles.txtunactive, {color: 'green'}]}>
                          Completed
                        </Text>
                      )}
                      {item.service_status == 0 && (
                        <Text style={[styles.txtunactive, {color: 'blue'}]}>
                          Pending
                        </Text>
                      )}

                      {item.service_status != 1 &&
                        item.service_status != 5 &&
                        item.service_status != 0 && (
                          <Text style={[styles.txtunactive, {color: 'orange'}]}>
                            Processing
                          </Text>
                        )}

                      {/* {item.orderStatus == 'Pending' && (
                    <Text style={styles.txtpending}>{item.orderStatus}</Text>
                  )}
                  {item.orderStatus == 'New' && (
                    <Text style={styles.txtnew}>{item.orderStatus}</Text>
                  )} */}
                    </View>
                    <View style={styles.flatin}>
                      <Text style={styles.txt1}>{item.name}</Text>
                      <Text style={styles.txt2}>₹ {item.amount}</Text>
                    </View>
                    <View style={styles.flatin}>
                      <Text style={styles.dates}>{item.service_date}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        </View>
      )}
    </View>
  )
}

export default OrdCompleted

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'white',
    flex: 1,
  },
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  head: {
    height: 50,
    width: '100%',
    backgroundColor: '#dbe3e6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    // padding: 10,
  },
  filter: {
    marginLeft: '62%',
    height: 30,
    width: 50,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
  },
  bellIcon: {marginLeft: '8%', width: 25, height: 25, elevation: 10},
  txtfilter: {
    color: 'black',
  },
  txtAllOrders: {
    color: 'black',
    fontSize: 20,
    // padding: 10,
  },
  flatmain: {
    marginTop: 10,
    height: 120,
    width: '90%',
    elevation: 10,
    alignSelf: 'center',
    // alignItems:"center",
    backgroundColor: 'white',
    marginBottom: 5,
    justifyContent: 'center',
    borderRadius: 8,
    
  },
  flatin: {
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center',
  },
  txtid: {
    color: '#393939',
    paddingLeft: 5,
    fontSize: 14,
    fontWeight: '500',
  },
  txt1: {
    color: '#000000',
    paddingLeft: 5,
    fontSize: 16,
    fontWeight: '500',
  },
   dates: {
    color: '#000000',
    paddingLeft: 5,
    fontSize: 12,
    fontWeight: '500',
  },
  txt2: {
    color: '#000000',
    paddingLeft: 220,
    fontSize: 15,
    position: 'absolute',
    fontWeight:"500",
  },
  txtactive: {
    color: 'red',
    paddingLeft: 230,
    fontSize: 15,
    position: 'absolute',
    fontSize: 17,
    fontWeight: '500',
  },
  txtunactive: {
    paddingLeft: 220,
    fontSize: 15,
    position: 'absolute',
    fontSize: 17,
    fontWeight: '500',
  },
  txtpending: {
    color: 'orange',
    paddingLeft: 210,
    fontSize: 15,
    position: 'absolute',
    fontSize: 17,
    fontWeight: '500',
  },
  txtnew: {
    color: 'blue',
    paddingLeft: 230,
    fontSize: 17,
    fontWeight: '500',
    position: 'absolute',
  },
  searchView: {
    height: 40,
    width: '85%',
    flexDirection: 'row',
    backgroundColor: 'white',
    elevation: 10,
    borderWidth: 0.5,
    borderColor: 'black',
    borderRadius: 10,
  },
  cross: {
    height: 20,
    width: 20,
    position: 'absolute',
    marginLeft: '90%',
    marginTop: 15,
  },
  searchclose: {position: 'absolute', marginLeft: '90%', marginTop: 10},
  ntfv: {
    // height: '0%',
    width: '80%',
    elevation: 10,
    backgroundColor: '#0f292f',
    borderRadius: 5,
    alignSelf: 'center',
    padding: 5,
  },
  txtntf: {
    fontSize: 20,
    color: 'black',
    fontWeight: '500',
    alignSelf: 'center',
    paddingTop: 10,
  },
})
