import React,{useRef,useState,useEffect} from 'react'
import { View, TextInput,Button,FlatList, Image,Text,StyleSheet,SafeAreaView,TouchableOpacity,ScrollView ,Animated} from 'react-native';
import WS from 'react-native-websocket';
import Message from '../components/message';
//import { SafeAreaView } from 'react-native-safe-area-context';


export default function ChatScreen() {
    const ws = useRef(null);
    const flatListRef = useRef(null);
    const [message, setMessage] = useState('');
    const [response,setResponse] = useState('');
    const [data,setData]=useState([
      {fromServer:true,text:"Hello"},
      {fromServer:true,text:"This App allows you to use your cellphone keyboard to type your Word documents."},
      {fromServer:true,text:"Please wait while we conect you..."},
    ])
    //use websocket
    const [status,setStatus] = useState('Connecting...')
    const [url, setUrl] = useState('ws://10.0.0.14:8080');

    const sendMsg = ()=> {
        console.log('Sending message : '+message)
        ws.current.send(message);
        const newMsg=[{fromServer:false,text:message}]
        setData(data=>[...data,{fromServer:false,text:message}])
       // flatListRef.current.scrollToEnd({animated: true});
        setMessage('');
      };
      const online = ()=>{
        console.log("Server online...")
        const newMsg=[{fromServer:true,text:"You are now connected,"},
                      {fromServer:true,text:"Make Sure that Microsoft Word is an active window!!"}]
        setData(data=>[...data,{fromServer:true,text:"You are now connected,"}, {fromServer:true,text:"Make Sure that Microsoft Word is an active window!!"}])
        setStatus("Online")
      }
      const offline=()=>{
        console.log("Server offline...")
        const newMsg=[{fromServer:true,text:"The server is offline."},
                      {fromServer:true,text:"Please wait while we are trying to reconnect."}]
        setData(data=>[...data,{fromServer:true,text:"The server is offline."},
        {fromServer:true,text:"Please wait while we are trying to reconnect."}])
        setStatus("Offline")
      }

      function fromServer(msg){
        console.log("From Server : "+msg)
        const newMsg=[{fromServer:true,text:msg.data}]
        setData(data=>[...data,newMsg])
      }

  return (
    <SafeAreaView style={styles.container}>
        <Image
          source={require('../images/chat_back.jpg')}
          style={{ flex: 1,position:'absolute',zIndex:-1,height:'100%' }}
          resizeMode="cover"
        />
          <View style={styles.header}>
            <Image
              source={require('../images/word.png')}
              style={styles.image}
              resizeMode="contain"
            /><View style={styles.tittleCont}>
                <Text style={styles.tittle}>XotCut</Text>
                <Text style={styles.subTittle}>Type Faster</Text>
            </View>
            
            {/*<Button onPress={()=>navigation.push('Chat')} title="Start"/>*/}
          </View>
          <View style={styles.statusBar}>
            <Text style={styles.statusText}>{status}</Text>
          </View>

          {/*Messages View */}
     
            
           <FlatList
           renderItem={({item}) => <Message text={item.text} fromServer={item.fromServer} />}
            data={data}
            keyExtractor={(item,i)=>i}
            style={styles.scroll}
            ref={flatListRef}
            onContentSizeChange={() => {
              flatListRef.current.scrollToEnd({animated: true});
            }}
            keyboardShouldPersistTaps="always"
           />
         
        {/*Footer */}
        <View style={styles.inputCont}>
          <TextInput
                multiline={true}
                onChangeText={text => setMessage(text)}
                placeholder="Enter a message"
                placeholderTextColor="rgb(204,207,189)"
                style={styles.input}
                value={message}
            />
            <TouchableOpacity style={styles.sendBtn} onPress={sendMsg}>
              <Image
                source={require('../images/send.png')}
                style={{}}
                resizeMode="contain"
              />
            </TouchableOpacity>
            
        </View>
        <WS
              ref={ws}
              url={url}
              onOpen={online}
              onMessage={msg => fromServer(msg)}
              onClose={offline}
              reconnecting
            />

      {/*
        <View>
        <Text>Mashimbyi Vutlhari</Text>
        <Text>Status : {status}</Text>
        <Text>Response : {response}</Text>
        <View>
            <TextInput
                value={message}
                onChangeText={text => setMessage(text)}
            />
            <Button onPress={sendMsg} title="Send" />
        </View>
        <WS
        ref={ws}
        url={url}
        onOpen={online}
        onMessage={message => console.log(message)}
        onClose={offline}
        
      />
   
  </View>*/}
 
    </SafeAreaView>
   
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  header:{
    height: 55,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal:10,
    backgroundColor: 'rgba(142,238,215,0.75)',
    alignItems: 'center',
  },
  tittle:{
    color: 'rgb(7,62,98)',
    fontWeight: 'bold',
    fontSize:30,
    fontFamily: 'Product Sans',
    marginBottom:-10,
  },
  tittleCont:{
    textAlignVertical: 'middle',
    alignItems: 'center',
    justifyContent:'center',
    width:'70%',
    
  },
  subTittle:{
    fontWeight :'700',
    fontStyle: 'italic',
  },
  image:{
    width: 55,
    backgroundColor: 'rgba(141,231,227,0.3)',
    height:55,
    borderRadius:100/2,
    borderColor: 'rgba(141,231,227,0.7)',
    borderWidth:2,
  },
  inputCont:{
    height:60,
    width:'100%',
    maxHeight: 100,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input:{
    borderColor: 'rgba(141,231,227,0.7)',
    borderWidth:2,
    backgroundColor:'rgba(141,231,227,0.2)',
    height:50,
    borderRadius:50,
    paddingHorizontal:16,
    color:'white',
    width:'78%',
    marginRight:10
  },
  sendBtn:{
    padding:0,
    borderRadius:100/2,
    backgroundColor: 'rgba(141,231,227,0.9)',
    height:50,
    width:50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth:2,
    borderColor: 'rgba(141,231,227,0.7)',
    fontWeight:'500'
  },
  statusBar:{
    backgroundColor:'rgba(141,231,227,0.4)',
    borderRadius:50,
    alignItems: 'center',
    marginVertical: 5,
    padding:0,
    justifyContent: 'center',
  },
  statusText:{
    color: 'rgb(204,207,189)',
    paddingHorizontal:20,
  },
  scroll:{
    maxHeight:'80%',
    width:'100%',

  }
});