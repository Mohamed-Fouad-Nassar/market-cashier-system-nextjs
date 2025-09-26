"use client";

import { createContext, useContext, useReducer, ReactNode } from "react";

import { Product } from "@/types/products.types";
import { InvoiceState } from "@/types/selling-invoice.types";

type Action =
  | { type: "ADD_ITEM"; payload: Product }
  | { type: "CHANGE_QTY"; payload: { qty: number; id: number } }
  | { type: "REMOVE_ITEM"; payload: number }
  | { type: "INCREASE"; payload: number }
  | { type: "DECREASE"; payload: number }
  | { type: "DISCOUNT"; payload: number }
  | { type: "CLEAR" }
  | { type: "SET_PAYMENT_METHOD"; payload: "cash" | "visa" };

const initialState: InvoiceState = {
  items: [],
  total: 0,
  discount: 0,
  sub_total: 0,
  visa_fee: 5,
  payment_method: "cash",
};

function calculateTotal(state: InvoiceState) {
  const sub_total = state.items.reduce(
    (sum, p) => sum + p.retail_price * p.quantity,
    0
  );

  let total = sub_total - state.discount;

  if (state.payment_method === "visa") {
    total += state.visa_fee;
  }

  return { total, discount: state.discount, sub_total };
}

function reducer(state: InvoiceState, action: Action): InvoiceState {
  switch (action.type) {
    case "ADD_ITEM": {
      const exists = state.items.find(
        (p) => p.barcode === action.payload.barcode
      );

      const updatedItems = exists
        ? state.items.map((p) =>
            p.barcode === action.payload.barcode
              ? { ...p, quantity: p.quantity + 1 }
              : p
          )
        : [...state.items, { ...action.payload, quantity: 1 }];

      const totals = calculateTotal({ ...state, items: updatedItems });
      return { ...state, items: updatedItems, ...totals };
    }

    case "CHANGE_QTY": {
      const { id, qty } = action.payload;

      const updatedItems = state.items.map((p) =>
        p.id === id ? { ...p, quantity: qty } : p
      );

      const totals = calculateTotal({ ...state, items: updatedItems });
      return { ...state, items: updatedItems, ...totals };
    }

    case "REMOVE_ITEM": {
      const updatedItems = state.items.filter((p) => p.id !== action.payload);

      const totals = calculateTotal({ ...state, items: updatedItems });
      return { ...state, items: updatedItems, ...totals };
    }

    case "INCREASE": {
      const updatedItems = state.items.map((p) =>
        p.id === action.payload ? { ...p, quantity: p.quantity + 1 } : p
      );

      const totals = calculateTotal({ ...state, items: updatedItems });
      return { ...state, items: updatedItems, ...totals };
    }

    case "DECREASE": {
      const item = state.items.find((p) => p.id === action.payload);
      if (!item) return state;

      let updatedItems;
      if (item.quantity - 1 <= 0) {
        updatedItems = state.items.filter((p) => p.id !== action.payload);
      } else {
        updatedItems = state.items.map((p) =>
          p.id === action.payload ? { ...p, quantity: p.quantity - 1 } : p
        );
      }

      const totals = calculateTotal({ ...state, items: updatedItems });
      return { ...state, items: updatedItems, ...totals };
    }

    case "DISCOUNT": {
      const totals = calculateTotal({ ...state, discount: action.payload });
      return { ...state, ...totals };
    }

    case "SET_PAYMENT_METHOD": {
      const totals = calculateTotal({
        ...state,
        payment_method: action.payload,
      });
      return { ...state, payment_method: action.payload, ...totals };
    }

    case "CLEAR":
      return initialState;

    default:
      return state;
  }
}

const InvoiceContext = createContext<{
  state: InvoiceState;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => null });

export const InvoiceProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <InvoiceContext.Provider value={{ state, dispatch }}>
      {children}
    </InvoiceContext.Provider>
  );
};
export const useSellingInvoice = () => useContext(InvoiceContext);

// "use client";

// import { createContext, useContext, useReducer, ReactNode } from "react";

// import { Product } from "@/types/products.types";
// import { InvoiceState } from "@/types/selling-invoice.types";

// type Action =
//   | { type: "ADD_ITEM"; payload: Product }
//   | { type: "CHANGE_QTY"; payload: { qty: number; id: number } }
//   | { type: "REMOVE_ITEM"; payload: number }
//   | { type: "INCREASE"; payload: number }
//   | { type: "DECREASE"; payload: number }
//   | { type: "DISCOUNT"; payload: number }
//   | { type: "CLEAR" };

// const initialState: InvoiceState = {
//   items: [],
//   total: 0,
//   discount: 0,
//   sub_total: 0,
//   payment_method: "cash",
// };

// function calculateTotal(items: Product[], discount: number = 0) {
//   const sub_total = items.reduce(
//     (sum, p) => sum + p.retail_price * p.quantity,
//     0
//   );
//   const total = sub_total - discount;

