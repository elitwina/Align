import React, { useState, useEffect } from "react";
const AppContext = React.createContext();
const { Provider } = AppContext;

const StateManager = ({ children }) => {

    const [first_state, set_first_state] = useState("hello");
    const [selected_items, set_selected_items] = useState([]);
    const [full_data, set_full_data] = useState([]);
    const [next_pic, set_next_pic] = useState(true);
    const [selected, set_selected] = useState({});

    const state = {
        first_state,
        selected_items,
        next_pic,
        selected,
        full_data
    };
    const action = {
        set_first_state,
        set_selected_items,
        set_next_pic,
        set_selected,
        set_full_data
    };

    return <Provider value={{ ...state, ...action }}>{children}</Provider>;
};
export { AppContext, StateManager };