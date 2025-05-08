import { format } from 'date-fns';
import { uk } from 'date-fns/locale';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const ApirayCard = ({ apiary, onPress }) => {

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card}>
        <View style={styles.title}>
          <Text>{apiary.name}</Text>
        </View>

        <View style={styles.header}>

          <View style={{ margin: '4 10 0 0' }}>
            <Text style={styles.date}>{format(new Date(), "d MMMM HH:mm", { locale: uk })}</Text>
          </View>

          <View>
            <TouchableOpacity style={styles.bellIcon}>
              <View>
                <Image
                  source={{
                    uri: 'https://cdn-icons-png.flaticon.com/512/1182/1182718.png',
                  }}
                  style={styles.icon}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.body}>
          <View style={styles.leftSection}>
            <Image source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/393/393090.png',
            }}
              style={styles.hiveIcon}
            />
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

            <View style={styles.honeyLevelContainer}>
              <View style={styles.honeyLevel}>
                <Image source={{
                  uri: 'https://cdn-icons-png.flaticon.com/512/4511/4511622.png',
                }}
                  style={styles.honeyLevelIcon}
                />
                <Text >{ }</Text>
              </View>
            </View>

            <View style={styles.rightSection}>
              <View style={{ paddingRight: 10 }}>
                <Image
                  source={{
                    uri: 'https://cdn-icons-png.flaticon.com/512/8607/8607016.png',
                  }}
                  style={styles.apirayIcon}
                />
              </View>

              <View>
                <Text style={styles.apirayCount}>{apiary.beehivesCount}</Text>
              </View>
            </View>

          </View>

        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    // marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    alignItems: 'center',
    textAlign: 'center',
  },
  bellIcon: {
    padding: 5,
    backgroundColor: '#eef5ff',
    borderRadius: 20,
    width: 30,
    height: 30,
  },
  icon: {
    width: 20,
    height: 20,
  },
  date: {
    fontSize: 12,
    color: '#666',
    marginBottom: 10,
  },
  hiveIcon: {
    width: 100,
    height: 80,
  },
  weight: {
    fontSize: 14,
    color: '#28a745',
    marginTop: 5,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  apirayIcon: {
    width: 30,
    height: 30,
  },
  apirayCount: {
    fontSize: 14,
    marginTop: 5,
  },
  honeyLevelContainer: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  honeyLevel: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  honeyLevelIcon: {
    width: 30,
    height: 30,
    marginRight: 5,
  },

});

export default ApirayCard;
