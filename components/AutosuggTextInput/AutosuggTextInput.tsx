import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { styles } from "../CustomAutoCompleteTags/CustomAutoCompleteTagsStyle"
import { styles as inputStyles } from '../CustomAutoCompleteTags/CustomAutoCompleteTagsStyle';
import { bookInfoType } from '../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AutosuggTextInputInterface {
  setBookInfo: (data: bookInfoType) => void,
  bookInfo: bookInfoType,
  field: string,
}

const AutosuggTextInput: React.FC<AutosuggTextInputInterface> = (props) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const filteredText = useMemo(() => props.bookInfo[props.field].trim().toLowerCase(), [props.bookInfo[props.field]]);

  const textHandler = (e: string) => {
    props.setBookInfo({ ...props.bookInfo, [props.field]: e });
  };


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

              return JSON.parse(value)[props.field];
            }
          });

          newArr.forEach(el => set.add(el));
          const filteredArr = Array.from(set).filter(item => !filteredText.includes(item));

          setSuggestions(filteredArr.filter(sug => sug.toLowerCase().includes(filteredText)));
          setDropdownVisible(true);
        });
    }, 300);

  }, [filteredText]);


  return (
    <View style={styles.cont}>
      <TextInput
        blurOnSubmit={false}
        onBlur={() => {
          setDropdownVisible(false);
        }}
        placeholder='...'
        value={props.bookInfo[props.field]}
        onChangeText={textHandler}
        style={[inputStyles.tagContent, inputStyles.withoutTagInput]}
      />
      {isDropdownVisible &&
        <FlatList
          keyboardShouldPersistTaps='handled'
          style={styles.suggestionList}
          data={suggestions}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.options} onPress={() => {
              props.setBookInfo({ ...props.bookInfo, [props.field]: item })
              setDropdownVisible(false);
            }} >
              <Text style={styles.text}>{item}</Text>
            </TouchableOpacity>)}
        />
      }
    </View>

  );
};

export default AutosuggTextInput;
