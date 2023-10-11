import { createContext, useEffect } from 'react';
import { createStore } from './stores/UserStore';
import { Route, Router, useBotContext } from '@urban-bot/core';
import { StartScreen } from './screens/StartScreen';
import { UrbanBotTelegram } from '@urban-bot/telegram';

export const StoreContext = createContext(createStore());

export const App = () => {
    const { bot } = useBotContext<UrbanBotTelegram>();
    const store = createStore();

    useEffect(() => {
        if (bot) {
            store.addBot(bot);
        }
    }, [bot, store]);

    return (
        <StoreContext.Provider value={store}>
            <Router>
                <Route path={'/start'}>
                    <StartScreen />
                </Route>
            </Router>
        </StoreContext.Provider>
    );
};
