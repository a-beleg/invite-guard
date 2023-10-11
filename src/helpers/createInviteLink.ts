import axios from 'axios';

const { TELEGRAM_TOKEN, CHANNEL_ID } = process.env;

const MAX_RETRY_ATTEMPTS = 3;
const RETRY_DELAY_MS = 2000;

export async function createInviteLink() {
    let inviteLink = null;
    let retryCount = 0;

    while (retryCount < MAX_RETRY_ATTEMPTS) {
        try {
            const response = await axios.get(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/createChatInviteLink`, {
                params: {
                    chat_id: CHANNEL_ID,
                    member_limit: 1,
                },
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                const data = response.data;

                if (data.ok && data.result.invite_link) {
                    inviteLink = data.result.invite_link;
                    break; // Exit the loop on success
                } else {
                    console.error('Failed to create invite link:', data.description);
                }
            } else {
                console.error('Failed to create invite link:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }

        retryCount++;
        if (retryCount < MAX_RETRY_ATTEMPTS) {
            await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS));
        }
    }

    if (!inviteLink) {
        console.error('Max retry attempts reached. Unable to create invite link.');
    }

    return inviteLink;
}
