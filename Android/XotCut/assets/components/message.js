import { Text, View,TouchableOpacity,Image,StyleSheet} from 'react-native'
import React from 'react'



function Message({text,fromServer}){

    return(

        <View style={{width:"100%",justifyContent: 'center', alignItems:fromServer?'flex-start':'flex-end',padding:10}} >
            <View style={fromServer?styles.containerL:styles.containerR}>
                <Text style={styles.textM} >
                   {text}
                </Text>
            </View>   
        </View>  

    )
}

export default Message

const styles = StyleSheet.create({
    containerR:{
        maxWidth:"70%",
       justifyContent: 'center',
       alignItems:'flex-end',
       backgroundColor: 'rgb(50,157,223)',
       height:'auto',
       borderBottomLeftRadius:100/2,
       borderTopLeftRadius:100/2,
       borderTopRightRadius:100/2,
       flexDirection:'row',
       flexWrap:'wrap'
       ,paddingVertical:5,
    },
    containerL:{
        maxWidth:"70%",
       justifyContent: 'center',
       alignItems:'flex-end',
       backgroundColor: 'rgb(21,78,95)',
       paddingVertical:5,
       borderBottomRightRadius:100/2,
       borderTopRightRadius:100/2,
       borderTopLeftRadius:100/2,
    },
    textM:{
        paddingHorizontal:15,
        color: 'rgb(204,207,189)',
        fontWeight:'400'
    }
})

//fromServer? 'rgb(199,213,210)'