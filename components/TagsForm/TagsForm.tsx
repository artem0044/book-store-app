import React, { useState, useEffect } from 'react';
import { View, Modal } from 'react-native/types';
import { styles } from '../Form/FormStyle'

const TagsForm: React.FC = (props) => {
	const [isVisibleModal, setIsVisibleModal] = useState(false);

	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={isVisibleModal}
		>
			<View style={styles.modalContainer}>
				<View style={styles.modalContent}>

				</View>
			</View>
		</Modal>
	);
};

export default TagsForm;
