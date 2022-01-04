
import { ScrollView } from 'react-native';
import { Text, View } from '../components/Themed';
import Carousel from '../containers/Carousel';
import { RootTabScreenProps } from '../types';

export default function HomeScreeen({ navigation }: RootTabScreenProps<'Home'>) {
  return (
    <ScrollView>
        <Text style={{fontSize: 30, alignSelf:'center'}}>Catégorie 1</Text>
        <Carousel
          items={[{id: 1, name:'coucou'},{id: 2, name:'loulou'},{id: 3, name:'touTou'}]}
          render={ ({item}:{item:any}) => (
            <>
              {console.log(item.name)}
              <View key={item.id} style={{backgroundColor: 'blue', width: 200, height: 200}}>
                <Text style={{textAlign: 'center', color: 'white'}}>{item.name}</Text>
              </View>
            </>
          )
          }
        />
        <Text style={{fontSize: 30, alignSelf:'center'}}>Catégorie 2</Text>
        <Carousel
          items={[{id: 1, name:'coucou'},{id: 2, name:'loulou'},{id: 3, name:'touTou'}]}
          render={ ({item}:{item:any}) => (
            <>
              {console.log(item.name)}
              <View key={item.id} style={{backgroundColor: 'blue', width: 200, height: 200}}>
                <Text style={{textAlign: 'center', color: 'white'}}>{item.name}</Text>
              </View>
            </>
          )
          }
        />
        <Text style={{fontSize: 30, alignSelf:'center'}}>Catégorie 3</Text>
        <Carousel
          items={[{id: 1, name:'coucou'},{id: 2, name:'loulou'},{id: 3, name:'touTou'}]}
          render={ ({item}:{item:any}) => (
            <>
              {console.log(item.name)}
              <View key={item.id} style={{backgroundColor: 'blue', width: 200, height: 200}}>
                <Text style={{textAlign: 'center', color: 'white'}}>{item.name}</Text>
              </View>
            </>
          )
          }
        />
    </ScrollView>

  );
}
