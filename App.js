import React, { Component, useState, useEffect } from 'react';
import { View, Image, Alert, StatusBar, TextInput, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity, ToastAndroid, Text, Button } from 'react-native';
import firebase from 'react-native-firebase'
import Icon from 'react-native-vector-icons/AntDesign';
import Iconn from 'react-native-vector-icons/FontAwesome';
import Iconm from 'react-native-vector-icons/Feather';

import config from './config';
import { ScrollView } from 'react-native-gesture-handler';

export default class AceitarLocate extends Component {
  state = {
    locates: [],
    load: true,
    currentUser: null,
  };

  config = new config();

  // componentDidMount() {
  //     const { currentUser } = firebase.auth()
  //     this.setState({ currentUser })
  // }





  confirmarLocate(id) {
    // if ({currentUser} === 'lucasgui@gmailcom') {
    this.config.sugLocate
      .doc(id)
      .update({
        visible: true,
      })
      .then(() => {
        alert("Localização adicionada");
      })
      .catch((error) => alert("Não foi possível cadastrar a localização" + error))
    //} else {
    //Alert("Você não tem permissão para finalizar essa ação");
    //}
  }




  rejeitarLocate(id) {
    //if ({ currentUser } === 'lucasgui@gmail.com') {
    this.config.sugLocate
      .doc(id)
      .delete()
      .then(() => {
        alert("Localização não aceita");
      })
      .catch((error) => alert("Não foi possível recusar a requisição" + error))
    //} else {
    //Alert("Você não tem permissão para finalizar essa ação");
    //}
  }

  ShowLocate(doc) {
    let id = doc.id;
    let nome = doc.data().nome;
    let geral = doc.data().endereco + ', ' + doc.data().cidade + ', ' + doc.data().descricao;
    this.setState({
      locates: this.state.locates.concat([{
        id,
        nome,
        geral,
      }]),
      load: false,
    });
  }

  componentWillMount() {
    this.config.MostrarLocal(false, snapshot => {
      this.setState({ locates: [] });
      snapshot.forEach(doc => {
        this.ShowLocate(doc);
      });
    });
  }

  SeparatorItem = () => {
    return (
      <View
        style={{
          height: 2,
          width: '100%',
          backgroundColor: '#FFDEAD',
          marginLeft: '0%',
          marginTop: 10
        }}
      />
    );
  };

  Footer = () => {
    return (
      <View style={styles.activity}>
        <ActivityIndicator animating={this.state.load ? true : false} size="large" color={'#7B68EE'} />
      </View>
    );
  };

  render() {
    const { locates, load } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: '#363636' }}>
        <StatusBar translucent={true} backgroundColor='transparent' barStyle='dark-content' />

        <View style={styles.drawer}>
          <TouchableOpacity style={{ padding: 20 }}
            onPress={() =>{} }>
            <Iconn name='deaf' size={30} color="#000"></Iconn>
          </TouchableOpacity>
          <Text style={styles.title}>Adicionar localização</Text>
        </View>

        {
          locates.length === 0 && load === false
            ? (
              <Text style={{ textAlign: 'center', color: '#fff', textAlignVertical: 'center', marginTop: 50 }}>Nenhuma indicação pendente</Text>
            ) : (
              <ScrollView>
                <FlatList
                  data={this.state.locates}
                  keyExtractor={item => item.id}
                  ItemSeparatorComponent={this.SeparatorItem}
                  ListFooterComponent={this.Footer}
                  renderItem={({ item }) => (
                    <View style={styles.cont}>
                      <View style={styles.btnAdd}>
                        <Text style={styles.nome}>{item.nome}</Text>
                        <Icon name="addfile" size={25} color={'#FFDEAD'} backgroundColor={'#6A5ACD'} onPress={() => { this.confirmarLocate(item.id) }} />
                      </View>
                      <View style={styles.btnRec}>
                        <Text style={styles.desc}>{item.geral}</Text>
                        <Iconn name='trash-o' size={25} color="#FFDEAD" backgroundColor={'#6A5ACD'} onPress={() => { this.rejeitarLocate(item.id) }} />
                      </View>
                    </View>
                  )}
                />
              </ScrollView>

            )
        }
      </View>
    )
  }

}

const styles = StyleSheet.create({
  cont: {
    marginLeft: 6,
    marginTop: 6,
    paddingVertical: 5,
    paddingHorizontal: 6,
  },
  drawer: {
    backgroundColor: '#808080',
    flexDirection: 'row',
    paddingTop: 15,
  },
  title: {
    paddingLeft: 10,
    textAlignVertical: 'center',
    color: '#fff',
    fontSize: 24,
  },
  activity: {
    paddingVertical: 20,
    borderTopWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 250
  },
  nome: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  desc: {
    fontSize: 16,
    color: '#87CEFA',
    width: '92%',
    height: '90%'
  },
  btnAdd: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginRight: 8,
  },
  btnRec: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginRight: 10,
    alignContent: 'flex-end',
    paddingTop: 4
  },
});