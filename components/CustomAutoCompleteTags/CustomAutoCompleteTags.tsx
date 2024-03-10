import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Modal, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from 'react-native';
import { bookInfoType } from '../../App';
import { styles } from "../CustomAutoCompleteTags/CustomAutoCompleteTagsStyle";
import Tag from './Tag';
import { bookInfoToEdit } from '../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface CustomAutoCompleteTagsInterfc {
  setBookInfo: (data: bookInfoType) => void,
  bookInfo: bookInfoType,
  isEditting: bookInfoToEdit,
  isAllowedMenu: boolean,
  oneTagAllowed: boolean,
  fieldName: string,
}

const CustomAutoCompleteTags: React.FC<CustomAutoCompleteTagsInterfc> = (props) => {
  const [inputText, setInputText] = useState<string>('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isDropdownVisible, setDropdownVisible] = useState(false);


  const filteredText = useMemo(() => inputText.trim().toLowerCase(), [inputText])

  useEffect(() => {
    if (!filteredText) {
      setDropdownVisible(false);
      return;
    };

    setTimeout(() => {
      AsyncStorage.getAllKeys()
        .then(keys => AsyncStorage.multiGet(keys))
        .then(values => {
          const set = new Set<string>();

          const newArr = values.map(([key, value]) => {
            if (value !== null) {

              return JSON.parse(value)[props.fieldName];
            }
          });

          newArr.flat().forEach(el => set.add(el));

          const filteredArr = Array.from(set).filter(item => !props.bookInfo[props.fieldName].includes(item));

          setSuggestions(filteredArr.filter(sug => sug.toLowerCase().includes(filteredText)));
          setDropdownVisible(true);
        });
    }, 300);

  }, [filteredText])

  const addTag = (tag: string) => {
    if (!tag.trim()) return;

    const fieldName = props.fieldName;

    if (props.oneTagAllowed && props.bookInfo[fieldName].length == 1) return;

    props.setBookInfo({ ...props.bookInfo, [fieldName]: [...props.bookInfo[fieldName], tag.trim()] });

    setInputText('');
  };

  const removeTag = (index: number) => {
    const fieldName = props.fieldName;
    const newTags = [...props.bookInfo[fieldName]];
    newTags.splice(index, 1);

    props.setBookInfo({ ...props.bookInfo, [fieldName]: newTags });
  };

  return (
    <View style={styles.cont}>
      <View style={styles.tagContent}>
        <TextInput
          onBlur={() => {
            addTag(inputText)
            setTimeout(() => {
              setDropdownVisible(false);
            }, 200);
          }}
          style={styles.tagInput}
          placeholder="Add a tag..."
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={() => addTag(inputText)}
          blurOnSubmit={false}
        />
        {props.bookInfo[props.fieldName].map((tag: string, index: number) => <Tag index={index} removeTag={removeTag} tag={tag} key={index} />)}
      </View>
      {isDropdownVisible &&
        <FlatList
          keyboardShouldPersistTaps='handled'
          style={styles.suggestionList}
          data={suggestions}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.options} onPress={() => {
              addTag(item);
              setDropdownVisible(false);
            }} >
              <Text style={styles.text}>{item}</Text>
            </TouchableOpacity>)}
        />
      }
    </View>

  );
};

export default CustomAutoCompleteTags;
