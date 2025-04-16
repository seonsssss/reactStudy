import { configureStore, createSlice } from "@reduxjs/toolkit";

// 초기 상태
const initialState = {
  toggle: false,
  counter: 0,
};

// Slice 생성
const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    toggleSwitch: (state) => {
      state.toggle = !state.toggle;
    },
    increase: (state, action) => {
      state.counter += action.payload;
    },
    decrease: (state) => {
      state.counter -= 1;
    },
  },
});

// 스토어 생성
const store = configureStore({
  reducer: counterSlice.reducer,
});

const divToggle = document.querySelector(".toggle");
const counter = document.querySelector("h1");
const btnIncrease = document.querySelector("#increase");
const btnIDecrease = document.querySelector("#decrease");

const render = () => {
  const state = store.getState();
  if (state.toggle) {
    divToggle.classList.add("active");
  } else {
    divToggle.classList.remove("active");
  }
  counter.innerText = state.counter;
};

render();
store.subscribe(render);

divToggle.onclick = () => {
  store.dispatch(counterSlice.actions.toggleSwitch());
};

btnIncrease.onclick = () => {
  store.dispatch(counterSlice.actions.increase(1));
};

btnIDecrease.onclick = () => {
  store.dispatch(counterSlice.actions.decrease());
};
