import { provide } from '../helpers/ioc';
import { action, makeAutoObservable } from 'mobx';
import { UrbanBotTelegram } from '@urban-bot/telegram';
import { User } from '../db/models';
import { setupBotListeners } from '../helpers/botlisteners';

@provide.singleton()
export class UserStore {

    constructor() {
        makeAutoObservable(this);
    }

    @action
    async findUser(phone_number: string): Promise<any> {
        return await User.findOne({
            where: {
                phone_number,
                is_ordered_paid_key: true,
            },
        });
    }

    @action
    updateUser = async (phone_number: string, inviteLink: string, chatID: number) => {
        await User.update({ chatID, inviteLink }, { where: { phone_number } });
    };

    @action addBot = async (bot: UrbanBotTelegram) => {
        setupBotListeners(bot);
    };
}

export const createStore = () => {
    return new UserStore();
};
