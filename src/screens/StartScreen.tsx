import { observer } from 'mobx-react-lite';
import { Button, ButtonGroup, Text, useAction, useContact } from '@urban-bot/core';
import { useContext, useState } from 'react';
import { StoreContext } from '../App';
import { createInviteLink } from '../helpers/createInviteLink';

export const StartScreen = observer(() => {

    const { findUser, updateUser } = useContext(StoreContext);
    const [title, setTitle] = useState<undefined | string>(undefined);

    useContact(({ from, phoneNumber }) => {

        findUser(`+${phoneNumber?.replace(/\+/g, '')}`)
            .then(async (user) => {
                if (user) {
                    try {
                        if (user.inviteLink) {
                            setTitle(`Аутентификация пройдена, добро пожаловать в ATOM Insider. \nВнимание - <a href='${user.inviteLink}'>ссылку</a> можно использовать лишь один раз.`);
                        } else {
                            const link = await createInviteLink();
                            await updateUser(user.phone_number, link, Number(from.id));
                            setTitle(`Аутентификация пройдена, добро пожаловать в ATOM Insider. \nВнимание - <a href='${link}'>ссылку</a> можно использовать лишь один раз.`);
                        }
                    } catch (error) {
                        setTitle('Что-то пошло не так, нажмите /start');
                        console.error('Error:', error);
                    }
                } else {
                    setTitle('Владелец с вашим номером не найден. Если вы являетесь держателем бронирования и не можете попасть в канал, обратитесь в @atom_support_bot и укажите телефон указанный при регистрации, а также адрес электронной почты.');
                }
            })
            .catch((error) => {
                setTitle('Что-то пошло не так, нажмите /start');
                console.error('Error:', error);
            });
    });

    return (
        title ? (
            <Text parseMode={'HTML'}>
                {title}
            </Text>
        ) : (
            <ButtonGroup parseMode={'HTML'}
                         title={`Чтобы пройти аутентификацию и получить одноразовую ссылку-приглашение нажмите <b>далее</b>`}
                         isReplyButtons isResizedKeyboard>
                <Button style={'PRIMARY'} request_contact>далее</Button>
            </ButtonGroup>
        )
    );

});
