/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, { useEffect } from 'react';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Book from './components/Book/Book';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Form from './components/Form/Form';

import {
  SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View, Button,
} from 'react-native';

export interface bookInfoType {
  name: string,
  author: string[],
  genre: string[],
  year: string,
  publisherHouse: string,
  image: string,
  bookKey: string,
  [key: string]: any,
}

export interface bookInfoToEdit {
  state: boolean,
  key: string,
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [isEditting, setIsEditting] = useState({ state: false, key: '' });
  const [booksList, setBooksList] = useState<bookInfoType[]>([]);
  const [bookInfo, setBookInfo] = useState<bookInfoType>({
    name: '',
    author: [],
    genre: [],
    year: '',
    publisherHouse: '',
    image: '',
    bookKey: '',
  });


  useEffect(() => {
    AsyncStorage.getAllKeys()
      .then(keys => AsyncStorage.multiGet(keys))
      .then(res => {
        const newArr = res.map(([key, value]) => {

          if (value !== null) {
            return { ...JSON.parse(value), bookKey: key };
          }
        });

        setBooksList(newArr);
      });
  }, []);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const openModal = () => {
    setIsVisibleModal(true);
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={Colors.lighter}
      />
      <Button title='create book' onPress={openModal} />
      <ScrollView
        keyboardShouldPersistTaps='handled'
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}
      >
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>

          {
            booksList.length
              ?
              <View style={styles.bookContainer}>
                {booksList?.map((book, index) => <Book
                  booksList={booksList}
                  setBooksList={setBooksList}
                  isEditting={isEditting}
                  bookInfo={bookInfo}
                  setBookInfo={setBookInfo}
                  setIsEditting={setIsEditting}
                  publisherHouse={book.publisherHouse}
                  genre={book.genre}
                  name={book.name}
                  author={book.author}
                  year={book.year}
                  key={index}
                  image={book.image}
                  bookKey={book.bookKey}
                  isVisibleModal={isVisibleModal}
                  setIsVisibleModal={setIsVisibleModal} />)
                }
              </View>
              :
              <Text style={styles.bookContainer__header}>You don't have any books, but you can create the new one</Text>
          }
          <Form booksList={booksList} setBooksList={setBooksList} bookInfo={bookInfo} setBookInfo={setBookInfo} isEditting={isEditting} setIsEditting={setIsEditting} isVisibleModal={isVisibleModal} setIsVisibleModal={setIsVisibleModal} />

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export const styles = StyleSheet.create({
  butContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  primaryButton: {
    display: 'flex',
    backgroundColor: '#57b1e5',
    width: 100,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  smallerButtns: {
    width: 70,
    height: 50
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  bookField: {
    marginBottom: 10,
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#7c7777',
    fontSize: 17,
  },
  bookContainer: {
    padding: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  bookContainer__header: {
    marginBottom: 20,
    fontSize: 24,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
