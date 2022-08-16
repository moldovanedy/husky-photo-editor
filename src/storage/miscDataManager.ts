import { store } from "../redux/global.store";
import { createMessage, MessageType } from "../redux/messages.redux";
import { db } from "./db";

export async function addOrModifyMiscDataDB(
    key: string,
    value: any
): Promise<boolean> {
    function resolve() {
        return true;
    }

    function reject() {
        return false;
    }

    try {
        let success = false;
        await db.misc.get(key).then((data) => {
            if (data === undefined) {
                return db.misc
                    .add({ key: key, value: value })
                    .then(resolve, reject);
            } else {
                return db.misc.update(key, value).then(resolve, reject);
            }
        });

        return success;
    } catch {
        store.dispatch(
            createMessage({
                message: "An unknown indexedDB error has occured.",
                type: MessageType.Error
            })
        );
        return false;
    }
}
