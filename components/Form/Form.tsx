import React, { useRef } from 'react';
import { Text, View, TouchableOpacity, TextInput, Modal, Image, ScrollView, Pressable, Keyboard, FlatList } from 'react-native';
import { useState } from 'react';
import { styles as FormStyles } from './FormStyle';
import { styles as inputStyles } from '../CustomAutoCompleteTags/CustomAutoCompleteTagsStyle';
import { bookInfoToEdit, bookInfoType } from '../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../../App';
import { launchImageLibrary, launchCamera, CameraOptions } from 'react-native-image-picker';
import CustomAutoCompleteTags from '../CustomAutoCompleteTags/CustomAutoCompleteTags';
import AutosuggTextInput from '../AutosuggTextInput/AutosuggTextInput';

interface Form {
  setIsVisibleModal: (data: boolean) => void,
  isVisibleModal: boolean,
  booksList: bookInfoType[],
  setBooksList: (data: bookInfoType[]) => void,
  isEditting: bookInfoToEdit,
  bookInfo: bookInfoType,
  setBookInfo: (data: bookInfoType) => void,
  setIsEditting: (data: bookInfoToEdit) => void,
};

const Form: React.FC<Form> = ({ setIsVisibleModal,
  isVisibleModal,
  isEditting,
  bookInfo,
  setBookInfo,
  setIsEditting,
  booksList,
  setBooksList }: Form) => {

  const options: CameraOptions = {
    mediaType: 'photo',
    maxWidth: 200,
    maxHeight: 200,
    includeBase64: false,
    quality: 0.8,
  };

  const openGallery = async () => {
    const image = await launchImageLibrary(options);

    if (image && image.assets && image.assets.length > 0 && image.assets[0].uri) {
      setBookInfo({ ...bookInfo, image: image.assets[0].uri })
    }
  }

  const takePhoto = async () => {
    const image = await launchCamera(options);

    if (image && image.assets && image.assets.length > 0 && image.assets[0].uri) {
      setBookInfo({ ...bookInfo, image: image.assets[0].uri })
    }
  }

  const closeModal = () => {
    setIsVisibleModal(false);
    setBookInfo({
      name: '',
      author: [],
      genre: [],
      year: '',
      publisherHouse: '',
      image: '',
      bookKey: '',
    });
  }

  const addBook = async () => {
    if (isEditting.state) {
      const bookIndex = booksList.findIndex(book => book.bookKey === isEditting.key);

      if (bookIndex === -1) {
        throw new Error('Book not found in booksList');
      }
      const copy = [...booksList];

      
      copy.splice(bookIndex, 1, bookInfo)
      await AsyncStorage.setItem(isEditting.key, JSON.stringify(bookInfo));

      setBookInfo({
        name: '',
        author: [],
        genre: [],
        year: '',
        publisherHouse: '',
        image: '',
        bookKey: '',
      });
  
      setBooksList(copy);
      setIsEditting({ ...isEditting, key: '', state: false });
      setIsVisibleModal(false);
    } else {
      const key = Date.now().toString();
      const newBook = { ...bookInfo, bookKey: key };

      await AsyncStorage.setItem(key, JSON.stringify(newBook));

      setBooksList([...booksList, newBook]);
      
      setBookInfo({
        name: '',
        author: [],
        genre: [],
        year: '',
        publisherHouse: '',
        image: '',
        bookKey: '',
      });
  
      setIsVisibleModal(false);
    }

    console.log(booksList);
   
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisibleModal}
    >
      <Pressable onPress={Keyboard.dismiss} style={FormStyles.modalContainer}>
        <View style={FormStyles.modalContent}>

          <View >
            <Text style={FormStyles.header} >Name</Text>
            <TextInput blurOnSubmit={false} placeholder='...' value={bookInfo.name} onChangeText={(e) => { setBookInfo({ ...bookInfo, name: e }) }} style={[inputStyles.tagContent, inputStyles.withoutTagInput]} />
          </View>
          <View >
            <Text style={FormStyles.header} >Author</Text>
            <CustomAutoCompleteTags fieldName='author' oneTagAllowed={false} isAllowedMenu={true} isEditting={isEditting} setBookInfo={setBookInfo} bookInfo={bookInfo} />
          </View>
          <View >
            <Text style={FormStyles.header}>Genre</Text>
            <CustomAutoCompleteTags fieldName='genre' oneTagAllowed={false} isAllowedMenu={true} isEditting={isEditting} setBookInfo={setBookInfo} bookInfo={bookInfo} />
          </View>
          <View >
            <Text style={FormStyles.header}>Publisher house</Text>
            <AutosuggTextInput bookInfo={bookInfo} setBookInfo={setBookInfo} field={'publisherHouse'} />
          </View>
          <View>
            <Text style={FormStyles.header}>Year</Text>
            <TextInput blurOnSubmit={false} placeholder='...' value={bookInfo.year} onChangeText={(e) => { setBookInfo({ ...bookInfo, year: e }) }} keyboardType='numeric' style={[inputStyles.tagContent, inputStyles.withoutTagInput]} />
          </View>
          {bookInfo.image && <Text style={{ color: 'grey' }}>Img is uploaded</Text>}
          <View style={styles.butContainer}>
            <TouchableOpacity onPress={openGallery} style={[styles.primaryButton, styles.smallerButtns]} >
              <Text style={styles.buttonText}>Upload img</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={takePhoto} style={[styles.primaryButton, styles.smallerButtns]} >
              <Text style={styles.buttonText}>take photo</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setBookInfo({ ...bookInfo, image: '' })} style={[styles.primaryButton, styles.smallerButtns]} >
              <Text style={styles.buttonText}>del photo</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.butContainer}>
            <TouchableOpacity onPress={addBook} style={styles.primaryButton} >
              <Text style={styles.buttonText}>Ok</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={closeModal} style={styles.primaryButton} >
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>

        </View>
      </Pressable>
    </Modal>
  )
}
export default Form;