//   return { total, discount, sub_total };
// }
// function reducer(state: InvoiceState, action: Action): InvoiceState {
//   switch (action.type) {
//     case "ADD_ITEM": {
//       const exists = state.items.find(
//         (p) => p.barcode === action.payload.barcode
//       );

//       const updatedItems = exists
//         ? state.items.map((p) =>
//             p.barcode === action.payload.barcode
//               ? { ...p, quantity: p.quantity + 1 }
//               : p
//           )
//         : [...state.items, { ...action.payload, quantity: 1 }];

//       // const total = calculateTotal(updatedItems);
//       // const sub_total = total - state.discount;
//       // return {
//       //   items: updatedItems,
//       //   total,
//       //   sub_total,
//       //   discount: state.discount,
//       // };

//       const { total, discount, sub_total } = calculateTotal(
//         updatedItems,
//         state.discount
//       );
//       return { ...state, items: updatedItems, total, discount, sub_total };
//     }

//     case "INCREASE": {
//       const updatedItems = state.items.map((p) =>
//         p.id === action.payload ? { ...p, quantity: p.quantity + 1 } : p
//       );

//       // const total = calculateTotal(updatedItems);
//       // const sub_total = total - state.discount;
//       // return {
//       //   items: updatedItems,
//       //   total,
//       //   sub_total,
//       //   discount: state.discount,
//       // };

//       const { total, discount, sub_total } = calculateTotal(
//         updatedItems,
//         state.discount
//       );
//       return { ...state, items: updatedItems, total, discount, sub_total };
//     }

//     case "DECREASE": {
//       const item = state.items.find((p) => p.id === action.payload);

//       if (!item) return state;

//       if (item.quantity - 1 <= 0) {
//         // if qty is 0, remove item
//         const updatedItems = state.items.filter((p) => p.id !== action.payload);

//         // const total = calculateTotal(updatedItems);
//         // const sub_total = total - state.discount;
//         // return {
//         //   items: updatedItems,
//         //   total,
//         //   sub_total,
//         //   discount: state.discount,
//         // };

//         const { total, discount, sub_total } = calculateTotal(
//           updatedItems,
//           state.discount
//         );
//         return { ...state, items: updatedItems, total, discount, sub_total };
//       }

//       const updatedItems = state.items.map((p) =>
//         p.id === action.payload ? { ...p, quantity: p.quantity - 1 } : p
//       );

//       // const total = calculateTotal(updatedItems);
//       // const sub_total = total - state.discount;
//       // return {
//       //   items: updatedItems,
//       //   total,
//       //   sub_total,
//       //   discount: state.discount,
//       // };

//       const { total, discount, sub_total } = calculateTotal(
//         updatedItems,
//         state.discount
//       );
//       return { ...state, items: updatedItems, total, discount, sub_total };
//     }

//     case "CHANGE_QTY": {
//       const { id, qty } = action.payload;

//       const updatedItems = state.items.map((p) =>
//         p.id === id ? { ...p, quantity: qty } : p
//       );

//       // const total = calculateTotal(updatedItems);
//       // const sub_total = total - state.discount;
//       // return {
//       //   items: updatedItems,
//       //   total,
//       //   sub_total,
//       //   discount: state.discount,
//       // };

//       const { total, discount, sub_total } = calculateTotal(
//         updatedItems,
//         state.discount
//       );
//       return { ...state, items: updatedItems, total, discount, sub_total };
//     }

//     case "REMOVE_ITEM": {
//       const updatedItems = state.items.filter((p) => p.id !== action.payload);

//       // const total = calculateTotal(updatedItems);
//       // const sub_total = total - state.discount;
//       // return {
//       //   items: updatedItems,
//       //   total,
//       //   sub_total,
//       //   discount: state.discount,
//       // };

//       const { total, discount, sub_total } = calculateTotal(
//         updatedItems,
//         state.discount
//       );
//       return { ...state, items: updatedItems, total, discount, sub_total };
//     }

//     case "DISCOUNT": {
//       const { total, discount, sub_total } = calculateTotal(
//         state.items,
//         action.payload
//       );
//       return { ...state, items: state.items, total, discount, sub_total };
//     }

//     case "CLEAR":
//       return initialState;

//     default:
//       return state;
//   }
// }

// const InvoiceContext = createContext<{
//   state: InvoiceState;
//   dispatch: React.Dispatch<Action>;
// }>({ state: initialState, dispatch: () => null });

// export const InvoiceProvider = ({ children }: { children: ReactNode }) => {
//   const [state, dispatch] = useReducer(reducer, initialState);

//   return (
//     <InvoiceContext.Provider value={{ state, dispatch }}>
//       {children}
//     </InvoiceContext.Provider>
//   );
// };
// export const useSellingInvoice = () => useContext(InvoiceContext);
