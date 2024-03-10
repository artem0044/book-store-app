import React, { useState } from 'react';
import { Image, Text, View, TouchableOpacity, } from 'react-native';
import { styles as bookStyles } from './BookStyle';
import { bookInfoToEdit, bookInfoType } from '../../App';
import { styles } from '../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Tag from '../CustomAutoCompleteTags/Tag';
import RemoveQuestionPopUp from '../RemoveQuestionPopUp/RemoveQuestionPopUp';

interface isGoingToBeEditedBook extends bookInfoType {
  isVisibleModal: boolean,
  setIsVisibleModal: (data: boolean) => void,
  setIsEditting: (data: bookInfoToEdit) => void,
  bookInfo: bookInfoType,
  setBookInfo: (data: bookInfoType) => void,
  isEditting: bookInfoToEdit,
  booksList: bookInfoType[],
  setBooksList: (data: bookInfoType[]) => void,
}

const Book: React.FC<isGoingToBeEditedBook> = (props: isGoingToBeEditedBook) => {
  const [isQuestionPopUpVisible, setQuestionPopUpIsVisible] = useState(false);

  const edit = async (key: string) => {
    props.setIsEditting({ ...props.isEditting, state: true, key });
    props.setIsVisibleModal(true);
    
    const item = await AsyncStorage.getItem(key);

    if (!item) return;

    const itemObj = JSON.parse(item);
    props.setBookInfo({
      name: itemObj.name,
      author: itemObj.author,
      genre: itemObj.genre,
      year: itemObj.year,
      publisherHouse: itemObj.publisherHouse,
      image: itemObj.image,
      bookKey: itemObj.bookKey,
    })
  }

  const deleteBook = async (key: string) => {
    setQuestionPopUpIsVisible(false);

    await AsyncStorage.removeItem(key);
    const filteredBookList = props.booksList.filter(item => item.bookKey !== key);

    props.setBooksList(filteredBookList);
  }



  return (
    <View style={bookStyles.container}>
      {/* <View style={bookStyles.bookInfo}> */}
      {props.image
        &&
        <Image source={{ uri: props.image }}
          style={{ width: 120, height: 120 }}
        />}
      <View style={bookStyles.title}>
        <View style={bookStyles.content}>
          <Text style={bookStyles.header}>
            Name: {props.name}
          </Text>
        </View>
        <View style={bookStyles.content}>
          <Text style={bookStyles.header}>
            Author:
          </Text>
          {props.author?.map((item, index) => <Tag index={index} tag={item} key={index} />)}
        </View>
        <View style={bookStyles.content}>
          <Text style={bookStyles.header}>
            Genre:
          </Text>
          {props.genre?.map((item, index) => <Tag index={index} tag={item} key={index} />)}
        </View>
        <View style={bookStyles.content}>
          <Text style={bookStyles.header}>
            Publisher house: {props.publisherHouse}
          </Text>
        </View>
        <View style={bookStyles.content}>
          <Text style={bookStyles.header}>
            Year: {props.year}
          </Text>
        </View>
      </View>

      <TouchableOpacity onPress={() => edit(props.bookKey)} style={bookStyles.menuBut}>
        <Text style={bookStyles.whiteText}>edit</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setQuestionPopUpIsVisible(true)} style={bookStyles.delBut}>
        <Text style={bookStyles.whiteText}>del</Text>
      </TouchableOpacity>
      <RemoveQuestionPopUp deleteBook={deleteBook} bookKey={props.bookKey} setQuestionPopUpIsVisible={setQuestionPopUpIsVisible} isQuestionPopUpVisible={isQuestionPopUpVisible} />
      {/* </View> */}
    </View>

  )
}
export default Book;
