import React, { useState, useEffect } from 'react';
import { View, Modal, Text, TouchableOpacity } from 'react-native';
import { styles as FormStyle } from '../Form/FormStyle'
import { styles as appStyles } from '../../App';
import { styles as remQuesStyles } from '../RemoveQuestionPopUp/RemoveQuestionPopUpStyles';

interface RemoveQuestionPopUpInterface {
	isQuestionPopUpVisible: boolean,
	setQuestionPopUpIsVisible: (data: boolean) => void,
	deleteBook: (data: string) => void,
	bookKey: string,
}

const RemoveQuestionPopUp: React.FC<RemoveQuestionPopUpInterface> = (props) => {

	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={props.isQuestionPopUpVisible}
		>
			<View style={FormStyle.modalContainer}>
				<View style={[FormStyle.modalContent, FormStyle.removeQuestionModal]}>
					<Text style={remQuesStyles.header}>Are you sure you want to delete the book ?</Text>
					<View style={appStyles.butContainer}>
						<TouchableOpacity onPress={() => props.deleteBook(props.bookKey)} style={appStyles.primaryButton} >
							<Text style={{ color: 'white' }}>Ok</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => props.setQuestionPopUpIsVisible(false)} style={appStyles.primaryButton} >
							<Text style={{ color: 'white' }}>Back</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</Modal>
	);
};

export default RemoveQuestionPopUp;
