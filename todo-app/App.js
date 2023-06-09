import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, StatusBar, Image, KeyboardAvoidingView, Platform, Pressable, Keyboard, Alert } from 'react-native';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useRef, useState } from 'react';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Ionicons } from '@expo/vector-icons';

import Margin from './src/Margin';
import { getCalendarColumns, getDayText, getDayColor, statusBarHeight, ITEM_WIDTH, bottomSpace } from './src/utils';
import { runPracticeDayjs } from './src/practice-dayjs';
import { useCalendar } from './src/hook/use-calendar';
import { useTodoList } from './src/hook/use-todo-list';
import Calendar from './src/Calendar';
import AddTodoInput from './src/AddTodoInput';



export default function App() {

  const now = dayjs();
  const {
    selectedDate,
    setSelectedDate,
    isDatePickerVisible,
    showDatePicker,
    hideDatePicker,
    handleConfirm,
    subtract1Month,
    add1Month
  } = useCalendar(now);
  const {
    todoList,
    filteredTodoList,
    removeTodo,
    toggleTodo,
    addTodo,
    resetInput,
    input,
    setInput,
  } = useTodoList(selectedDate);

  const columns = getCalendarColumns(selectedDate);

  const flatListRef = useRef(null);

  const onPressLeftArrow = subtract1Month;
  const onPressHeaderDate = showDatePicker;
  const onPressRightArrow = add1Month;
  const onPressDate = setSelectedDate;

  const ListHeaderComponent = () => (
    <View>

      <Calendar
        columns={columns}
        todoList={todoList}
        selectedDate={selectedDate}
        onPressLeftArrow={onPressLeftArrow}
        onPressRightArrow={onPressRightArrow}
        onPressHeaderDate={onPressHeaderDate}
        onPressDate={onPressDate}
      />
      <View
        style={{ width: 4, height: 4, borderRadius: 4 / 2, backgroundColor: "#a3a3a3", alignSelf: "center", margin: 10,}}
      />
    </View>
  )
  const renderItem = ({ item: todo }) => {
    const isSuccess = todo.isSuccess;
    const onPress = () => toggleTodo(todo.id);
    const onLongPress = () => {

      Alert.alert("삭제하시겠어요?", "", [
        {
          style: "cancel",
          text: "아니오"
        },
        {
          text: "네",
          onPress: () => removeTodo(todo.id),
        }
      ])
      
    }
    return (
      <Pressable
        onPress={onPress}
        onLongPress={onLongPress}
        style={{
          width: ITEM_WIDTH,
          // backgroundColor: todo.id % 2 === 0 ? "pink" : "yellow",
          alignSelf: "center",
          paddingVertical: 10,
          paddingHorizontal: 5,
          borderBottomWidth: 0.5,
          borderColor: "#a6a6a6",
          flexDirection: "row",
          alignItems: "center",
        }}>
        <Text style={{ flex: 1, fontSize: 14, color: "#595959" }}>{todo.content}</Text>
        <TouchableOpacity>
          <Ionicons
            name="checkmark"
            size={17}
            color={isSuccess ? "#595959" : "#bfbfbf"} />
        </TouchableOpacity>
      </Pressable>
    )
  }

  const scrollToEnd = () => {
    if (flatListRef.current?.props.data.length !==0) {

      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 300);
    }
  }

  const onPressAdd = () => {
    addTodo(selectedDate);
    resetInput();
    scrollToEnd();
  }

  const onSubmitEditing = () => {
    addTodo();
    resetInput();
    scrollToEnd();
  }

  const onFocus = ()=> {
  scrollToEnd();
  };

  return (
    <Pressable style={styles.container} onPress={Keyboard.dismiss}>
      <Image
        source={{
          uri: "https://marketplace.canva.com/EAEsTd5yAl8/1/0/900w/canva-%ED%8C%8C%EB%9E%80%EC%83%89-%EB%B0%8F-%EB%B6%84%ED%99%8D%EC%83%89-%EB%B6%80%EB%93%9C%EB%9F%AC%EC%9A%B4-%EC%88%98%EC%B1%84%ED%99%94-%EB%AC%B8%EA%B5%AC-%EC%97%86%EB%8A%94-%ED%9C%B4%EB%8C%80%ED%8F%B0-%EB%B0%B0%EA%B2%BD%ED%99%94%EB%A9%B4-3B2p5wCkUHo.jpg"
        }}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
        }}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? "padding" : "height"}>

        <View style={{ flex: 1 }}>
          <FlatList
          ref={flatListRef}
            data={filteredTodoList}
            ListHeaderComponent={ListHeaderComponent}
            contentContainerStyle={{ paddingTop: statusBarHeight + 30}}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />

          <AddTodoInput
            value={input}
            onChangeText={setInput}
            placeholder={`${dayjs(selectedDate).format('M.D')}에 추가할 투두`}
            onPressAdd={onPressAdd}
            onSubmitEditing={onSubmitEditing}
            onFocus={onFocus}
          />
        </View>
      </KeyboardAvoidingView>

      <Margin height={bottomSpace} />

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
});
