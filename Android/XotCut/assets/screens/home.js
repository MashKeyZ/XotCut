import { StyleSheet, Text, View,TouchableOpacity,Image } from 'react-native'
import React from 'react'

const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../images/back01.jpg')}
        style={{ flex: 1,position:'absolute',zIndex:-1,height:'100%' }}
        resizeMode="cover"
      />
      <View style={styles.header}>
        <Image
          source={require('../images/XotCut_logo.png')}
          style={{ width: 60 }}
          resizeMode="contain"
        /><View style={styles.tittleCont}>
            <Text style={styles.tittle}>XotCut</Text>
            <Text style={styles.subTittle}>Type Faster</Text>
        </View>
        
        {/*<Button onPress={()=>navigation.push('Chat')} title="Start"/>*/}
      </View>
      <View style={styles.body}>
        <View style={styles.circle}></View>
      <Image
          source={require('../images/launch.png')}
          style={{ width: 350,height: 250  }}
          resizeMode="contain"
        />
      </View>
      <View style={styles.footer}>
          <TouchableOpacity style={styles.button} onPress={()=>navigation.push('Chat')}>
            <Image
            source={require('../images/start.png')}
            style={{ }}
            resizeMode="contain"
          />
          <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>

          <Text style={{color:'rgba(46,161,148,1)',fontWeight:'500'}}>
            Collaborate with teams and Increase your typing scpeed.
          </Text>
        </View>
        <View style={styles.footerText}>
          <Text  style={{color:'rgb(187,203,184)',fontWeight:'500'}}>Developed By : MashKeyZ</Text>
          <Text  style={{color:'rgb(187,203,184)',fontWeight:'500'}}>Copyrigh @ 2023</Text>
        </View>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  header:{
    height: 70,
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'rgba(142,238,215,0.9)',
    alignItems: 'center',
    borderRadius:50,
    marginVertical:20,
  },
  tittle:{
    color: 'rgb(9,65,90)',
    fontWeight: 'bold',
    fontSize:35,
    fontFamily: 'Product Sans',
    marginBottom:-10,
  },
  tittleCont:{
    textAlignVertical: 'middle',
    alignItems: 'center',
    marginLeft:20,
  },
  subTittle:{
    fontWeight :'700',
    fontStyle: 'italic',
  },
  body:{
    width:'100%',
    height:'75%',
    justifyContent: 'center',
  },
  circle:{
    height:'100%',
    width:'100%',
    position:'absolute',
    backgroundColor:'rgba(142,238,215,0.7)',
    borderBottomRightRadius:500,
    borderTopRightRadius:300,
    left:-100,
  },
  footer:{
    height:80,
    width:'100%',
    justifyContent: 'center',
    alignItems: 'center',
    position:'absolute',
    bottom:70

  },
  button:{
    display:'flex',
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'center',
    width:'50%',
    backgroundColor:'rgba(46,161,148,0.9)',
    padding:10,
    borderRadius:60,
    elevation: 10,
    shadowColor: 'black',
    shadowOffset: { width: 3, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  buttonText:{
    fontSize:35,
    fontWeight:'500',
    marginLeft:7,
    color:'rgb(187,203,184)',
  },
  footerText:{
    justifyContent: 'center',
    alignItems: 'center',
    position:'absolute',
    bottom:10
  }
})