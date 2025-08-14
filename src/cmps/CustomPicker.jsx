import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from 'react-native';
import { ThemeContext } from '../contexts/ThemeContext';


const CustomPicker = ({
    selectedValue,
    onValueChange,
    options = [],
    style = {},
    dropdownStyle = {},
    itemStyle = {},
    label,
    placeholder = 'Select...',
}) => {
    const [visible, setVisible] = useState(false);
    const { mode, themeColors } = useContext(ThemeContext);

    const selectedLabel =
        options.find(opt => opt.value === selectedValue)?.label ||
        options.find(opt => opt === selectedValue) ||
        placeholder;

    // Theme-dependent styles
    const themedLabel = { color: themeColors[mode].text };
    const themedSelected = {
        backgroundColor: themeColors[mode].card,
        borderColor: themeColors[mode].border,
    };
    const themedSelectedText = { color: themeColors[mode].text };
    const themedDropdown = {
        backgroundColor: themeColors[mode].background,
        shadowColor: themeColors[mode].border,
    };
    const themedItem = { borderBottomColor: themeColors[mode].border };
    const themedItemText = { color: themeColors[mode].text };

    return (
        <View style={[styles.wrapper, style]}>
            {label && <Text style={[styles.label, themedLabel]}>{label}</Text>}
            <TouchableOpacity
                style={[styles.selected, themedSelected]}
                onPress={() => setVisible(true)}
                activeOpacity={0.7}
            >
                <Text style={[styles.selectedText, themedSelectedText]}>{selectedLabel}</Text>
            </TouchableOpacity>
            <Modal
                visible={visible}
                transparent
                animationType="fade"
                onRequestClose={() => setVisible(false)}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => setVisible(false)}
                >
                    <View style={[styles.dropdown, themedDropdown, dropdownStyle]}>
                        <FlatList
                            data={options}
                            keyExtractor={(item, idx) =>
                                typeof item === 'object' ? item.value : item
                            }
                            renderItem={({ item }) => {
                                const value = typeof item === 'object' ? item.value : item;
                                const label = typeof item === 'object' ? item.label : item;
                                return (
                                    <TouchableOpacity
                                        style={[styles.item, themedItem]}
                                        onPress={() => {
                                            setVisible(false);
                                            onValueChange(value);
                                        }}
                                    >
                                        <Text style={[styles.itemText, themedItemText, itemStyle]}>{label}</Text>
                                    </TouchableOpacity>
                                );
                            }}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: 12,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 6,
    },
    selected: {
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
    },
    selectedText: {
        fontSize: 16,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    dropdown: {
        width: 220,
        maxHeight: 300,
        borderRadius: 10,
        elevation: 6,
        shadowOpacity: 0.2,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
    },
    item: {
        padding: 14,
        borderBottomWidth: 1,
    },
    itemText: {
        fontSize: 16,
    },
});


export default CustomPicker;