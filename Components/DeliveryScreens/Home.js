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
import React, {useEffect, useState,useCallback} from 'react'
import SelectDropdown from 'react-native-select-dropdown'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Home = ({navigation, route}) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [searchtxt, setSearchText] = useState('')
  const [searchdata, setSearchData] = useState(null)
  const [mytoken, setMyToken] = useState('')
  const [count,setCount]=useState(-1)
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
  console.log("Mytoken-----",mytoken)

  const notification_data = [
    {
      name: 'Sam',
      time: '05:40 PM',
      date: '10 jun 2023',
      title: 'I am a delivery boy, from delhi gurugram india',
    },
    {
      name: 'Raj',
      time: '05:40 PM',
      date: '10 jun 2023',
      title: 'I am looking for a Driver',
    },
    {
      name: 'Jay',
      time: '05:40 PM',
      date: '10 jun 2023',
      title: 'I need a new knife',
    },
    {
      name: 'Jack',
      time: '05:40 PM',
      date: '10 jun 2023',
      title: 'This is a best application for services',
    },
    {
      name: 'Sam',
      time: '05:40 PM',
      date: '10 jun 2023',
      title: 'I am a delivery boy, from delhi gurugram india',
    },
    {
      name: 'Raj',
      time: '05:40 PM',
      date: '10 jun 2023',
      title: 'I am looking for a Driver',
    },
    {
      name: 'Jay',
      time: '05:40 PM',
      date: '10 jun 2023',
      title: 'I need a new knife',
    },
    {
      name: 'Jack',
      time: '05:40 PM',
      date: '10 jun 2023',
      title: 'This is a best application for services',
    },
  ]

  const fetchData = async () => {
   
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
          res.json().then(data => {
            setSearchData(data.data.upcoming_services)
          }).catch((error)=>{
            console.log("Data Error-----",error)
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
    getData()
    if(count==-1){
      fetchData()
    }
    
    //  data = [
    //   {
    //     orderid:id,
    //     orderStatus: 'Active',
    //     date:"hello",
    //     customer_name:name,
    //     price:amount,
    //   },
    // ]
    //  setSearchData(data);

    // console.log("Searchdata-------",searchdata)
   
  }, [mytoken,count])

  useEffect(()=>{

   

           if(searchtxt!=""){
      let result=searchdata.filter(function(item){
        return item.name.includes(searchtxt);
      })
     setSearchData(result);
    }else{
      fetchData();
      setCount(-1)
    }
  },[searchtxt])

  // console.log('search data-----', searchdata)

  const clickHadler = (item,item2) => {
    navigation.navigate('OrderDetails',{data:item,status:item2})
  }
  // console.log("id-----------",id);
  const filterData = ['By status', 'By name', 'By date']

  const searchCloseHandler = () => {
    setCount(-1)
    fetchData()
   
    // setSearchData(data);
    setSearchText('')
  }
  const notificationHandler = () => {
    setModalVisible(true)
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
    const filterClickHandler=(index)=>{
      if(index==0){
              const Result=searchdata.sort((a,b)=>{
                   return a.service_status-b.service_status
              })

              setSearchData(Result)
              setCount(0)
      }


      if(index==1){
       const Result= searchdata.sort((a, b) => {
            return a.name.localeCompare(b.name);
      });
        //  console.log("Result-------",Result)
         setSearchData(Result)
         setCount(1)
      }

      if(index==2){
       const dateResult=searchdata.sort((a,b)=>{
        var anewdate = a.service_date.split("-").reverse().join("-");
        var bnewdate = b.service_date.split("-").reverse().join("-");
          const dateA = new Date(anewdate)
          const dateB = new Date(bnewdate)
          return dateA - dateB;
        });
        // console.log("Result======",dateResult)
        setSearchData(dateResult)
        setCount(2)
      }
    }


  return (
    <View style={styles.main}>
      {searchdata==null? (<View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>):(
        <View>
      <View style={styles.head}>
        <View style={styles.searchView}>
          <TouchableOpacity style={{height: 45, width: 45, padding: 8}}>
            <Image
              source={require('../../Assets/icons/search.png')}
              style={{height: 23, width: 23,tintColor:"#022A7B"}}
            />
          </TouchableOpacity>
          <TextInput
            value={searchtxt}
            onChangeText={txt => setSearchText(txt)}
            placeholder='Search here'
            color={'#022A7B'}
            placeholderTextColor={'#022A7B'}
            style={{height: '100%', width: '100%'}}
          />
          <TouchableOpacity
            onPress={() => searchCloseHandler()}
            style={styles.searchclose}>
            <Image
              source={require('../../Assets/icons/close.png')}
              style={{height: 15, width: 15, tintColor: '#022A7B'}}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.bellIcon}>
          <TouchableOpacity onPress={() => notificationHandler()}>
            <Image
              source={require('../../Assets/icons/bell.png')}
              style={{height: 25, width: 25,tintColor:"#022A7B"}}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flexDirection: 'row', padding: 10}}>
        <Text style={styles.txtAllOrders}>Running Orders</Text>
        <TouchableOpacity>
          <View style={styles.filter}>
            <SelectDropdown
              defaultButtonText='Filter'
              data={filterData}
              dropdownStyle={{borderRadius: 5, width: 120}}
              buttonStyle={{

                borderRadius: 10,
                height: 30,
                width: 100,
                elevation: 10,
                backgroundColor: 'white',
              }}
              buttonTextStyle={{color: 'black', fontSize: 15}}
              onSelect={(selectedItem, index) => filterClickHandler(index)}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem
              }}
              rowTextForSelection={(item, index) => {
                return item
              }}
            />
          </View>
        </TouchableOpacity>
      </View >
      <View style={{marginBottom:220}}>
      <FlatList
        data={searchdata}
         refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
         }
        renderItem={({item}) => (
          <View style={styles.flatmain}>
            <TouchableOpacity onPress={() => clickHadler(item.id,item.service_status)}>
              <View style={styles.flatin}>
                <Text style={styles.txtid}>OrderID: {JSON.stringify(item.id)}</Text>
                {            
                item.service_status == 1 && (
                  <Text style={[styles.txtunactive,{color:"red",}]}>Active</Text>
                )
                }
                 {item.service_status == 5 && (
                  <Text style={[styles.txtunactive,{color:"green"}]}>Completed</Text>
                )} 
                {
                  item.service_status ==0 &&  (
                    <Text style={[styles.txtunactive,{color:"blue"}]}>Pending</Text>
                  )
                }

                {
                  item.service_status !=1 && item.service_status!=5 && item.service_status!=0 && (
                    <Text style={[styles.txtunactive,{color:"orange"}]}>Processing</Text>
                  )
                }
                
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
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false)
        }}>
        <View style={{height: '100%', width: '100%', backgroundColor: 'white'}}>
          <TouchableOpacity
            style={styles.cross}
            onPress={() => setModalVisible(false)}>
            <Image
              source={require('../../Assets/icons/close.png')}
              style={{height: 18, width: 18}}
            />
          </TouchableOpacity>
          <Text style={styles.txtntf}>Notification</Text>
        <View style={{marginBottom:30}}>
          <FlatList
            data={notification_data}
            renderItem={({item}) => (
              <View style={{marginBottom:10,marginTop:10}}>
                  <View style={styles.ntfv}>
                       <Text style={{color:"white",fontSize:18,fontWeight:"500"}}>{item.name}</Text>
                       <Text style={{color:"white",fontSize:16,padding:5,opacity:0.8 }}>{item.title}</Text>
                       <View style={{flexDirection:"row",gap:10}}>
                          <Text style={{color:"white",opacity:0.5}}>{item.time}</Text>
                          <Text style={{color:"white",opacity:0.5}}>{item.date}</Text>
                       </View>
                  </View>
              </View>
            )}
          />
          </View>
        </View>
      </Modal>
      </View>
      )}
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'white',
    flex: 1,
  },
  loader:{
    flex:1,
       alignItems:"center",
       justifyContent:"center",
  },
  head: {
    height: 60,
    width: '100%',
    backgroundColor: '#dbe3e6',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  filter: {
    marginLeft: '52%',
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
    marginBottom: 10,
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
    borderColor: '#022A7B',
    borderRadius: 10,
    marginTop: 5,
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
    padding:5,
  },
  txtntf: {
    fontSize: 20,
    color: 'black',
    fontWeight: '500',
    alignSelf: 'center',
    paddingTop: 10,
  },
})
