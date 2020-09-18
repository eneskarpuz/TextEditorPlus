import React , {Component} from 'react';
import {
  Platform,
  View,
  Dimensions,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { DragTextEditor } from 'react-native-drag-text-editor';
import Slider from '@react-native-community/slider';
const WINDOW = Dimensions.get('window');
const BACKGROUND="https://images.unsplash.com/photo-1519666152019-8340ed12987b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80";
const TEXT ="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation."
const FONTDEF ='Montserrat-Medium';
const BLACK="#000";
const WHITE="#FFF";
const COLORS=[ 
  "#002131",
    "#00486c",
      "#006d95",
        "#0087aa",
          "#00a1be",
            "#0ec0af",
              "#69d8cc",
                "#e9cec3",
                  "#c3c3c3",
                ];
const LEFT="left";
const RIGHT="right";
const CENTER="center";
const ALIGNS=[
  {name:0,icon:require("./icons/align-left.png")},
  {name:1,icon:require("./icons/align-center.png")},
  {name:2,icon:require("./icons/align-right.png")} 
];
const PROCESSBUTTON=[
  {icon:require('./icons/add-a-text.png'),name:"Add Text",id:0},
  {icon:require('./icons/fontsize.png'),name:"Change Size",id:1},
  {icon:require('./icons/divider.png'),name:"Letter Spacing",id:2},
  {icon:require('./icons/split-vertical.png'),name:"Line Height",id:3},
  {icon:require('./icons/align-center.png'),name:"Change Align",id:4},
  {icon:require('./icons/add-color.png'),name:"Add Color",id:5},
];
export default class App extends Component{
  constructor(props) {
    super(props);
  }; 
componentDidMount(){
  this.addText()
}
 state={
  Lorem:TEXT,
  textID:0,
  sizeOfText:15,
  arrayTextData: [],
  defFont:FONTDEF,
  lineHegOfText:0,
  textInAction:0,
  sizeTracker:15,
  letterSpcTracker:0,
  lineHegTracker:0,
  letterSpcOfText:0,
  pickedProcess:0,
 }

 processPicker=()=> {  
  switch(this.state.pickedProcess) {
    case 1:
      return (  
        <View style={styles.parentOfSlide}>
          <Slider
            value={this.state.sizeOfText} 
            onValueChange={sizeOfText => {
              this.fontSizing(sizeOfText);
            }} 
            style={styles.slide}
            minimumValue={0}
            maximumValue={40}
            minimumTrackTintColor={BLACK}
            maximumTrackTintColor={WHITE}
            thumbTintColor={BLACK}
          />   
          <Text style={{fontSize:25,flex:1}}>{this.state.sizeTracker.toFixed(0)}</Text>
        </View>
        );
    case 2:
      return (  
        <View style={styles.parentOfSlide}>
          <Slider
           value={this.state.letterSpcOfText} 
           onValueChange={letters => {
             this.setLetterSpacing(letters);
           }} 
           style={styles.slide}
           minimumValue={0}
           maximumValue={10}
           minimumTrackTintColor={BLACK}
           maximumTrackTintColor={WHITE}
           thumbTintColor={BLACK}
          />  
          <Text style={{fontSize:25,flex:1}}>{this.state.letterSpcTracker.toFixed(0)}</Text>
        </View>
            );
    case 3:
      return (  
        <View style={styles.parentOfSlide}>
          <Slider
           value={this.state.lineHegOfText} 
           onValueChange={heg => {
             this.setLineHeight(heg);
           }} 
           style={styles.slide}
           minimumValue={0}
           maximumValue={20}
           minimumTrackTintColor={BLACK}
           maximumTrackTintColor={WHITE}
           thumbTintColor={BLACK}
            /> 
          <Text style={{fontSize:25,flex:1}}>{this.state.lineHegTracker.toFixed(0)}</Text>
        </View>
       );
    case 4:
       return ALIGNS.map((aligns,index) => {
        return (  
          <TouchableOpacity key={index} 
            onPress={()=>this.alignPicker(aligns.name)} 
              style={{backgroundColor:WHITE},[styles.touch]}>
          <Image style={styles.touchimage} source={aligns.icon}/>
        </TouchableOpacity>
        );
    });
    case 5:
      return COLORS.map((varColor) => {
        return (  
          <TouchableOpacity key={varColor} onPress={()=>this.setColorToText(varColor)} style={[{backgroundColor:varColor},styles.colorTouch]}>
              </TouchableOpacity>
              );
            });
     
  default:
    return null;
         }
    }   
        fontSizing(sizeValue){ //fontsave
          const index=this.state.textInAction;
          const markers = [...this.state.arrayTextData];
          markers[index].defFontSize = sizeValue;
          markers[index].defLineHeight = sizeValue;
          this.setState({
             arrayTextData: markers,
              lineHegOfText:sizeValue/2
            });
        }
        alignPicker=(alignValue)=>{
          if(alignValue === 0){
            const index=this.state.textInAction;
            const markers = [...this.state.arrayTextData];
            markers[index].defAlign = LEFT;
            this.setState({ arrayTextData: markers });
          }
          else if(alignValue === 1){
            const index=this.state.textInAction;
            const markers = [...this.state.arrayTextData];
            markers[index].defAlign = CENTER;
            this.setState({ arrayTextData: markers });
          } 
          else if(alignValue === 2){
            const index=this.state.textInAction;
            const markers = [...this.state.arrayTextData];
            markers[index].defAlign = RIGHT;
            this.setState({ arrayTextData: markers });
          }
        }
     setLineHeight(valueofLine){ //fontsave
      const index=this.state.textInAction;
      const markers = [...this.state.arrayTextData];
      markers[index].defLineHeight = this.state.sizeOfText + valueofLine;
      this.setState({ arrayTextData: markers,lineHegTracker:this.state.sizeOfText + valueofLine});
    }  

    setLetterSpacing(valueofLetter){ //fontsave
      const index=this.state.textInAction;
      const markers = [...this.state.arrayTextData];
      markers[index].defLetterSpacing = valueofLetter;
      this.setState({ arrayTextData: markers ,letterSpcTracker:valueofLetter});
    }

addText(){ //text ekle array[]
 this.setState({textID:this.state.textID+1})
   let DEFS ={ 
     defTextID:this.state.textID,
     defTextValue:this.state.Lorem, 
     defFontFamily:FONTDEF,
     defAlign:'center',
     defLetterSpacing:0,
     defColor:'#000000',
     defLineHeight:this.state.sizeOfText,
     defFontSize:15
    }
    this.setState({
       arrayTextData: [...this.state.arrayTextData, DEFS]
     });
   } 
   removeText(c){ //kaldırılan text
    const filtered = [...this.state.arrayTextData].filter(x => x.defTextID !== c)
      this.setState({
        arrayTextData:filtered,
          textID:this.state.arrayTextData.length,   
      });
  }
   setColorToText=(colorofArray)=>{
    const index=this.state.textInAction;
    const markers = [...this.state.arrayTextData];
    markers[index].defColor = colorofArray;
    this.setState({ arrayTextData: markers });
  }
  
   processButtons=()=>{
    return PROCESSBUTTON.map((buttons,index) => {
      return(
      <TouchableOpacity 
       key={index}
         onPress={()=>buttons.id==0?this.addText():this.setState({pickedProcess:buttons.id})} 
          style={styles.touch}>
        <Image 
          style={styles.touchimage} 
            source={buttons.icon}/>
        </TouchableOpacity>
        )
      });
    }
  render(){
    let ADDED_TEXTS = this.state.arrayTextData.map((ID, index) => {
     return (
          <DragTextEditor 
          key={index}
          minW={100}
          minH={100}
          w={200}
          h={200}
          x={WINDOW.width/4}
          y={WINDOW.height/3}
          FontColor={ID.defColor}
          LineHeight={ID.defLineHeight}
          TextAlign={ID.defAlign}
          LetterSpacing={ID.defLetterSpacing}
          FontSize={ID.defFontSize}
          TopRightAction={()=>this.removeText(ID.defTextID)}
          centerPress={()=>this.setState({textInAction:ID.defTextID})} 
          isDraggable={true}
          isResizable={true}
          onDragStart={()=>console.log("-Drag Started")}
          onDragEnd={()=>console.log("- Drag ended")}
          onDrag={()=>console.log("- Dragging...")}
          onResizeStart={()=>console.log("- Resize Started")}
          onResize={()=>console.log("- Resizing...")}
          onResizeEnd={()=>console.log("- Resize Ended")}
        
          />
        )
      });
      
   return(
  <View style={styles.parent}>
    <Image style={styles.background} source={{uri:BACKGROUND}}>
    </Image>
     <View style={styles.container}>
       <Image style={styles.image} source={require("./icons/rotate100.png")}/>
       <Text style={styles.text}>{"react-native-drag-text-editor"}</Text>
     </View>
     <View style={styles.process}> 
      {this.processButtons()}
     </View>
     <View style={styles.process}> 
      {this.processPicker()}
     </View>
      {ADDED_TEXTS}
  </View>
    );
  }
}
const styles = StyleSheet.create({
  parent:{
  justifyContent:"flex-start",
    alignItems:"center",
    flex:1,
  },
  touchimage:{
    width:30,
    height:30,
  },
  colorTouch:{
    width:30,
    height:30,
    marginLeft:5,
    borderRadius:5,
    justifyContent:"center",
    alignItems:"center",
    borderColor:WHITE,
    borderWidth:1,
  },
  touch:{
    flex:1,
    marginLeft:5,
    borderRadius:5,
    padding:5,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:WHITE,
    borderColor:"#fff",
    borderWidth:1,
  },
  image:{
    width:60,
    height:60,
    marginTop: Platform.OS=== 'ios' ? 30 : 0,
    marginLeft:-15,
   },
  background:{
    position:"absolute",
    resizeMode:"cover",
    width:WINDOW.width,
    height:WINDOW.height,
    flexDirection:"column",
  },
  process:{
    width:WINDOW.width-4,
    padding:10,
    borderWidth:1,
    borderRadius:10,
    margin:2,
    borderColor:"#bfbfbf",
    elevation: Platform.OS=== 'ios' ? 15 : 0 ,
    zIndex: Platform.OS === 'ios' ? 50 : 0 ,
    justifyContent:"center",
    flexDirection:"row",
    alignItems:"center",
    alignSelf:"flex-end",
    backgroundColor:"rgba(255,255,255,0.4)"
  },
  container:{
    width:WINDOW.width,
    height: Platform.OS=== 'ios' ? 95 : 70,
    borderWidth:1,
    borderColor:"#bfbfbf",
    borderBottomLeftRadius:15,
    borderBottomRightRadius:15,
    marginBottom:2,
    elevation: Platform.OS=== 'ios' ? 10 : 0,
    zIndex: Platform.OS=== 'ios' ? 100 : 0 ,
    justifyContent:"center",
    flexDirection:"row",
    alignItems:"center",
    alignSelf:"center",
    backgroundColor:"rgba(255,255,255,255)"
  },
  text:{
    fontSize:20,
    marginTop: Platform.OS=== 'ios' ? 30 : 0,
    marginLeft:10,
    color:"#000",
    alignSelf:"center"
  },
  slide:{
    flex:6,
    marginRight:20,
  },
  parentOfSlide:{
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center"
  }
})
