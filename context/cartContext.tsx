"use client";

import React, { Dispatch, createContext, useReducer, useEffect } from "react";

// Define the product type
type ProductType = {
  id: string;
  name: string;
  price: number;
};

// Define the state type
type StateType = {
  cart: ProductType[];
};

// Define the action type
type ActionType = {
  type: string;
  payload?: ProductType | { id: string }; // Payload can be product details or product id for removal
};

// Define the initial state
const initialState: StateType = {
  cart: [],
};

// Define the reducer function to handle actions
const reducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cart: [...state.cart, action.payload as ProductType],
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter(product => product.id !== (action.payload as { id: string }).id),
      };
    default:
      return state;
  }
};

// Create the context
export const CounterContext = createContext<{
  state: StateType;
  dispatch: Dispatch<ActionType>;
}>({ state: initialState, dispatch: () => null });

// Create the context provider component
export const CounterContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState, (initial) => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        return { cart: JSON.parse(savedCart) };
      }
    }
    return initial;
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <CounterContext.Provider value={{ state, dispatch }}>
      {children}
    </CounterContext.Provider>
  );
};
