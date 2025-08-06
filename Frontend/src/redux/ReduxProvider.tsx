"use client";

import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";

export default function ReduxProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const startTime = performance.now();

    return (
        <Provider store={store}>
            <PersistGate
                loading={null}
                persistor={persistor}
                onBeforeLift={() => {
                    const endTime = performance.now();
                    console.log(
                        `Redux Persist loaded in ${endTime - startTime} ms`
                    );
                }}
            >
                {children}
            </PersistGate>
        </Provider>
    );
}
