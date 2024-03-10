import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import { styles } from "../CustomAutoCompleteTags/CustomAutoCompleteTagsStyle"


interface TagInterface {
  removeTag?: (data: number) => void,
  index: number,
  tag: string,
}

const Tag: React.FC<TagInterface> = (props) => {



  return (
    <View key={props.index} style={styles.tag}>
      <Text style={styles.tagText} >{props.tag}</Text>
      {props.removeTag
        &&
        <TouchableOpacity style={styles.delIcon} onPress={() => props?.removeTag?.(props.index)}>
          <Text>x</Text>
        </TouchableOpacity>}
    </View>

  );
};

export default Tag;
